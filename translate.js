// دالة تبديل اللغة (تعتمد هنا على تبديل العربية والفرنسية كمثال)
function switchLang() {
  // الحصول على اللغة الحالية، والعربية "ar" هي الافتراضية
  const currentLang = localStorage.getItem("selectedLanguage") || "ar";
  // التبديل: إذا كانت الحالية "ar" نبدل إلى "fr"، والعكس صحيح
  const newLang = currentLang === "ar" ? "fr" : "ar";
  localStorage.setItem("selectedLanguage", newLang);
  location.reload(); // إعادة تحميل الصفحة لتطبيق التغييرات
}

// دالة تقوم بتحديث جميع العناصر التي تحمل سمة data-translate باستخدام ملف الترجمة
function applyTranslations(translations) {
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    const translatedText = resolveTranslation(translations, key);
    if (translatedText) {
      element.textContent = translatedText;
    }
  });
}

// دالة مساعدة لتفسير المفاتيح المتداخلة مثل "invoice.title"
function resolveTranslation(obj, key) {
  return key.split('.').reduce((current, part) => current && current[part], obj);
}

// عند تحميل الصفحة، قم بالتحقق من اللغة المختارة
document.addEventListener("DOMContentLoaded", function() {
  // استرجاع اللغة المختارة من localStorage؛ إذا لم توجد نجعل العربية الافتراضية
  const selectedLang = localStorage.getItem('selectedLanguage') || 'ar';

  // إذا كانت العربية مختارة، فلا حاجة لتحميل ملف ترجمة
  if (selectedLang === 'ar') {
    console.log("اللغة العربية مختارة. لن يتم تحميل ملف ترجمة.");
    return;
  }

  // إذا كانت اللغة المختارة غير العربية، نقوم بتحميل ملف الترجمة المناسب
  fetch(`lang/${selectedLang}.json`)
    .then(response => response.json())
    .then(translations => {
      applyTranslations(translations);
    })
    .catch(error => console.error("Error loading translations:", error));
});
