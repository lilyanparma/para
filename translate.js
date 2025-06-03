// عند تحميل الصفحة، نقوم بالتحقق من اللغة المختارة
document.addEventListener("DOMContentLoaded", function() {
  // استرجاع اللغة المختارة من localStorage، وإذا لم توجد نجعل اللغة العربية الافتراضية.
  const selectedLang = localStorage.getItem('selectedLanguage') || 'ar';

  // إذا كانت اللغة العربية، لا حاجة لتحميل ملف ترجمة لأن المحتوى الأصلي عربي.
  if (selectedLang === 'ar') {
    console.log("العربية مختارة، لن يتم تحميل ملف ترجمة.");
    return;
  }

  // إذا كانت اللغة غير العربية، نقوم بتحميل ملف الترجمة المناسب من مجلد lang
  fetch(`lang/${selectedLang}.json`)
    .then(response => response.json())
    .then(translations => {
      applyTranslations(translations);
    })
    .catch(error => console.error("Error loading translations:", error));
});

// دالة لتحديث العناصر التي تحمل سمة data-translate بالنصوص المترجمة
function applyTranslations(translations) {
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    const translatedText = resolveTranslation(translations, key);
    if (translatedText) {
      element.textContent = translatedText;
    }
  });
}

// دالة مساعدة تدعم المفاتيح المتداخلة مثل "invoice.title"
function resolveTranslation(obj, key) {
  return key.split('.').reduce((current, part) => current && current[part], obj);
}

// دالة لتبديل اللغة بين العربية والفرنسية وإعادة تحميل الصفحة
function switchLang() {
  // استرجاع اللغة الحالية، والافتراضية هنا "ar"
  const currentLang = localStorage.getItem('selectedLanguage') || 'ar';
  // تحديد اللغة الجديدة: إذا كانت العربية، نتبدل إلى "fr"، والعكس صحيح
  const newLang = currentLang === 'ar' ? 'fr' : 'ar';
  localStorage.setItem('selectedLanguage', newLang);
  location.reload(); // إعادة تحميل الصفحة لتطبيق التغييرات
}
