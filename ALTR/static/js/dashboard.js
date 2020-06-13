var uid;
var email;
var config = {
    apiKey: "AIzaSyCc2eM-c8MZRFe5z8quDuvg_3Sz1IPUAxs",
}
if (firebase.apps.length === 0) {
    firebase.initializeApp(config)
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user !== null) {
        email = user.email
        uid = user.uid
    }
    else {
        window.location.href = 'login.html'
        chrome.browserAction.setPopup({popup: "login.html"});
    }
})

document.getElementById("logout-btn").onclick = () => {
    firebase.auth().signOut()
}