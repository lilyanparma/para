document.addEventListener("DOMContentLoaded", function() {
  // إذا لم يتم تخزين لغة مختارة، نجعل العربية هي الافتراضية (ولأن الكود بالعربية بالفعل، لا نقوم بتحميل أي ملف)
  const selectedLang = localStorage.getItem('selectedLanguage') || 'ar';

  // إذا كانت اللغة الافتراضية "ar"، لا حاجة لتحميل ملف الترجمة
  if(selectedLang === 'ar'){
    return;
  }

  fetch(`lang/${selectedLang}.json`)
    .then(response => response.json())
    .then(translations => {
      applyTranslations(translations);
    })
    .catch(error => console.error("Error loading translations:", error));
});

function applyTranslations(translations) {
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    const translatedText = resolveTranslation(translations, key);
    if (translatedText) {
      element.textContent = translatedText;
    }
  });
}

function resolveTranslation(obj, key) {
  return key.split('.').reduce((current, part) => current && current[part], obj);
}
