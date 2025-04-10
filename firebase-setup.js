// firebase-setup.js

// إعدادات Firebase الخاصة بمشروع Pharmacy System
const firebaseConfig = {
  apiKey: "AIzaSyDRtJBPOjpfXXfsaDo98E_NTT7KWzz8gj4",
  authDomain: "pharmacy-system-9def6.firebaseapp.com",
  projectId: "pharmacy-system-9def6",
  storageBucket: "pharmacy-system-9def6.firebasestorage.app",
  messagingSenderId: "630855008414",
  appId: "1:630855008414:web:b464bcb81c8a2091d0fb8f",
  measurementId: "G-LC5NDKP6QZ"
};

// تهيئة Firebase
firebase.initializeApp(firebaseConfig);

// (اختياري) تهيئة التحليلات إذا كنت ترغب باستخدام Firebase Analytics
if (firebaseConfig.measurementId) {
  firebase.analytics();
}

// إنشاء متغير لقاعدة البيانات (Realtime Database كمثال)
// إذا كنت تستخدم Firestore فستحتاج إلى تضمين مكتبة firestore.js وتعديل هذا الجزء
const database = firebase.database();

// يمكن إضافة دوال مساعدة هنا للتعامل مع البيانات، مثلاً:
function addData(path, data) {
  return database.ref(path).set(data)
    .then(() => console.log("تم حفظ البيانات بنجاح"))
    .catch(error => console.error("خطأ في حفظ البيانات:", error));
}

function readData(path, callback) {
  database.ref(path).on('value', (snapshot) => {
    callback(snapshot.val());
  });
}
