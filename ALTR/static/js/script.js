chrome.tabs.getSelected(null, function (tab) {
    myFunction(tab.url);
});

function myFunction(tablink) {
    document.getElementById("ctab").innerHTML = "You're on " + tablink;
}
