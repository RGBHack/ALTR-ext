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

document.getElementById("form").onsubmit = (e) => {
    e.preventDefault()
    $("#exampleModal").modal("hide")
    createEmail(document.getElementById("name-input").value)
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user !== null) {
        email = user.email
        uid = user.uid
        console.log(email + " " + uid)
        allAliases()
    } else {
        window.location.href = 'login.html'
        chrome.browserAction.setPopup({ popup: "login.html" });
    }
})

document.getElementById("logout-btn").onclick = () => {
    firebase.auth().signOut()
}


renderElement = (alias, state) => {
    console.log("rendering element")
    var pr = document.createElement("pr");
    pr.classList = "cnamep email"
    pr.id = alias + "_toplevel"
    if (state === "on") {
        pr.innerHTML = `<z id='${alias}_toggler' class='name' href='#'>${alias}</z><z title='Remove Email'><svg class='icon' height='20' width='20' id='${alias}_click'><use xlink:href='#cross'></use></svg></z>`
    } else {
        pr.innerHTML = `<z id='${alias}_toggler' style='text-decoration: line-through;' class='name' href='#'>${alias}</z><z title='Remove Email'><svg class='icon' height='20' width='20' id='${alias}_click'><use xlink:href='#cross'></use></svg></z>`
    }
    document.getElementById("actual_emails").appendChild(pr)
    document.getElementById(alias + "_click").onclick = (e) => {
        var elem = e.target;
        while (elem.nodeName !== "PR") {
            elem = elem.parentElement
        }
        console.log(elem.id.split("_toplevel")[0] + " delete")
        deleteAlias(elem.id.split("_toplevel")[0])
        elem.parentNode.removeChild(elem);
    }
    document.getElementById(alias + "_toggler").onclick = (e) => {
        var elem = e.target;
        while (elem.nodeName !== "PR") {
            elem = elem.parentElement
        }
        console.log(elem.id.split("_toplevel")[0] + " toggle")
        if (e.target.style["text-decoration"] != "line-through") {
            e.target.style["text-decoration"] = "line-through";
            offEmail(elem.id.split("_toplevel")[0])
        } else {
            e.target.style["text-decoration"] = "none";
            onEmail(elem.id.split("_toplevel")[0])
        }

        //toggle state
    }
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
                renderElement(email,"on")
            } else if (res === 5000) {
                console.log("Alias Limit Reached For User (5)");
            } else {
                console.log("An Error Occured During the Transaction")
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
                console.log("An Error Occured During the Transaction")
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
                console.log("An Error Occured During the Transaction")
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
                console.log(result.emails)
                for (var i in result.emails) {
                    for (var j in result.emails[i]) {
                        renderElement(j, result.emails[i][j])
                    }
                }
            } else {
                console.log("An Error Occured During the Transaction")
            }
        },
    })
}

deleteAlias = (email) => {
    if (uid === undefined || email === undefined) return;
    jQuery.ajax({
        url: 'http://altr.cf/delete',
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
                console.log("An Error Occured During the Transaction")
            }
        },
    })
}

document.getElementById("myInput").onclick = (e) => {
    console.log("modal")
    $("#exampleModal").modal()
}

document.getElementById("close2").onclick = (e) => {
    $("#exampleModal").modal('hide')
}