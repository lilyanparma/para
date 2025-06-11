// =================================================================
// == ملف إعدادات Firebase المشترك - Pharmacy System ==
// =================================================================

// تم استخدام البيانات الصحيحة التي أرسلتها
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
firebase.initializeApp(firebaseConfig);

// === الحل النهائي: تعريف المتغير بشكل عام ===
// هذا يجعل المتغير "database" متاحاً لجميع ملفات المشروع
database = firebase.database();
// =========================================

console.log("Firebase has been initialized correctly. Database object is now global.");
