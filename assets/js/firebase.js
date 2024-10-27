// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";

// Autenticación
import {
  getAuth,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

// Firestore
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAE4bAnGPuCqyLLmK7zCOvxHR057TcmjN0",
  authDomain: "diario-digital-1c065.firebaseapp.com",
  projectId: "diario-digital-1c065",
  storageBucket: "diario-digital-1c065.appspot.com",
  messagingSenderId: "423812313530",
  appId: "1:423812313530:web:7a14e7b99cc31685586d83",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize Firestore
export const db = getFirestore();

// Operaciones CRUD
export const createTask = (
  title,
  description,
  userName,
  userImage,
  userEmail,
  timeData
) =>
  //TODO Aquí se añade todo lo que quieres que aparezca
  addDoc(collection(db, "tasks"), {
    title,
    description,
    userName,
    userImage,
    userEmail,
    timeData,
  });

export const onGetTask = (callback) =>
  onSnapshot(collection(db, "tasks"), callback);

export const getTask = (id) => getDoc(doc(db, "tasks", id));

export const updateTask = (id, newData) =>
  updateDoc(doc(db, "tasks", id), newData);

export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

export { updateProfile };

// * Comentarios
export const createComments = (
  description,
  userName,
  userImage,
  userEmail,
  timeData,
  postId
) =>
  //TODO Aquí se añade todo lo que quieres que aparezca
  addDoc(collection(db, "comments"), {
    description,
    userName,
    userImage,
    userEmail,
    timeData,
    postId,
  });

export const onGetComments = (callback) =>
  onSnapshot(collection(db, "comments"), callback);

export const getComments = (id) => getDoc(doc(db, "comments", id));

export const updateComments = (id, newData) =>
  updateDoc(doc(db, "comments", id), newData);

export const deleteComments = (id) => deleteDoc(doc(db, "comments", id));
