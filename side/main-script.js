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

function setupEventListeners() {
    setupThemeSwitcher();
    setupNotificationBell();
    checkProductNotifications(); // <-- تفعيل دالة التنبيهات
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
            event.stopPropagation();
            notificationPanel.classList.toggle('show');
        });
        document.addEventListener('click', (event) => {
            if (!notificationPanel.contains(event.target) && !notificationBtn.contains(event.target)) {
                notificationPanel.classList.remove('show');
            }
        });
    }
}

// === دالة تفعيل التنبيهات ===
function checkProductNotifications() {
  const notificationPanel = document.getElementById('notificationPanel');
  const notificationBadge = document.getElementById('notificationBadge');
  if (typeof database === 'undefined' || !notificationPanel || !notificationBadge) {
      console.log("Firebase or notification elements not ready yet.");
      return;
  }

  database.ref('products').on('value', (snapshot) => {
    const products = snapshot.val();
    const alerts = [];
    if (!products) return;

    for (const key in products) {
      const product = products[key];
      let totalQuantity = 0;
      
      if (product.batches) {
        totalQuantity = Object.values(product.batches).reduce((sum, batch) => sum + (Number(batch.quantity) || 0), 0);
        Object.values(product.batches).forEach(batch => {
            if(!batch.expiryDate) return;
            const expiryDate = new Date(batch.expiryDate);
            const today = new Date();
            const diffDays = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
            if (diffDays > 0 && diffDays <= 30) {
                alerts.push(`<li>صلاحية <b>${product.name}</b> (دفعة ${batch.batchNumber || ''}) تنتهي قريباً.</li>`);
            }
        });
      }
      if (totalQuantity > 0 && totalQuantity <= 5) {
        alerts.push(`<li>مخزون <b>${product.name}</b> منخفض (${totalQuantity} متبقية).</li>`);
      }
    }

    if (alerts.length > 0) {
      notificationPanel.innerHTML = `<ul style="padding-right: 20px; margin: 0;">${alerts.join('')}</ul>`;
      notificationBadge.textContent = alerts.length;
      notificationBadge.style.display = 'flex';
    } else {
      notificationPanel.innerHTML = '<p>لا توجد تنبيهات جديدة.</p>';
      notificationBadge.style.display = 'none';
    }
  }, (error) => {
      console.error("Error fetching notifications:", error);
      notificationPanel.innerHTML = '<p>خطأ في تحميل التنبيهات.</p>';
  });
}

// --- منطق تغيير اللغات ---
// ... (باقي دوال اللغة تبقى كما هي)
function loadSavedLanguage() { /*...*/ }
async function switchLang() { /*...*/ }
async function switchToFrench() { /*...*/ }
function setArabicFlag() { /*...*/ }
function setFranceFlag() { /*...*/ }
// ... (ضع هنا دوال اللغة الكاملة من الإجابة السابقة)
