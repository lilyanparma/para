// دالة تبديل اللغة
function switchLang() {
  const currentLang = localStorage.getItem("selectedLanguage") || "ar";
  const newLang = currentLang === "ar" ? "fr" : "ar";
  localStorage.setItem("selectedLanguage", newLang);
  location.reload();
}

// دالة تحديث واجهة زر الترجمة (النص والعلم)
function updateLanguageUI() {
  const selectedLang = localStorage.getItem("selectedLanguage") || "ar";
  const langText = document.getElementById("langText");
  if (selectedLang === "ar") {
    langText.textContent = "AR";
    setMoroccoFlag();
  } else if (selectedLang === "fr") {
    langText.textContent = "FR";
    setFranceFlag();
  }
}

function setMoroccoFlag() {
  const flagIcon = document.getElementById("flagIcon");
  if (flagIcon) {
    flagIcon.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24">
        <rect width="24" height="24" fill="#c1272d"></rect>
        <circle cx="12" cy="12" r="5" fill="#006233"></circle>
      </svg>
    `;
  }
}

function setFranceFlag() {
  const flagIcon = document.getElementById("flagIcon");
  if (flagIcon) {
    flagIcon.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 60 40">
        <rect width="20" height="40" fill="#0055A4"></rect>
        <rect x="20" width="20" height="40" fill="white"></rect>
        <rect x="40" width="20" height="40" fill="#EF4135"></rect>
      </svg>
    `;
  }
}

document.addEventListener("DOMContentLoaded", function() {
  updateLanguageUI();
  const selectedLang = localStorage.getItem("selectedLanguage") || "ar";
  if (selectedLang === "ar") {
    console.log("اللغة العربية مختارة؛ لن يتم تحميل ملف ترجمة.");
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
  document.querySelectorAll("[data-translate]").forEach(element => {
    const key = element.getAttribute("data-translate");
    const translatedText = resolveTranslation(translations, key);
    if (translatedText) {
      element.textContent = translatedText;
    }
  });
}

function resolveTranslation(obj, key) {
  return key.split(".").reduce((current, part) => current && current[part], obj);
}
