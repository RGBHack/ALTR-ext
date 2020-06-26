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
        //send post request to emails and initialize all the emails
    }
    else {
        window.location.href = 'login.html'
        chrome.browserAction.setPopup({popup: "login.html"});
    }
})

document.getElementById("logout-btn").onclick = () => {
    firebase.auth().signOut()
}

createEmail = (name) => {
    if (uid === undefined || email === undefined) return;
    jQuery.ajax({
        url: 'http://altr.cf/create',
        type: 'POST',
        data: JSON.stringify({
          uid: uid,
          youremail: email,
          name: name
        }),
        contentType: 'application/json',
        beforeSend: function(x) {
          if (x && x.overrideMimeType) {
            x.overrideMimeType('application/json;charset=UTF-8')
          }
        },
        success: function(result) {
          var res = result.res;
          if (res === 0) {
            var email = result.email
            //create an emlement for that email
          }
          else {
              console.log(res);
          }
        },
    })
}