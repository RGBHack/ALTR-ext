//document.getElementById("gen").addEventListener("click", gen);
//document.getElementById("dashboard_btn").addEventListener("click", dashboard)

function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
        hostname = url.split("/")[2];
    } else {
        hostname = url.split("/")[0];
    }

    //find & remove port number
    hostname = hostname.split(":")[0];
    //find & remove "?"
    hostname = hostname.split("?")[0];

    return hostname;
}

chrome.tabs.getSelected(null, function (tab) {
    myFunction(tab.url, tab.title);
});

function myFunction(tablink, tabtitle) {
    //document.getElementById("curl").innerHTML = extractHostname(tablink);
    //document.getElementById("curl").href = tablink;
    //document.getElementById("cname").innerHTML = extractHostname(tabtitle);
}

function dashboard() {
    window.location.href = 'dashboard.html'
    chrome.browserAction.setPopup({popup: "dashboard.html"});
}

function gen() {
    // document.getElementById("cname").innerHTML = "hi";
    jQuery.ajax({
        url: "http://altr.cf/emails",
        type: "POST",
        data: JSON.stringify({
            username: "rohan",
            email: "sadfasdfsafd",
            youremail: "rohanj2006@gmail.com",
            uid: "very_good_uid",
        }),
        contentType: "application/json",
        beforeSend: function (x) {
            if (x && x.overrideMimeType) {
                x.overrideMimeType("application/json;charset=UTF-8");
            }
        },
        success: function (result) {
            document.getElementById("email").innerHTML =
                "Email: " + result.emails;
        },
    });
}


var config = {
    apiKey: "AIzaSyCc2eM-c8MZRFe5z8quDuvg_3Sz1IPUAxs",
}
if (firebase.apps.length === 0) {
    firebase.initializeApp(config)
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user !== null) {
        console.log(user)
    }
})
