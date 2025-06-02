document.addEventListener("DOMContentLoaded", function() {
  const selectedLang = localStorage.getItem('selectedLanguage') || 'fr';
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
