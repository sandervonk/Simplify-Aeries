try{
var lastIP = document.getElementById('ctl00_MainContent_lblPrevIP').textContent
var currentIP = document.getElementById('ctl00_MainContent_lblCurrentIP').textContent
if(currentIP = lastIP) {
    document.getElementById('ctl00_MainContent_tblLoginHistory').style = "display: none;"
}
}catch{}
try{
    document.getElementsByClassName("CurrentPage")[0].parentElement.style = "background-color: #5a7198"
}catch{}