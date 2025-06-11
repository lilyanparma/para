// side/main-script.js
document.addEventListener('DOMContentLoaded', () => {
  loadSharedHeader();
  applySavedTheme();
});

function loadSharedHeader() {
  fetch('side/header.html')
    .then(response => response.ok ? response.text() : Promise.reject('Header not found'))
    .then(data => {
      const headerPlaceholder = document.getElementById('header-placeholder');
      if (headerPlaceholder) {
        headerPlaceholder.innerHTML = data;
        // بعد تحميل الهيدر، قم بتفعيل وظائفه
        setupEventListeners();
        loadSavedLanguage();
      }
    })
    .catch(error => console.error('فشل تحميل الهيدر المشترك:', error));
}

function applySavedTheme() {
  const savedTheme = localStorage.getItem('selectedTheme') || 'violet';
  document.body.className = 'theme-' + savedTheme;
}

// دالة لتجميع كل مستمعي الأحداث
function setupEventListeners() {
    setupThemeSwitcher();
    setupNotificationBell();
    // أي وظائف أخرى تحتاج تفعيل بعد تحميل الهيدر
}

// --- منطق القائمة الجانبية ---
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

// --- منطق تغيير الألوان ---
function setupThemeSwitcher() {
  const themeDots = document.querySelectorAll('.theme-dot');
  themeDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const selectedColor = e.target.dataset.color;
      document.body.className = 'theme-' + selectedColor;
      localStorage.setItem('selectedTheme', selectedColor);
    });
  });
}

// --- منطق زر الجرس ---
function setupNotificationBell() {
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationPanel = document.getElementById('notificationPanel');
    if (notificationBtn && notificationPanel) {
        notificationBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // يمنع إغلاق القائمة عند الضغط على الزر
            notificationPanel.classList.toggle('show');
        });

        // إغلاق القائمة عند الضغط في أي مكان آخر
        document.addEventListener('click', (event) => {
            if (!notificationPanel.contains(event.target) && !notificationBtn.contains(event.target)) {
                notificationPanel.classList.remove('show');
            }
        });
    }
}


// --- منطق تغيير اللغات ---
function loadSavedLanguage() {
  const savedLang = localStorage.getItem('selectedLanguage');
  if (savedLang === 'fr') {
    switchToFrench();
  } else {
    setArabicFlag();
  }
}

async function switchLang() {
  const currentLang = localStorage.getItem('selectedLanguage');
  if (currentLang === 'fr') {
    localStorage.removeItem('selectedLanguage');
    location.reload();
  } else {
    await switchToFrench();
  }
}

async function switchToFrench() {
  try {
    const response = await fetch('side/fr.json');
    if (!response.ok) throw new Error('Translation file not found');
    const texts = await response.json();
    
    // إكمال ترجمة كل العناصر
    const translations = {
        'siteTitle': texts.site_title,
        'mainTitle': texts.main_title,
        'menuHome': texts.menu_home,
        'menuProducts': texts.menu_products,
        'menuViewProducts': texts.menu_view_products,
        'menuSellProducts': texts.menu_sell_products,
        'menuServices': texts.menu_services,
        'menuProfits': texts.menu_profits,
        'footerText': `<p>${texts.footer_text}</p>`
    };
    
    for (const id in translations) {
        const element = document.getElementById(id);
        if (element) {
            if(id === 'footerText') element.innerHTML = translations[id];
            else element.textContent = translations[id];
        }
    }

    setFranceFlag();
    localStorage.setItem('selectedLanguage', 'fr');
    document.documentElement.lang = 'fr';
    // لا نغير اتجاه الصفحة هنا لكي لا يتأثر التصميم بشكل كبير
    // document.documentElement.dir = 'ltr'; 
  } catch (error) { 
    console.error("فشل تحميل ملف الترجمة:", error); 
  }
}

function setArabicFlag() {
  const flagIcon = document.getElementById('flagIcon');
  const langText = document.getElementById('langText');
  if (flagIcon && langText) {
      flagIcon.innerHTML = `<rect width="60" height="40" fill="#C1272D"/><path d="M30 10 L35 18 L43 18 L37 23 L39 31 L30 26 L21 31 L23 23 L17 18 L25 18 Z" fill="#006233"/>`;
      langText.textContent = 'AR';
  }
}

function setFranceFlag() {
  const flagIcon = document.getElementById('flagIcon');
  const langText = document.getElementById('langText');
  if (flagIcon && langText) {
      flagIcon.innerHTML = `<rect width="20" height="40" fill="#0055A4"/><rect x="20" width="20" height="40" fill="white"/><rect x="40" width="20" height="40" fill="#EF4135"/>`;
      langText.textContent = 'FR';
  }
}
