var config = {
  apiKey: "AIzaSyCc2eM-c8MZRFe5z8quDuvg_3Sz1IPUAxs",
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const form = document.getElementById("form");

form.onsubmit = function (e) {
  console.log("submitted");
  e.preventDefault();
  const email = form["email"].value;
  const password = form["password"].value;
  auth
    .signInWithEmailAndPassword(email, password)
    .then((cred) => {
      window.location.href = "popup.html";
      chrome.browserAction.setPopup({ popup: "popup.html" });
    })
    .catch((err) => {
      alert("Please check your email and password");
    });
};
