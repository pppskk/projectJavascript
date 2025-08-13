let scrollContainer = document.querySelector('.container-warp');
let backBtn = document.getElementById('prev');
let nextBtn = document.getElementById('next'); // ต้องเป็น 'next'
let current = 1;
const cards = document.querySelectorAll('.container-warp .card');

function updateCarousel() {
    const targetCard = cards[current];
    const cardCenter = targetCard.offsetLeft + (targetCard.offsetWidth / 2);
    const containerCenter = scrollContainer.offsetWidth / 2;
    scrollContainer.scrollLeft = cardCenter - containerCenter;

    cards.forEach((card, idx) => {
        card.classList.remove('active');
        if (idx === current) {
            card.classList.add('active');
        }
    });
}

scrollContainer.addEventListener('wheel', event => {
    event.preventDefault();

}, { passive: false });

nextBtn.addEventListener('click', () => {
    scrollContainer.style.scrollBehavior = 'smooth';
    if (current < cards.length - 1) {
        current = current + 1;
    } else {
        current = 0;
        scrollContainer.scrollLeft = 0;
    }
    updateCarousel();
});

backBtn.addEventListener('click', () => {
    scrollContainer.style.scrollBehavior = 'smooth';
    if (current > 0) {
        current = current - 1;
    } else {
        current = cards.length - 1;
        scrollContainer.scrollLeft = scrollContainer.scrollWidth;
    }
    updateCarousel();
});


updateCarousel();


let audio = document.getElementById('Song');
let icon = document.querySelector('.music');


icon.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        audio.volue = 0.5;
        icon.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    } else {
        audio.pause();
        audio.volue = 0.5;
        icon.innerHTML = '<i class="fa-solid fa-volume-low"></i>';
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        const targetPosition = target.getBoundingClientRect().top + window.scrollY;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 3000; // ms → ปรับให้ช้าหรือเร็วได้
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        // easing function เพื่อให้เลื่อนนุ่มนวล
        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('.hero');
    const aboutSection = document.querySelector('.about');
    const experienceSection = document.getElementById('experience');
    const skillsSection = document.querySelector('.skills');
    const heroContent = document.querySelector('.hero-content');
    const heroContect = document.querySelector('.hero-contect')
    const heroTextH1 = document.querySelector('.hero-text h1');
    const heroTextP = document.querySelector('.hero-text p');
    const modelHeroViewer = document.querySelector('#hero-model');
    const modelAboutViewer = document.querySelector('#about-model');
    const modelExperienceViewer = document.querySelector('#experience-model');

    // ฟังก์ชัน Easing แบบ In-Out ทำให้การเคลื่อนไหวดูเป็นธรรมชาติ
    const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

    // ตรวจสอบว่ามี navbar ในหน้าเว็บหรือไม่
    if (!navbar) {
        return;
    }

    window.addEventListener('load', () => {
        document.body.classList.add('open');
    });

    window.addEventListener('scroll', () => {
        function onScroll() {
            // รับตำแหน่งของส่วน 'experience' เทียบกับ viewport
            const experiencePositionTop = experienceSection.getBoundingClientRect().top;
            const skillsPositionBottom = skillsSection.getBoundingClientRect().bottom;

            // กำหนดระยะที่ต้องการให้เริ่มเปลี่ยน (เช่น 50px จากขอบบนของ viewport)
            const offset = 50;

            if (skillsPositionBottom <= offset) {
                navbar.classList.add('scrolled');
                navbar.classList.remove('black');
            } else if (experiencePositionTop <= offset) {
                // ถ้าส่วน 'experience' เลื่อนขึ้นมาถึงขอบบนของ viewport (หรือเลยไปแล้ว)
                // ให้เพิ่มคลาส 'black' และลบคลาส 'scrolled'
                navbar.classList.add('black');
                navbar.classList.remove('scrolled');
            } else if (window.scrollY > 50) {
                // ถ้าเลื่อนลงมาเกิน 50px แต่ยังไม่ถึงส่วน 'experience'
                // ให้เพิ่มคลาส 'scrolled'
                navbar.classList.add('scrolled');
                navbar.classList.remove('black');
            } else {
                // ถ้าเลื่อนกลับขึ้นไปที่ด้านบนสุดของหน้า
                // ให้ลบคลาสทั้งหมดออก
                navbar.classList.remove('scrolled');
                navbar.classList.remove('black');
            }
        }

        // เพิ่ม Event Listener เพื่อเรียกใช้ฟังก์ชันเมื่อมีการเลื่อนหน้าจอ
        window.addEventListener('scroll', onScroll);

        // ... (โค้ดสำหรับ hero section) ...
        const rect = heroSection.getBoundingClientRect();
        const scrollHeroProgress = (window.scrollY - rect.top) / rect.height;
        const easedHeroProgress = easeInOutCubic(scrollHeroProgress);
        const orbitY = easedHeroProgress * 360;
        const orbitX = 165;
        modelHeroViewer.setAttribute('camera-orbit', `${orbitX}deg ${orbitY}deg`);

        const startOffset = 200;
        const aboutSectionTop = aboutSection.offsetTop;
        const aboutSectionStartPoint = aboutSectionTop - startOffset;

        // กำหนดความยาวช่วงที่ใช้ในการหมุน
        // ในที่นี้คือ 500px 
        const animationLength = 500;

        // คำนวณความคืบหน้า (Progress)
        const scrollFromStartPoint = window.scrollY - aboutSectionStartPoint;
        const scrollAboutProgress = Math.min(1, Math.max(0, scrollFromStartPoint / animationLength));
        const easedAboutProgress = easeInOutCubic(scrollAboutProgress);

        // คำนวณมุมกล้องที่ต้องการ
        const startDegree = 145;
        const endDegree = 195; //280
        const orbitAboutX = startDegree + (easedAboutProgress * (endDegree - startDegree));

        modelAboutViewer.setAttribute('camera-orbit', `${orbitAboutX}deg 0deg`);


        const experienceSectionStartPoint = experienceSection.offsetTop - (experienceSection.offsetHeight / 3);

        // คำนวณความคืบหน้า (Progress)
        const scrollFromStartPointExp = window.scrollY - experienceSectionStartPoint;
        const scrollAboutProgressExp = Math.min(1, Math.max(0, scrollFromStartPointExp / animationLength));
        const easedAboutProgressExp = easeInOutCubic(scrollAboutProgressExp);

        // คำนวณมุมกล้องที่ต้องการ
        const startDegreeXExp = -20;
        const endDegreeXExp = 305;
        const orbitAboutXExp = startDegreeXExp + (easedAboutProgressExp * (endDegreeXExp - startDegreeXExp));

        const startDegreeYExp = 150;
        const endDegreeYExp = 25;
        const orbitAboutYExp = startDegreeYExp + (easedAboutProgressExp * (endDegreeYExp - startDegreeYExp));

        modelExperienceViewer.setAttribute('camera-orbit', `${orbitAboutXExp}deg ${orbitAboutYExp}deg`);

        // ความสูงแบบ ใหญ่ - เล็ก - ใหญ่
        const MinDegreeHighExp = 70;  // เล็ก
        const MaxDegreeHighExp = 120; // ใหญ่

        let orbitAboutHighExp;
        if (easedAboutProgressExp <= 0.5) {
            // ช่วงแรก: ใหญ่ → เล็ก
            const progressHalf = easedAboutProgressExp / 0.5;
            orbitAboutHighExp = MaxDegreeHighExp + (progressHalf * (MinDegreeHighExp - MaxDegreeHighExp));
        } else {
            // ช่วงสอง: เล็ก → ใหญ่
            const progressHalf = (easedAboutProgressExp - 0.5) / 0.5;
            orbitAboutHighExp = MinDegreeHighExp + (progressHalf * (MaxDegreeHighExp - MinDegreeHighExp));
        }

        modelExperienceViewer.style.height = `${orbitAboutHighExp}%`;

        // ... (โค้ดสำหรับ text animation) ...
        const scrollProgressDown = window.scrollY;
        const easedTranslateY = easeInOutCubic(Math.min(1, scrollProgressDown / 500)) * 500; // ปรับค่าตามความเหมาะสม
        const easedOpacityMax = 1 - easeInOutCubic(Math.min(1, scrollProgressDown / 500)); // ค่อยๆ ลดความทึบ
        const easedOpacityMin = 1 - easeInOutCubic(Math.min(0.5, scrollProgressDown / 500)); // ค่อยๆ ลดความทึบ
        const easedFontSize = `${Math.max(1.5 - easedHeroProgress * 1.5, 0.5)}em`; // ปรับขนาดตัวอักษรให้เล็กลงอย่างสมูท

        if (heroTextH1) {
            heroTextH1.style.transform = `translateY(${easedTranslateY}px)`;
            heroTextH1.style.opacity = easedOpacityMax;
            heroTextH1.style.fontSize = easedFontSize;
        }
        if (heroTextP) {
            heroTextP.style.opacity = scrollProgressDown > 80 ? 0 : 1;
        }
        if (heroContect) {
            heroContect.style.opacity = scrollProgressDown > 80 ? 0 : 1;
        }
        if (heroContent) {
            heroContent.style.transform = `translateY(${easedTranslateY}px)`;
            heroContent.style.opacity = easedOpacityMin;
        }
    });
});