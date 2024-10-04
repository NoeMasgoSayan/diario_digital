// Importamos la app
import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

import { checkLogin } from "./checkLogin.js";
// Importamos el archivo de registro
import "./signupForms.js";
import "./signOut.js";
import "./signinForms.js";
import "./googleLogin.js";

// Manejo de la autenticación
onAuthStateChanged(auth, async (user) => {
  console.log(user);
  checkLogin(user);
});
