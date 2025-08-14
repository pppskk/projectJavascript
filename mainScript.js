// Mobile menu toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");
let isMenuOpen = false;

mobileMenuBtn.addEventListener("click", () => {
  isMenuOpen = !isMenuOpen;
  mobileMenuBtn.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

// Close mobile menu when clicking links
document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => {
    isMenuOpen = false;
    mobileMenuBtn.classList.remove("active");
    mobileMenu.classList.remove("active");
  });
});

// Close mobile menu when resizing to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && isMenuOpen) {
    isMenuOpen = false;
    mobileMenuBtn.classList.remove("active");
    mobileMenu.classList.remove("active");
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const navHeight = document.querySelector(".navbar").offsetHeight;
      const targetPosition = target.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Active navigation highlight
function updateActiveNavigation() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const navHeight = document.querySelector(".navbar").offsetHeight;

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
    const sectionHeight = section.offsetHeight;

    if (
      window.pageYOffset >= sectionTop - navHeight - 100 &&
      window.pageYOffset < sectionTop + sectionHeight - navHeight - 100
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
}

// Scroll animations
function checkScroll() {
  const elements = document.querySelectorAll(".fade-in");
  elements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight * 0.8;

    if (isVisible) {
      element.classList.add("visible");
    }
  });
}

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = parseFloat(counter.getAttribute("data-target"));
    const isDecimal = target % 1 !== 0;
    let current = 0;
    const increment = target / 60;

    const timer = setInterval(() => {
      current += increment;

      if (current >= target) {
        counter.textContent = isDecimal
          ? target.toFixed(1)
          : Math.floor(target).toLocaleString();
        if (target >= 1000) {
          counter.textContent = Math.floor(target / 1000) + "K+";
        }
        if (target === 99.9) {
          counter.textContent = "99.9%";
        }
        clearInterval(timer);
      } else {
        let displayValue = isDecimal ? current.toFixed(1) : Math.floor(current);
        if (target >= 1000 && current >= 1000) {
          displayValue = Math.floor(current / 1000) + "K";
        }
        counter.textContent = displayValue;
      }
    }, 50);
  });
}

// Navbar background on scroll
function handleNavbar() {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 30px rgba(0, 0, 0, 0.15)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  }
}

// Create floating particles in hero section
function createParticles() {
  const hero = document.querySelector(".hero");
  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.width = Math.random() * 4 + 2 + "px";
    particle.style.height = particle.style.width;
    particle.style.animationDelay = Math.random() * 3 + "s";
    particle.style.animationDuration = Math.random() * 3 + 2 + "s";
    particle.classList.add("floating");

    hero.appendChild(particle);
  }
}

// Initialize animations
let countersAnimated = false;

function initAnimations() {
  checkScroll();
  handleNavbar();
  updateActiveNavigation();

  // Animate counters when stats section is visible
  if (!countersAnimated) {
    const statsSection = document.querySelector(".stats");
    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      animateCounters();
      countersAnimated = true;
    }
  }
}

// Event listeners
window.addEventListener("scroll", initAnimations);
window.addEventListener("load", () => {
  initAnimations();
  createParticles();
});

// Initialize on page load
checkScroll();

// Performance optimization: throttle scroll events
let ticking = false;

function handleScroll() {
  if (!ticking) {
    requestAnimationFrame(initAnimations);
    ticking = true;
    setTimeout(() => {
      ticking = false;
    }, 16); // ~60fps
  }
}

window.addEventListener("scroll", handleScroll);
