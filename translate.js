// دالة تبديل اللغة بين العربية والفرنسية وإعادة تحميل الصفحة لتطبيق التغييرات
function switchLang() {
  // الحصول على اللغة الحالية؛ إذا لم يتم تعيينها فالافتراضية "ar"
  const currentLang = localStorage.getItem("selectedLanguage") || "ar";
  // التبديل: إذا كانت "ar" تصبح "fr" والعكس صحيح
  const newLang = currentLang === "ar" ? "fr" : "ar";
  localStorage.setItem("selectedLanguage", newLang);
  location.reload(); // إعادة تحميل الصفحة لتطبيق التغييرات
}

// دوال لتحديث واجهة زر الترجمة (النص والعلم)
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
  // تحديث عنصر العلم ليعرض علم المغرب
  const flagIcon = document.getElementById("flagIcon");
  if (flagIcon) {
    flagIcon.innerHTML = `
      <!-- يمكنك تعديل هذا SVG حسب التصميم المطلوب -->
      <svg width="24" height="24" viewBox="0 0 24 24">
        <rect width="24" height="24" fill="#c1272d"></rect>
        <circle cx="12" cy="12" r="5" fill="#006233"></circle>
      </svg>
    `;
  }
}

function setFranceFlag() {
  // تحديث عنصر العلم ليعرض علم فرنسا
  const flagIcon = document.getElementById("flagIcon");
  if (flagIcon) {
    flagIcon.innerHTML = `
      <!-- يمكنك تعديل هذا SVG حسب التصميم المطلوب -->
      <svg width="24" height="24" viewBox="0 0 60 40">
        <rect width="20" height="40" fill="#0055A4"></rect>
        <rect x="20" width="20" height="40" fill="white"></rect>
        <rect x="40" width="20" height="40" fill="#EF4135"></rect>
      </svg>
    `;
  }
}

// تحميل الترجمة وتطبيقها على العناصر التي تحمل الخاصية data-translate
document.addEventListener("DOMContentLoaded", function() {
  // تحديث واجهة زر الترجمة دائمًا حتى لو كانت اللغة الافتراضية عربية
  updateLanguageUI();

  // استرجاع اللغة المختارة من localStorage؛ افتراضيًا "ar"
  const selectedLang = localStorage.getItem("selectedLanguage") || "ar";

  // إذا كانت اللغة المختارة "ar" فلا حاجة لتحميل ملف ترجمة لأن المحتوى الأصلي باللغة العربية
  if (selectedLang === "ar") {
    console.log("اللغة العربية مختارة؛ لن يتم تحميل ملف ترجمة.");
    return;
  }

  // إذا كانت اللغة المختارة لغة أخرى (مثلاً "fr") نقوم بتحميل ملف الترجمة المناسب
  fetch(`lang/${selectedLang}.json`)
    .then(response => response.json())
    .then(translations => {
      applyTranslations(translations);
    })
    .catch(error => console.error("Error loading translations:", error));
});

// دالة تبحث عن جميع العناصر التي تحمل data-translate وتحدث محتواها
function applyTranslations(translations) {
  document.querySelectorAll("[data-translate]").forEach(element => {
    const key = element.getAttribute("data-translate");
    const translatedText = resolveTranslation(translations, key);
    if (translatedText) {
      element.textContent = translatedText;
    }
  });
}

// دالة مساعدة لتفكيك المفاتيح المتداخلة (مثلاً "invoice.title")
function resolveTranslation(obj, key) {
  return key.split(".").reduce((current, part) => current && current[part], obj);
}
