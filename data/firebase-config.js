// =================================================================
// == ملف إعدادات Firebase المشترك - Pharmacy System ==
// =================================================================

// أولاً: قم بوضع معلومات مشروعك في Firebase هنا
// الرجاء استخدام مفاتيح جديدة وآمنة من حسابك في Firebase
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

// ثانياً: تهيئة تطبيق Firebase
firebase.initializeApp(firebaseConfig);

// ثالثاً: إنشاء متغير مشترك للوصول إلى قاعدة البيانات
// هذا المتغير (database) سيكون متاحاً في جميع الصفحات التي تستدعي هذا الملف
const database = firebase.database();

console.log("Firebase has been initialized from firebase-config.js");
