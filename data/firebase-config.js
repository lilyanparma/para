// =================================================================
// == ملف إعدادات Firebase المشترك - Pharmacy System ==
// =================================================================

// =================================================================
// == ملف إعدادات Firebase المشترك - تم التصحيح ==
// =================================================================

// تم استخدام الإعدادات التي قدمتها وتصحيح بناء الكود
const firebaseConfig = {
  apiKey: "AIzaSyDRtJBPOjpfXXfsaDo98E_NTT7KWzz8gj4",
  authDomain: "pharmacy-system-9def6.firebaseapp.com",
  databaseURL: "https://pharmacy-system-9def6-default-rtdb.firebaseio.com",
  projectId: "pharmacy-system-9def6",
  storageBucket: "pharmacy-system-9def6.firebasestorage.app",
  messagingSenderId: "630855008414",
  appId: "1:630855008414:web:b464bcb81c8a2091d0fb8f",
  measurementId: "G-LC5NDKP6QZ"
};

// تهيئة تطبيق Firebase
// تأكد من تحميل سكربتات Firebase في ملفات HTML قبل هذا الملف
try {
  firebase.initializeApp(firebaseConfig);

  // إنشاء متغير مشترك للوصول إلى قاعدة البيانات
  const database = firebase.database();

  console.log("Firebase has been initialized successfully from firebase-config.js");
} catch (e) {
  console.error("Error initializing Firebase:", e);
  // يمكنك إضافة تنبيه للمستخدم هنا إذا فشلت التهيئة
  alert("فشل الاتصال بقاعدة البيانات. الرجاء التحقق من إعدادات Firebase أو الاتصال بالإنترنت.");
}
