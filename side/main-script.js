// =======================================================
// ===== الملف الرئيسي المشترك لجميع صفحات المشروع =====
// =======================================================

// --- 1. الوظيفة الرئيسية: تحميل المكونات عند فتح الصفحة ---
document.addEventListener('DOMContentLoaded', () => {
  // تحميل الهيدر والقائمة الجانبية من ملف HTML منفصل
  loadSharedHeader();

  // تطبيق اللون المحفوظ من الجلسة السابقة
  applySavedTheme();
});

/**
 * يقوم بتحميل ملف header.html ووضعه في الصفحة،
 * ثم يقوم بتفعيل الوظائف التي تعتمد عليه.
 */
function loadSharedHeader() {
  fetch('side/header.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.text();
    })
    .then(data => {
      const headerPlaceholder = document.getElementById('header-placeholder');
      if (headerPlaceholder) {
        headerPlaceholder.innerHTML = data;
        
        // الآن بعد أن تم تحميل الهيدر بنجاح،
        // يمكننا تفعيل الوظائف التي تتعامل معه بأمان.
        setupThemeSwitcher();
        loadSavedLanguage();
      }
    })
    .catch(error => console.error('فشل تحميل الهيدر المشترك:', error));
}

/**
 * يطبق اللون الذي اختاره المستخدم سابقاً والمحفوظ في الـ localStorage.
 */
function applySavedTheme() {
  const savedTheme = localStorage.getItem('selectedTheme') || 'violet'; // اللون البنفسجي هو الافتراضي
  document.body.className = 'theme-' + savedTheme;
}


// --- 2. منطق القائمة الجانبية (Sidebar) ---
let isSidebarOpen = false;

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    isSidebarOpen = !isSidebarOpen;
    
    if (sidebar && overlay) {
        sidebar.classList.toggle('active', isSidebarOpen);
        overlay.classList.toggle('active', isSidebarOpen);
    }
}


// --- 3. منطق تغيير الألوان (Theme Switcher) ---
function setupThemeSwitcher() {
  const themeDots = document.querySelectorAll('.theme-dot');
  themeDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const selectedColor = e.target.dataset.color;
      
      // تغيير كلاس الـ body لتطبيق اللون الجديد من ملف CSS
      document.body.className = 'theme-' + selectedColor;
      
      // حفظ اختيار المستخدم في الـ localStorage ليتذكره المتصفح
      localStorage.setItem('selectedTheme', selectedColor);
    });
  });
}


// --- 4. منطق تغيير اللغات ---
/**
 * يقوم بتحميل اللغة المحفوظة (عربي أو فرنسي) عند فتح الصفحة.
 */
function loadSavedLanguage() {
  const savedLang = localStorage.getItem('selectedLanguage');
  if (savedLang === 'fr') {
    switchToFrench();
  } else {
    setArabicFlag(); // الافتراضي هو العربي
  }
}

/**
 * وظيفة التبديل بين اللغات عند الضغط على الزر.
 */
async function switchLang() {
  const currentLang = localStorage.getItem('selectedLanguage');
  if (currentLang === 'fr') {
    localStorage.setItem('selectedLanguage', 'ar');
    location.reload(); // أسهل طريقة للعودة إلى العربية هي إعادة تحميل الصفحة
  } else {
    await switchToFrench();
  }
}

/**
 * يقوم بتحميل ملف الترجمة الفرنسي وتطبيقه على الصفحة.
 */
async function switchToFrench() {
  try {
    const response = await fetch('side/fr.json'); // التأكد من المسار الصحيح
    if (!response.ok) throw new Error('File not found');
    const texts = await response.json();

    // تحديث النصوص (يمكنك إضافة المزيد هنا)
    const titleEl = document.getElementById('siteTitle');
    if(titleEl) titleEl.textContent = texts.site_title;
    
    const menuHomeEl = document.getElementById('menuHome');
    if(menuHomeEl) menuHomeEl.textContent = texts.menu_home;

    const menuProductsEl = document.getElementById('menuProducts');
    if(menuProductsEl) menuProductsEl.textContent = texts.menu_products;
    
    // ... وهكذا لباقي عناصر القائمة ...

    setFranceFlag();
    localStorage.setItem('selectedLanguage', 'fr');
    document.documentElement.lang = 'fr';
    document.documentElement.dir = 'ltr'; // تغيير اتجاه الصفحة للفرنسية
    
  } catch (error) { 
    console.error("فشل تحميل ملف الترجمة:", error); 
  }
}

/**
 * يغير شكل زر اللغة إلى علم المغرب والنص "AR".
 */
function setArabicFlag() {
  const flagIcon = document.getElementById('flagIcon');
  const langText = document.getElementById('langText');
  if (flagIcon && langText) {
      flagIcon.innerHTML = `<rect width="60" height="40" fill="#C1272D"/><path d="M30 10 L35 18 L43 18 L37 23 L39 31 L30 26 L21 31 L23 23 L17 18 L25 18 Z" fill="#006233"/>`;
      langText.textContent = 'AR';
  }
}

/**
 * يغير شكل زر اللغة إلى علم فرنسا والنص "FR".
 */
function setFranceFlag() {
  const flagIcon = document.getElementById('flagIcon');
  const langText = document.getElementById('langText');
  if (flagIcon && langText) {
      flagIcon.innerHTML = `<rect width="20" height="40" fill="#0055A4"/><rect x="20" width="20" height="40" fill="white"/><rect x="40" width="20" height="40" fill="#EF4135"/>`;
      langText.textContent = 'FR';
  }
}
