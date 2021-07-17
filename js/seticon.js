const toggledOnIcon = {
    19: "../icon/icon_19.png",
    38: "../icon/icon_38.png",
  };
  
  const toggledOffIcon = {
    19: "../icon/iconOff_19.png",
    38: "../icon/iconOff_38.png",
  };
function forceUpdate() {
    var status = document.getElementById('toggleExtention').checked
    updateIcon(status)
}
function updateIcon(toggled) {
    chrome.browserAction.setIcon({
        path: toggled ? toggledOnIcon : toggledOffIcon,
    });
    if(toggled) {document.getElementById('logo').src = "../icon/icon_38.png"} else {document.getElementById('logo').src = "../icon/iconOff_38.png"}
}
document.getElementById('toggleExtention').addEventListener('click', forceUpdate)