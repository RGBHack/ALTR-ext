var uid;
var email;
var tabname;

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var tab = tabs[0];
    var url = new URL(tab.url)
    var arr = url.hostname.split('.')
    if (arr.length >= 2) tabname = arr[arr.length - 2]
    else tabname = arr[0]
    document.getElementById("name-input").value = tabname
})

var config = {
    apiKey: "AIzaSyCc2eM-c8MZRFe5z8quDuvg_3Sz1IPUAxs",
}

if (firebase.apps.length === 0) {
    firebase.initializeApp(config)
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user !== null) {
        email = user.email
        uid = user.uid
        console.log(email + " " + uid)
            //send post request to emails and initialize all the emails
    } else {
        window.location.href = 'login.html'
        chrome.browserAction.setPopup({ popup: "login.html" });
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
            username: name
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
                console.log(email)
            } else {
                console.log(res);
            }
        },
    })
}

onEmail = (alias) => {
    if (uid === undefined || email === undefined) return;
    jQuery.ajax({
        url: 'http://altr.cf/on',
        type: 'POST',
        data: JSON.stringify({
            youremail: email,
            email: alias,
            uid: uid
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
                // doSomething
            } else {
                console.log(res);
            }
        },
    })
}

offEmail = (alias) => {
    if (uid === undefined || email === undefined) return;
    jQuery.ajax({
        url: 'http://altr.cf/off',
        type: 'POST',
        data: JSON.stringify({
            youremail: email,
            email: alias,
            uid: uid
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
                // doSomething
            } else {
                console.log(res);
            }
        },
    })
}

status = (alias) => {
    if (uid === undefined || email === undefined) return;
    jQuery.ajax({
        url: 'http://altr.cf/status',
        type: 'POST',
        data: JSON.stringify({
            youremail: email,
            email: alias,
            uid: uid
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
                // doSomething
            } else {
                console.log(res);
            }
        },
    })
}

allAliases = () => {
    if (uid === undefined || email === undefined) return;
    jQuery.ajax({
        url: 'http://altr.cf/emails',
        type: 'POST',
        data: JSON.stringify({
            youremail: email,
            uid: uid,
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
            } else {
                console.log(res);
            }
        },
    })
}

deleteAlias = (email) => {
    if (uid === undefined || email === undefined) return;
    jQuery.ajax({
        url: 'http://altr.cf/create',
        type: 'POST',
        data: JSON.stringify({
            email: email,
            uid: uid,
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
            } else {
                console.log(res);
            }
        },
    })
}

document.getElementById("myInput").onclick = (e) => {
    /*$('#myModal').on('shown.bs.modal', function() {
        $('#myInput').trigger('focus')
    })*/
    console.log("modal")
    $("#exampleModal").modal()
}

document.getElementById("close2").onclick = (e) => {
    $("#exampleModal").modal('hide')
}