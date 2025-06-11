// =======================================================
// ===== هذا هو ملف السكربت المشترك لجميع الصفحات =====
// =======================================================

// انتظر حتى يتم تحميل محتوى الصفحة بالكامل
document.addEventListener('DOMContentLoaded', () => {
  // --- 1. تحميل الهيدر المشترك تلقائياً ---
  // هذا الكود يبحث عن ملف header.html ويضعه في الصفحة
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      // ابحث عن العنصر الذي سيحتوي على الهيدر وقم بوضع الكود فيه
      const headerPlaceholder = document.getElementById('header-placeholder');
      if (headerPlaceholder) {
        headerPlaceholder.innerHTML = data;
        // بعد تحميل الهيدر، قم بتفعيل وظيفة تغيير الألوان
        setupThemeSwitcher();
      }
    })
    .catch(error => console.error('Error loading header:', error));

  // --- 2. تفعيل نظام الألوان المحفوظ ---
  // هذا الكود يتأكد من أن اللون الذي اختاره المستخدم يظل ثابتاً
  const savedTheme = localStorage.getItem('selectedTheme') || 'violet';
  document.body.className = 'theme-' + savedTheme;
});


// --- 3. وظيفة فتح وإغلاق القائمة الجانبية ---
let isSidebarOpen = false;
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  
  isSidebarOpen = !isSidebarOpen;
  
  if (sidebar && overlay) {
    if (isSidebarOpen) {
      sidebar.classList.add('active');
      overlay.classList.add('active');
    } else {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
    }
  }
}

// --- 4. وظيفة تفعيل زر تغيير الألوان ---
function setupThemeSwitcher() {
  const themeDots = document.querySelectorAll('.theme-dot');
  themeDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const selectedColor = e.target.dataset.color;
      
      // قم بتغيير كلاس الـ body لتطبيق اللون الجديد
      document.body.className = 'theme-' + selectedColor;
      
      // احفظ اختيار المستخدم في الـ localStorage
      localStorage.setItem('selectedTheme', selectedColor);
    });
  });
}

// وظيفة تغيير اللغة (للتوافقية مع الكود القديم)
function switchLang() {
  alert('Language switching functionality should be implemented here.');
}
