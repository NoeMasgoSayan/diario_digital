const loggedIn = document.querySelectorAll(".logged-in");
const loggedOut = document.querySelectorAll(".logged-out");

export const checkLogin = (user) => {
  // Modoficamos
  if (user) {
    loggedIn.forEach((element) => (element.style.display = "block"));
    loggedOut.forEach((element) => (element.style.display = "none"));
  } else {
    loggedOut.forEach((element) => (element.style.display = "block"));
    loggedIn.forEach((element) => (element.style.display = "none"));
  }
};
