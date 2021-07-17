function reloadOldAeries() {
    chrome.tabs.query({ url: "https://*.aeries.net/*" }, function (tabs) {
        for (tab of tabs) {
            chrome.tabs.reload(tab.id)
        }

    })
}
function showHideImages() {
    windowWidth = window.innerWidth
    if (windowWidth <= 1100) {
        try {
            document.getElementsByTagName('img')[1].style.display = 'none'
            document.getElementsByTagName('img')[2].style.display = 'none'
        } catch { }
    } else {
        try {
            document.getElementsByTagName('img')[1].style.display = 'unset'
            document.getElementsByTagName('img')[2].style.display = 'unset'
        } catch { }
    }
}
function setVersion() {
    var manifestData = chrome.runtime.getManifest();
    console.log(manifestData.version);
    document.getElementById('versioningInfo').textContent = document.getElementById('versioningInfo').textContent.replace("0.0.0", manifestData.version)
}
reloadOldAeries()
setTimeout(showHideImages, 200)
setTimeout(setVersion, 200)
document.body.onresize = showHideImages