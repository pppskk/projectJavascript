let langBtn = document.querySelector('.language');

// เก็บข้อความหลายภาษา
const translations = {
    en: {
        logo: "Lumina AI ✨",
        home: "Home",
        about: "About",
        experience: "Experience",
        skills: "Skills",
        gallery: "Gallery",
        back: "Back",
        name: "Anut Chuatrakool",
        career: '"Passionate and skilled software developer with experience in mobile app development using Flutter, web development, and robotics. I am eager to join a team where I can continue to grow, work on new challenges, and create software that is both functional and user-friendly, contributing to the success of the team and the company."',
        about_title: "About",
        name_title: "Anut Chuatrakool",
        brith: `🎂 21 February 2006`,
        nationality: "Nationality: Thai",
        religion: "Religion: Buddhism",
        address: "628 Moo 2, T. Wiang, A. Fang, Chiang Mai, Thailand",
        hobby_title: "☕ Hobby",
        hobby1: "- Write code",
        hobby2: "- Read books",
        hobby3: "- Play games",
        hobby4: "- Learn what you want to know",
        educational_title: "📜 Educational information",
        educational1: "- Primary School: Rangsee Vittaya School",
        educational2: "- Lower Secondary School: Rangsee Vittaya School (GPA: 3.26)",
        educational3: "- Upper Secondary School: Rangsee Vittaya School, Sci-Math-Com Program (GPA: 3.25)",
        educational4: "- Bachelor's Degree: ChiangMai University (Currently studying)",
        work_experience_title: "📑 Work Experience",
        work_topic1: "1. High School Final Project - Teacher Class Swap Management App",
        work_topic2: "2. Robotics Project - 6-Legged Spider Robot",
        work_topic3: "3. Coding Competition - CMRG Chiang Mai Robot Games",
        work_topic4: '4. Speaker - "Senior Teaches Junior" Event',
        work_topic5: "5. National Student Arts and Crafts Competition - 70th Edition",
        work_in1: "Year: 2023",
        work_in2: "Year: 2022",
        work_in3: "Year: 2022",
        work_in4: "Year: 2022",
        work_in5: "Year: 2022",
        work_tabbed1: "Developed a mobile application using Flutter to manage class swap requests for teachers. Successfully created a beta version that significantly reduced paperwork, earning positive feedback from teachers for its practicality and ease of use.",
        work_tabbed2: "Designed and built a 6-legged spider robot for a school science fair. The robot gained widespread popularity within the school and was later showcased in multiple events due to its impressive design and functionality.",
        work_tabbed3: "Participated in a coding competition using micro:bit and won first place. Achieved a perfect score in the practical round and acquired new coding knowledge and skills through thecompetition.",
        work_tabbed4: 'Served as a speaker and mentor at the "Senior Teaches Junior" event. Enhanced public speaking skills and successfully taught younger students computer basics, helping them build a strong foundation for future learning.',
        work_tabbed5: "Competed in the 70th National Student Arts and Crafts Competition and secured first place, advancing to the national level. The experience expanded my knowledge and opened up new perspectives through exposure to diverse skills and crafts.",
        skills_title: "🏆 Skills",
        gallery_title: "🎨 Gallery",
        footer_logo: "Lumina AI ✨",
        footer_com_creer: "A software development company committed to creating technological innovations for our clients' business success.",
        footer_com_address: "📍 Address: 123 Na Mor Road, a university area in Chiang Mai",
        footer_services_title: "Our Services",
        footer_services1: "Point of Sale (POS) Systems",
        footer_services2: "Mobile Applications",
        footer_services3: "Websites and Online Systems",
        footer_services4: "Technology Consulting",
        footer_contect: "Contact Us",
        footer_phone: "📞 Phone: 02-XXX-XXXX",
        footer_mail: "📧 Email: Lumina@innovatech.co.th",
        footer_line: "💬 Line: @Lumina_AI",
        footer_website: "🌐 Website: www.LuminaAi.co.th",
        footer_connectUs: "Connect with Us",
        footer_connectUs_des: "Follow us for news and updates on our latest work.",
        footer_created: "Created with care by the LUMINA AI team",
    },
    th: {
        logo: "Lumina AI ✨",
        home: "หน้าแรก",
        about: "เกี่ยวกับ",
        experience: "ประสบการณ์",
        skills: "ทักษะ",
        gallery: "แกลเลอรี่",
        back: "กลับ",
        name: "อนุตร ฉั่วตระกูล",
        career: '"นักพัฒนาซอฟต์แวร์ที่มีความมุ่งมั่นและทักษะสูง มีประสบการณ์ในการพัฒนาแอปพลิเคชันมือถือด้วย Flutter, การพัฒนาเว็บไซต์ และการสร้างหุ่นยนต์ต่างๆ ต้องการเข้าร่วมทีมที่เปิดโอกาสให้ได้เติบโต ทำงานในความท้าทายใหม่ๆ และสร้างซอฟต์แวร์ที่ใช้งานง่ายและตอบโจทย์ผู้ใช้ เพื่อสนับสนุนความสำเร็จของทีมและบริษัท"',
        about_title: "เกี่ยวกับ",
        name_title: "อนุตร ฉั่วตระกูล",
        brith: "🎂 21 กุมพาพันธุ์ พ.ศ.2549",
        nationality: "สัญชาติ: ไทย, เชื่อชาติ: ไทย",
        religion: "ศาสนา: พุทธ",
        address: "ที่อยู่: 628 หมู่ 2 ต. เวียง อ. ฝาง จ. เชียงใหม่",
        hobby_title: "☕ งานอดิเรก",
        hobby1: "- เขียนโค้ด",
        hobby2: "- อ่านหนังสือ",
        hobby3: "- เล่นเกม",
        hobby4: "- ศึกษาสิ่งที่อยากรู้",
        educational_title: "📜 ข้อมูลการศึกษา",
        educational1: "- ประถม : โรงเรียนรังษีวิทยา",
        educational2: "- มัธยมศึกษาต้น : โรงเรียนรังษีวิทยา (GPAX: 3.26)",
        educational3: "- มัธยมศึกษาปลาย : โรงเรียนรังษีวิทยา วิทย์-คณิต-คอม (GPAX: 3.25)",
        educational4: "- ปริญญาตรี : มหาวิทยาลัยเชียงใหม่ (กำลังศึกษา)",
        work_experience_title: "📑 ประสบการณ์ทำงาน",
        work_topic1: "1. โครงการจบการศึกษา (ระดับมัธยมปลาย) - แอปพลิเคชันจัดการการสลับคาบเรียนสำหรับครู",
        work_topic2: "2. โครงการหุ่นยนต์ - หุ่นยนต์แมงมุม 6 ขา",
        work_topic3: "3. การแข่งขันเขียนโค้ด - CMRG Chiang Mai Robot Games",
        work_topic4: '4. วิทยากร - โครงการ "พี่สอนน้อง"',
        work_topic5: "5. การแข่งขันศิลปหัตถกรรมนักเรียนระดับชาติ ครั้งที่ 70",
        work_in1: "ปี: 2566",
        work_in2: "ปี: 2565",
        work_in3: "ปี: 2565",
        work_in4: "ปี: 2565",
        work_in5: "ปี: 2565",
        work_tabbed1: "พัฒนาแอปพลิเคชันมือถือด้วย Flutter เพื่อจัดการคำขอสลับคาบเรียนสำหรับครู. สร้างแอปพลิเคชันเวอร์ชันเบตาที่ช่วยลดการใช้เอกสารได้อย่างมาก และได้รับผลตอบรับเชิงบวกจากครูในด้านการใช้งานจริงและความสะดวก",
        work_tabbed2: "ออกแบบและสร้างหุ่นยนต์แมงมุม 6 ขาสำหรับงานนิทรรศการวิทยาศาสตร์ของโรงเรียน. หุ่นยนต์ได้รับความนิยมอย่างมากในโรงเรียนและถูกนำไปจัดแสดงในงานต่างๆ หลายครั้ง เนื่องจากมีดีไซน์ที่น่าประทับใจและฟังก์ชันการทำงานที่ยอดเยี่ยม",
        work_tabbed3: "เข้าร่วมการแข่งขันเขียนโค้ดโดยใช้ micro:bit และได้รับรางวัลชนะเลิศอันดับหนึ่ง. ทำคะแนนเต็มในรอบปฏิบัติ และได้รับความรู้และทักษะการเขียนโค้ดใหม่ๆ จากการแข่งขัน",
        work_tabbed4: 'ทำหน้าที่เป็นวิทยากรและผู้ให้คำแนะนำในงาน "พี่สอนน้อง". พัฒนาทักษะการพูดในที่สาธารณะ และประสบความสำเร็จในการสอนพื้นฐานคอมพิวเตอร์ให้กับนักเรียนรุ่นน้อง เพื่อช่วยให้พวกเขามีรากฐานที่แข็งแกร่งสำหรับการเรียนรู้ในอนาคต',
        work_tabbed5: "เข้าร่วมการแข่งขันศิลปหัตถกรรมนักเรียนระดับชาติ ครั้งที่ 70 และได้รับรางวัลชนะเลิศอันดับหนึ่ง ได้ผ่านเข้ารอบการแข่งขันระดับประเทศ. ประสบการณ์นี้ช่วยเพิ่มพูนความรู้และเปิดมุมมองใหม่ๆ จากการได้สัมผัสทักษะและงานฝีมือที่หลากหลาย",
        skills_title: "🏆 ทักษะ",
        gallery_title: "🎨 แกลเลอรี่",
        footer_logo: "Lumina AI ✨",
        footer_com_creer: "บริษัทพัฒนาซอฟต์แวร์ที่มุ่งมั่นสร้างสรรค์นวัตกรรมเทคโนโลยีเพื่อความสำเร็จของธุรกิจลูกค้า",
        footer_com_address: "📍 ที่อยู่: 123 ถนน หน้ามอ มหาลัยแห่งหนึ่งย่านเชียงใหม่",
        footer_services_title: "บริการของเรา",
        footer_services1: "ระบบ Point of Sale (POS)",
        footer_services2: "แอปพลิเคชันมือถือ",
        footer_services3: "เว็บไซต์และระบบออนไลน์",
        footer_services4: "ปรึกษาด้านเทคโนโลยี",
        footer_contect: "ติดต่อเรา",
        footer_phone: "📞 โทร: 02-XXX-XXXX",
        footer_mail: "📧 อีเมล: Lumina@innovatech.co.th",
        footer_line: "💬 Line: @Lumina_AI",
        footer_website: "🌐 เว็บไซต์: www.LuminaAi.co.th",
        footer_connectUs: "เชื่อมต่อกับเรา",
        footer_connectUs_des: "ติดตามข่าวสารและผลงานใหม่ๆ ของเรา",
        footer_created: "สร้างด้วยความใส่ใจโดยทีม LUMINA AI",
    }
};

let currentLang = 'en';

// ฟังก์ชันเปลี่ยนภาษา
function changeLanguage(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
        let key = el.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    langBtn.textContent = lang;
}

// Event เมื่อกดปุ่ม
langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'th' : 'en';
    changeLanguage(currentLang);
});

// เริ่มต้นโหลดภาษาเริ่มต้น
changeLanguage(currentLang);
