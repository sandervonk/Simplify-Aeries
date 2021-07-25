//function to click the login with google button when it is loaded
var jsonOrg = `{
    "colors": {
      "A+": "#00B200",
      "A": "#17A801",
      "A-": "#2E9E02",
      "B": "#469403",
      "B-": "#5D8A04",
      "C+": "#748005",
      "C": "#8B7505",
      "C-": "#A26B06",
      "D+": "#B96107",
      "D": "#D15708",
      "D-": "#E84D09",
      "F": "#FF430A"
    }
  }`
var linkToDash = ""
var linkToClasses = ""
function getDashLink() {
    if (window.location.href.includes("aeries.net/student/")) {
        splitLink = window.location.href.split('/')
        linkToDash = "https://" + splitLink[2] + "/" + splitLink[3] + "/Dashboard.aspx"
        linkToClasses = "https://" + splitLink[2] + "/" + splitLink[3] + "/Classes.aspx"
        console.log(`created link: ${linkToDash}`)
        console.log(`created link: ${linkToClasses}`)
        chrome.storage.sync.set({ "dashLink": linkToDash, "classLink": linkToClasses }, function () {
            console.log("value saved")
        });
        chrome.storage.sync.get(["dashLink", "classLink"], function (result2) {
            console.log(result2)
            console.log(`SAVED LINK: ${result2.dashLink}`)
            console.log(`SAVED LINK: ${result2.classLink}`)
        });
    }

    //  return linkToDash
}
getDashLink()



function scrapeClasses() {
    var classes = []
    var gradeElements = document.getElementsByClassName("Card CardWithPeriod")
    for (var gradeElement of gradeElements) {
        var classData = {}
        classData.period = gradeElement.children[0].textContent
        classData.name = gradeElement.children[2].textContent
        classData.grade = gradeElement.children[1].children[1].textContent.replace(/\s+/g, '').substring(0, gradeElement.children[1].children[1].textContent.replace(/\s+/g, '').indexOf('('))
        if (classData.grade == '') {
            if (!gradeElement.children[1].children[1].textContent.replace(/\s+/g, '').includes("(")) {
                classData.grade = gradeElement.children[1].children[1].textContent.replace(/\s+/g, '')
            }
            /*else if(classData.grade.charAt(0) != "("){
                classData.grade = gradeElement.children[1].children[1].textContent.replace(/\s+/g, '').substring(0,2)
            }*/
        }
        try {
            classData.percent = gradeElement.children[1].children[1].children[0].textContent.substr(1, 5)
            if (classData.percent == "0.0%)") { classData.percent = "00.0%" }
        } catch { classData.percent = "N/A" }
        classes.push(classData)
    }
    console.log(`Classes var type: ${typeof (classes)}`)
    console.log(`ClassData var type: ${typeof (classData)}`)
    console.log("Classes From Scrape:")
    console.log(classes)
    return classes;
}
function interColor(factor) {
    factor = 1 - factor
    color1 = [0, 178, 0]
    color2 = [255, 67, 10]
    var result = color1.slice();
    for (var i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return (`rgb(${result[0]}, ${result[1]}, ${result[2]})`);
};
function pad2(number) {
    return (number < 10 ? '0' : '') + number
}
console.log("INTERCOLOR TEST:")
console.log(interColor(.5))
function getGradeLineElements() {
    var gradeCells = []
    try {
        var lines = parseInt(document.querySelector("#ctl00_MainContent_subGBS_tblEverything > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-last-child(3)").id.substr(40, 2))
        for (lineNum = 1; lineNum < lines + 1; lineNum++) {
            gradeCells.push(document.getElementById(`ctl00_MainContent_subGBS_DataDetails_ctl${pad2(lineNum)}_trGBKItem`).children[8])
            document.getElementById(`ctl00_MainContent_subGBS_DataDetails_ctl${pad2(lineNum)}_trGBKItem`).children[8].style = "font-weight: bold;"
            document.getElementById(`ctl00_MainContent_subGBS_DataDetails_ctl${pad2(lineNum)}_trGBKItem`).children[6].style = "font-weight: bold; font-style: italic;"
        }
    } catch { }
    return gradeCells
}


json = JSON.parse(jsonOrg);
function replaceGradeColors(jsonSent) {
    json = JSON.parse(jsonOrg);
    var gradesList = [document.getElementsByClassName('Grade'), getGradeLineElements()]
    for (grades of gradesList) {
        var message = []
        for (var grade of grades) {
            var ConsoleLog = []
            ConsoleLog.push(["Grade Element: ", grade])
            gradeStr = grade.textContent
            gradeStr = gradeStr.replace(/\s+/g, '');
            ConsoleLog.push(`Grade Text (no space): ${gradeStr}`)
            gradeValue = gradeStr.substring(0, gradeStr.indexOf('('));
            if (gradeValue == "") { gradeValue = gradeStr; }
            ConsoleLog.push(`Grade Value: ${gradeValue}`)
            gradeColor = json.colors[gradeValue]
            ConsoleLog.push(`Grade Color: ${gradeColor}`)
            grade.style.color = gradeColor
            message.push(ConsoleLog)
        }
        console.log("Grade Elements: ")
        console.log(grades)
        console.log("Grade Color Application Log: ")
        console.log(message)
        message = []
    }
}
function setAssignmentColors() {
    var scoreElements = document.getElementsByClassName('FullWidth ScoreCard')
    for (scoreElement of scoreElements) {
        if (scoreElement.children[0].textContent != "NA") {
            var score = parseInt(scoreElement.children[0].textContent) / parseInt(scoreElement.children[2].textContent)
            if (!isFinite(score)) { score = 1 }
            scoreElement.style.color = interColor(score)
        } else { scoreElement.style.color = "#005f5f" }
    }
}
setAssignmentColors()
function setAssignmentColorsTimed() { setTimeout(setAssignmentColors, 1000) }
setTimeout(replaceGradeColors, 2000)
function fix_button() { document.getElementsByClassName("btn btn-login Google")[0].style = 'background-size: contain !important;' }
//email checking function similar to the one used by the options page
function emailCheck(email) {
    var re = /\b[a-z0-9-_.]+@[a-z0-9-_.]+(\.[a-z0-9]+)+/i
    return (re.test(email))
}
//see fix_button, this just waits for it, a way around the rules on what you can use with .addEventListener

var resultGlobal = ""
function time_fix() { try { setTimeout(fix_button, 100) } catch { } }
function add_height() {
    try {
        var currentStyle = `background: radial-gradient(58.5rem at 50% 5rem, ${resultGlobal.sColor1}, ${resultGlobal.sColor2}) !important;`
        document.getElementById('AeriesFullPageNav').style = currentStyle + ` height: ${document.getElementById("AeriesFullPageContent").offsetHeight}px !important;`
    } catch { }
}
//Grab our saved options from chrome's storage and open them as the input 'result' to a function
//Prepare for try{}catch{} abuse... yeah there's probably a much better way of doing this
function runChanges() {
    chrome.storage.sync.get(['useImage', 'imgLink2', 'bgColor', 'sColor1', 'sColor2', 'remove', 'floatBtn', 'background', 'automaticallyLogin', 'loginOAuth', 'enabled', 'jsonOrg'], function (result) {
        //set background for URL
        resultGlobal = result
        console.log("result:")
        console.log(result)
        if (!result.enabled) {
            result = {
                bgColor: "lightblue",
                useImage: false,
                imgLink2: "https://lh3.googleusercontent.com/-24SGkkk23w4/YL6HMZfiIYI/AAAAAAAAygY/43yk0zyDv_MfZXK2ZjxuvBM4Jgieik--wCJEEGAsYHg/s0/2021-06-07.png",
                sColor1: "#2e8eab",
                sColor2: "#113e75",
                remove: true,
                floatBtn: true,
                background: "lightblue",
                automaticallyLogin: false,
                loginOAuth: ""
            }
        }
        if (result.useImage == true) { try { document.getElementById('AeriesFullPageContent').style = `background-image: url(${result.imgLink2})` } catch { } }
        //set background color for non-image bg
        if (result.useImage == false) {
            try { document.getElementById('AeriesFullPageContent').style = `background: ${result.bgColor} !important` } catch { }
        }
        try { document.getElementById('AeriesTextLogo').style = `background-color: ${result.sColor2} !important;` } catch { }
        try { document.getElementById('AeriesFullPageNav').style = `background: radial-gradient(58.5rem at 50% 5rem, ${result.sColor1}, ${result.sColor2}) !important;` } catch { }
        //setTimeout(document.getElementById('AeriesFullPageNav').style = `background: radial-gradient(58.5rem at 50% 5rem, ${result.sColor1}, ${result.sColor2}) !important; height: ${document.getElementById("AeriesFullPageContent").offsetHeight}px !important;`}catch{},)
        if (result.remove == true) { try { document.getElementById('district').style = 'text-align: center; margin-bottom: 0; visibility: hidden;' } catch { } }
        //Override fixed button position from css if option is off
        if (result.floatBtn == false) { try { document.getElementById('AeriesFullPageNavItems').style = `position: relative !important;` } catch { } }
        //set background color for login page
        try {
            document.getElementsByClassName('k-webkit k-webkit91 js no-touch svg inlinesvg svgclippaths no-ie8compat')[0].style = `background: lightblue !important;`
            document.getElementsByClassName('k-webkit k-webkit91 js no-touch svg inlinesvg svgclippaths no-ie8compat')[0].style = `background: ${result.background} !important;`
        } catch { }
        //sequence to automatically log you in should the option be enabled
        if (result.automaticallyLogin == true) {
            try {
                document.getElementById("portalAccountUsername").value = result.loginOAuth
                document.getElementById("next").click()
                document.getElementById("LoginButton").click()
            } catch { }
        }
    });
}
runChanges()
try { document.getElementById("aspnetForm").style = `height: ${window.screen.availHeight}px !important;` } catch { }
try {
    var calendarTable = document.getElementById('ctl00_MainContent_ctl08_rptCalendarDay_ctl00_trFooterNoRecords').children
    if (calendarTable[0].textContent = "You have no events for this date") {
        calendarTable[0].style = 'padding: 0; margin: 0; background-color: transparent; border-bottom-width: 0;'
    }
} catch { }
try { document.querySelector("#ctl00_MainContent_subGRD_tblEverything > tbody > tr > td > div.Max1200.FullWidth > table:nth-child(3)").cellPadding = "20px" } catch { }



//little bit of attribution on the login page
//easy access comments below should you want to remove it (note that this does not mean that you in any way own the code, only use it to clean it up)👇
/**/
var attribution = document.createElement("p");
attribution.textContent = "Simplify Aeries by Sander Vonk";
attribution.style = "position: absolute; top: 5px; left: 35px; color: #287e98;"
try { document.getElementsByClassName("language-wrapper")[0].append(attribution) } catch { }
//auto click the second 'Login With Google' button as needed
try { document.getElementById('next').addEventListener('click', time_fix); } catch { }
window.addEventListener('scroll', (event) => {
    add_height()
    replaceGradeColors()
    setAssignmentColors()
});
try { document.getElementById('ctl00_MainContent_subGBS_dlGN').onchange = setAssignmentColorsTimed } catch { }
//document.getElementsByTagName('html')[0].onscroll = add_height
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message && request.message == "reload") {
            runChanges()
            //        add_height()
            sendResponse("reloaded");
        } else if (request.message && request.message == "scrape") {
            var fromScrape = ""
            fromScrape = scrapeClasses()
            sendResponse(fromScrape)
        }
    }
);
function changeDisplay() {
    elementStyle = document.querySelector('#divClass > div.widget-body.classesSection').style
    if (document.querySelector('#divClass > div.widget-body.classesSection').style.display == "block") { document.querySelector('#divClass > div.widget-body.classesSection').style.display = ""; console.log("DOMAttrModified Changed") }
}
function changeDisplayTimed() {
    setTimeout(changeDisplay, 200)
}
try { document.querySelector('#divClass > div.CatHeader.widget-head > div.widget-options.pull-right > span').addEventListener('click', changeDisplayTimed) } catch { }

