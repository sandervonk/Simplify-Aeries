//function to click the login with google button when it is loaded
function fix_button() {document.getElementsByClassName("btn btn-login Google")[0].style = 'background-size: contain !important;'}
//email checking function similar to the one used by the options page
function emailCheck(email) { 
    var re= /\b[a-z0-9-_.]+@[a-z0-9-_.]+(\.[a-z0-9]+)+/i
    return(re.test(email))
}
//see fix_button, this just waits for it, a way around the rules on what you can use with .addEventListener
function time_fix() {try{setTimeout(fix_button, 100)}catch{}}

//Grab our saved options from chrome's storage and open them as the input 'result' to a function
//Prepare for try{}catch{} abuse... yeah there's probably a much better way of doing this
function runChanges() {
    chrome.storage.sync.get(['useImage', 'imgLink2', 'bgColor', 'sColor1', 'sColor2', 'remove', 'floatBtn', 'background', 'automaticallyLogin', 'loginOAuth'], function(result) {
        //set background for URL
        if (result.useImage == true) {try{document.getElementById('AeriesFullPageContent').style = `background-image: url(${result.imgLink2})`}catch{}} 
        //set background color for non-image bg
        if (result.useImage == false) {
            try{document.getElementById('AeriesFullPageContent').style = `background: ${result.bgColor} !important`}catch{}}
        try{document.getElementById('AeriesTextLogo').style = `background-color: ${result.sColor2} !important;`}catch{}
        try{document.getElementById('AeriesFullPageNav').style = `background: radial-gradient(58.5rem at 50% 5rem, ${result.sColor1}, ${result.sColor2}) !important;`}catch{}
        if (result.remove == true) {try{document.getElementById('district').style = 'text-align: center; margin-bottom: 0; visibility: hidden;'}catch{}}
        //Override fixed button position from css if option is off
        if (result.floatBtn == false) {try{document.getElementById('AeriesFullPageNavItems').style = `position: relative !important;`}catch{}}
        //set background color for login page
        try{document.getElementsByClassName('k-webkit k-webkit91 js no-touch svg inlinesvg svgclippaths no-ie8compat')[0].style = `background: lightblue !important;`
            document.getElementsByClassName('k-webkit k-webkit91 js no-touch svg inlinesvg svgclippaths no-ie8compat')[0].style = `background: ${result.background} !important;`}catch{}
        //sequence to automatically log you in should the option be enabled
        if (result.automaticallyLogin == true) {
            try{
                document.getElementById("portalAccountUsername").value = result.loginOAuth
                document.getElementById("next").click()
                document.getElementById("LoginButton").click()
        }catch{}}
    });
}
runChanges()
try{document.getElementById("aspnetForm").style = `height: ${window.screen.availHeight}px !important;`}catch{}
try{
var calendarTable = document.getElementById('ctl00_MainContent_ctl08_rptCalendarDay_ctl00_trFooterNoRecords').children
if(calendarTable[0].textContent = "You have no events for this date") {
    calendarTable[0].style = 'padding: 0; margin: 0; background-color: transparent; border-bottom-width: 0;'
}
}catch{}



//little bit of attribution on the login page
//easy access comments below should you want to remove it (note that this does not mean that you in any way own the code, only use it to clean it up)👇
/**/
var attribution = document.createElement("p");
attribution.textContent = "Simplify Aeries by Sander Vonk";
attribution.style = "position: absolute; top: 5px; left: 35px; color: #287e98;"
try {document.getElementsByClassName("language-wrapper")[0].append(attribution)}catch{}
//auto click the second 'Login With Google' button as needed
try {document.getElementById('next').addEventListener('click', time_fix);}catch{}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message && request.message == "reload") {
        runChanges()
        sendResponse("reloaded");
        }
    }
);
