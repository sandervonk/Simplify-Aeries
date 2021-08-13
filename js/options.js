// Saves options to chrome.storage
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
var classinfo_global = {}
var runTimedOverviews = true
var runCallouts = true
chrome.storage.sync.get({ "doTutorial": true }, function (result5) {
  console.log(`do tutorial?: ${result5.doTutorial}`)
  runCallouts = result5.doTutorial

  if (runCallouts) {
    setTimeout(runTutCallouts, 200)
  }
});
function runTutorial(x, y, calloutContent, highlight) {
  var overlay = `<div class="tutorialOverlay" style=width:380%;height:599px;background:#add8e6;z-index:10000;position:absolute;left:0;top:0;opacity:.8></div>`

  var highlightX = x + 148
  var highlightY = y - 42
  if (document.getElementsByClassName('tutorialCallout').length == 0) {
    document.body.innerHTML += `<div class="tutorialCallout" style="top:0; left:0; border-top-right-radius:0px; display: none;"><a style="z-index: 10005 !important;">${calloutContent}</a></div>`
    document.body.innerHTML += `<div class="tutorialCalloutPrevious" style="top: 0px;left: 0px;">&#x2190</div>`
    document.getElementsByClassName('tutorialCallout')[0].onclick = runTutCallouts
  } else {
    document.getElementsByClassName('tutorialCallout')[0].parentElement.removeChild(document.getElementsByClassName('tutorialCallout')[0])
    document.getElementsByClassName('tutorialCalloutPrevious')[0].parentElement.removeChild(document.getElementsByClassName('tutorialCalloutPrevious')[0])
    document.body.innerHTML += `<div class="tutorialCallout" style="top:0; left:0; border-top-right-radius:0px; display: none;"><a style="z-index: 10005 !important;">${calloutContent}</a></div>`
    document.body.innerHTML += `<div class="tutorialCalloutPrevious" style="top: 0px;left: 0px;">&#x2190</div>`
    document.getElementsByClassName('tutorialCallout')[0].onclick = runTutCallouts
  }

  if (highlight) {
    var highlightElement = `<div class="tutorialCalloutHighlight" style="top: 0px;left: 0px; display: none;"></div>`
    if (document.getElementsByClassName('tutorialCalloutHighlight').length == 0) {
      document.body.innerHTML += highlightElement
    }

  }
  var highlight = `<div class="tutorialOverlay" style=width:380%;height:599px;background:#add8e6;z-index:10000;position:absolute;left:0;top:0;opacity:.8></div>`
  if (document.getElementsByClassName('tutorialOverlay').length == 0) {
    document.body.innerHTML += overlay
  }
  //show and position the callout
  var callout = document.getElementsByClassName('tutorialCallout')[0]
  var calloutHighlight = document.getElementsByClassName('tutorialCalloutHighlight')[0]
  var calloutPrevious = document.getElementsByClassName('tutorialCalloutPrevious')[0]
  callout.style.display = "unset"
  callout.style.left = `${x - document.getElementsByClassName('tutorialCallout')[0].offsetWidth}px`
  callout.style.top = `${y}px`
  calloutHighlight.style.display = "unset"
  calloutHighlight.style.left = `${highlightX - document.getElementsByClassName('tutorialCallout')[0].offsetWidth}px`
  calloutHighlight.style.top = `${highlightY}px`
  calloutPrevious.style.left = `${x - document.getElementsByClassName('tutorialCallout')[0].offsetWidth}px`
  calloutPrevious.style.top = `${y}px`
  document.getElementsByClassName('tutorialCallout')[0].onclick = runTutCallouts
  document.getElementsByClassName('tutorialCalloutPrevious')[0].onclick = previousCallout
}

var iterations = 0
var callouts = []
callouts[0] = [219 + 42, 41, "This is the schedule button, use it to quickly check your schedule, including room numbers, teachers('emails), class names, and period numbers. Click to continue"]
callouts[1] = [259 + 42, 41, "This is the grades button, use it to quickly check your grades. To make sure it works, please open your school's aeries.net site <br> &nbsp&nbsp&nbsp&nbsp manually before using"]
callouts[2] = [299 + 42, 41, "This is the reset button, use it to soft-reset your customization settings, but be sure to click save to keep the reset options."]
callouts[3] = [339 + 42, 41, "This is the logo of the extention, which also serves as a link to a quick feedback / bug reports survey. Clicking it will also rerun the &nbsp&nbsp&nbsp&nbsp tutorial."]
function runTutCallouts() {
  if (iterations <= callouts.length - 1) {
    callout = callouts[iterations]
    runTutorial(callout[0], callout[1], callout[2], true)
    pushToFront()
    iterations++
    console.log("ran callout change??")
  } else {
    document.getElementsByClassName('tutorialCalloutPrevious')[0].parentElement.removeChild(document.getElementsByClassName('tutorialCalloutPrevious')[0])
    document.getElementsByClassName('tutorialCallout')[0].parentElement.removeChild(document.getElementsByClassName('tutorialCallout')[0])
    document.getElementsByClassName('tutorialOverlay')[0].parentElement.removeChild(document.getElementsByClassName('tutorialOverlay')[0])
    document.getElementsByClassName('tutorialCalloutHighlight')[0].parentElement.removeChild(document.getElementsByClassName('tutorialCalloutHighlight')[0])
    chrome.storage.sync.set({ "doTutorial": false }, function () {
      console.log(`ran tutorial and set var to done`)
      backToSettings()
      restore_options()
    });
  }

}
function pushToFront() {
  var frontElements = [document.getElementById('scheduleButton'), document.getElementById('gradesButton'), document.getElementById('refreshButton'), document.getElementById('logo')]
  console.log(`pushing to front:`)
  console.log(frontElements[iterations])
  frontElements[iterations].classList.add("overOverlay")
  frontElements[iterations].style["z-index"] = 10003
  frontElements[iterations].style.setProperty("z-index", "10003")
}


function previousCallout() {
  iterations -= 2
  if (iterations <= 0) { iterations = 0 }
  runTutCallouts()
  console.log("ran previous callout?")
}





var linkToDash = ""
var linkToClasses = ""
function getDashLink() {
  chrome.tabs.query({ url: "*://*.aeries.net/student/*" }, function (tabs) {
    if (tabs.length != 0) {
      for (var tab of tabs) {
        splitLink = tab.url.split('/')
        linkToDash = "https://" + splitLink[2] + "/" + splitLink[3] + "/Dashboard.aspx"
        linkToClasses = "https://" + splitLink[2] + "/" + splitLink[3] + "/Classes.aspx"
        console.log(`created link: ${linkToDash}`)
        console.log(`created link: ${linkToClasses}`)
      }
      chrome.storage.sync.set({ "dashLink": linkToDash, "classLink": linkToClasses }, function () {
        console.log("value saved")
      });
      chrome.storage.sync.get(["dashLink", "classLink"], function (result2) {
        console.log(result2)
        console.log(`SAVED LINK: ${result2.dashLink}`)
        console.log(`SAVED LINK: ${result2.classLink}`)
      });
    }
  });

  //  return linkToDash
}
getDashLink()


function correctColor(strColor) {
  var s = new Option().style;
  s.color = strColor;
  if ((s.color != strColor) && !(s.color.includes("rgb("))) {
    return "white"
  } else {
    return strColor
  }
}
var classJSON = {}
function open_feedback() {
  window.open('https://docs.google.com/forms/d/e/1FAIpQLScRFkl3fTB_d0nBePbrHBS7gjHXBgfGjcxeALL8QMX3JEaiRQ/viewform?usp=sf_link', '_blank');
  window.open('./html/Info.html', '_blank');
  //also serves as a button to re-run tutorial
  chrome.storage.sync.set({ "doTutorial": true }, function () {
    console.log(`ran tutorial and set var to done`)
  });
}
function getColor(letterGrade) {
  json = JSON.parse(jsonOrg);
  return json.colors[letterGrade]
}

function createOverview(classes) {
  classElements = "<img id=backButton src=../icon/3DLogo.png style=position:absolute;top:5px;right:5px;height:30px>"
  for (var thisclass of classes) {
    console.log(thisclass)
    var classElement = `<div class=elementGroup style=""><div class="gradeSection classLeft" style="color: ${getColor(thisclass.grade)};">${thisclass.grade}</div><div class="gradeSection classMiddle">${thisclass.name}</div><div class="gradeSection classRight">${thisclass.percent}</div></div>`
    console.log("class element created:")
    console.log(classElement)
    classElements = classElements.concat(classElement)
  }
  classElements = classElements.concat(`<div class="top-rounded">Quick Check Grades</div>`)
  console.log(`allElements: ${classElements}`)
  //applying
  document.getElementsByTagName('body')[0].style = "margin-bottom: 25px !important;font-family:montserrat,sans-serif;width:380px;margin:0;margin-top:60px"
  document.getElementsByTagName('body')[0].innerHTML = classElements
}



function save_options() {
  var isEnabled = document.getElementById('toggleExtention').checked;
  var color = correctColor(document.getElementById('solidColor').value);
  var useURL = document.getElementById('useURL').checked;
  var hide = document.getElementById('district').checked;
  var imgUrl = document.getElementById('imgLink').value;
  var sidebar1 = correctColor(document.getElementById('sidebar1').value);
  var sidebar2 = correctColor(document.getElementById('sidebar2').value);
  var textColor = correctColor(document.getElementById('loginColor').value);
  var navFloat = document.getElementById('navFloat').checked;
  var login = document.getElementById('autoLog').checked;
  var loginMail = document.getElementById('loginEmail').value;
  document.getElementById('imgPreview').src = imgUrl;
  chrome.storage.sync.set({
    enabled: isEnabled,
    bgColor: color,
    useImage: useURL,
    imgLink2: imgUrl,
    sColor1: sidebar1,
    sColor2: sidebar2,
    remove: hide,
    floatBtn: navFloat,
    background: textColor,
    automaticallyLogin: login,
    loginOAuth: loginMail,
    dashLink: linkToDash,
    classLink: linkToClasses,
    doTutorial: runCallouts,
  }, function () {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    status.style = 'border-color: black; background-color: white;';
    setTimeout(function () {
      status.textContent = '';
      status.style = 'border-color: transparent; background-color: transparent;';
    }, 750);
  });
  try {
    chrome.tabs.query({ url: "*://*.aeries.net/*" }, function (tabs) {
      console.log("tabs:")
      console.log(tabs)
      for (var tab of tabs) {
        try {
          chrome.tabs.sendMessage(tab.id, { message: "reload" }, function (response) {
            console.log("response:")
            console.log(response);
          });
        } catch { }
      }
    });
  } catch { }

}
function update_login() {
  console.log("running update_login")
  document.getElementById("autoLog").click(function () {
    if (document.getElementById("autoLog").checked == true) {
      document.getElementById("logOptions").style.display = "block !important";
    } else {
      document.getElementById("logOptions").style.display = "none !important";
    }
  });
}

function update_colors() {
  var sidebar1 = correctColor(document.getElementById('sidebar1').value);
  var sidebar2 = correctColor(document.getElementById('sidebar2').value);
  document.getElementById('sidebar').style = `background: linear-gradient(0.25turn, ${sidebar1}, ${sidebar2});`
  document.getElementById('leftSidebar').style = `background: ${sidebar1};`
  document.getElementById('rightSidebar').style = `background: ${sidebar2};`
  document.getElementById('loginColorPreview').style = `background: ${correctColor(document.getElementById('loginColor').value)} !important;`
  document.getElementById('bgPreview').style = `background: ${correctColor(document.getElementById('solidColor').value)} !important;`
  console.log("ran changes")
  console.log(`background: ${correctColor(document.getElementById('loginColor').value)} !important;`)
}
// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  //set defaults and grab data
  chrome.storage.sync.get({
    enabled: true,
    bgColor: "lightblue",
    useImage: false,
    imgLink2: "https://lh3.googleusercontent.com/-24SGkkk23w4/YL6HMZfiIYI/AAAAAAAAygY/43yk0zyDv_MfZXK2ZjxuvBM4Jgieik--wCJEEGAsYHg/s0/2021-06-07.png",
    sColor1: "#2e8eab",
    sColor2: "#113e75",
    remove: true,
    floatBtn: true,
    background: "lightblue",
    automaticallyLogin: false,
    loginOAuth: "",
    dashLink: "#",
    doTutorial: true,
  }, function (items) {
    document.getElementById('toggleExtention').checked = items.enabled;
    document.getElementById('solidColor').value = items.bgColor;
    document.getElementById('useURL').checked = items.useImage;
    document.getElementById('autoLog').checked = items.automaticallyLogin;
    document.getElementById('imgLink').value = items.imgLink2;
    document.getElementById('imgPreview').src = items.imgLink2;
    document.getElementById('sidebar1').value = items.sColor1;
    document.getElementById('sidebar2').value = items.sColor2;
    document.getElementById('leftSidebar').style = `background: ${items.sColor1};`
    document.getElementById('rightSidebar').style = `background: ${items.sColor2};`
    document.getElementById('district').checked = items.remove;
    document.getElementById('sidebar').style = `background: linear-gradient(0.25turn, ${items.sColor1}, ${items.sColor2});`;
    document.getElementById('navFloat').checked = items.floatBtn;
    document.getElementById('loginColor').value = items.background;
    document.getElementById('loginColorPreview').style = `background: ${items.background} !important;`
    document.getElementById('bgPreview').style = `background: ${items.bgColor} !important;`
    document.getElementById('autoLog').checked = items.automaticallyLogin;
    document.getElementById('loginEmail').value = items.loginOAuth;
    emailInputCheck()
  });
}
function emailInputCheck() {
  var re = /\b[a-z0-9-_.]+@[a-z0-9-_.]+(\.[a-z0-9]+)+/i
  if (re.test(document.getElementById('loginEmail').value) == true) {
    document.getElementById('loginEmailCheck').style = "background: lightgreen !important;";
  }
  if (re.test(document.getElementById('loginEmail').value) == false) {
    document.getElementById('loginEmailCheck').style = "background: pink !important;";
  }
}
function resetSettings() {
  document.getElementById('toggleExtention').checked = true;
  document.getElementById('solidColor').value = "lightblue";
  document.getElementById('useURL').checked = false;
  document.getElementById('autoLog').checked = false;
  document.getElementById('imgLink').value = "https://lh3.googleusercontent.com/-24SGkkk23w4/YL6HMZfiIYI/AAAAAAAAygY/43yk0zyDv_MfZXK2ZjxuvBM4Jgieik--wCJEEGAsYHg/s0/2021-06-07.png";
  document.getElementById('imgPreview').src = "https://lh3.googleusercontent.com/-24SGkkk23w4/YL6HMZfiIYI/AAAAAAAAygY/43yk0zyDv_MfZXK2ZjxuvBM4Jgieik--wCJEEGAsYHg/s0/2021-06-07.png";
  document.getElementById('sidebar1').value = "#2e8eab";
  document.getElementById('sidebar2').value = "#113e75";
  document.getElementById('leftSidebar').style = `background: ${"#2e8eab"};`
  document.getElementById('rightSidebar').style = `background: ${"#113e75"};`
  document.getElementById('district').checked = true;
  document.getElementById('sidebar').style = `background: linear-gradient(0.25turn, ${"#2e8eab"}, ${"#113e75"});`;
  document.getElementById('navFloat').checked = true;
  document.getElementById('loginColor').value = "lightblue";
  document.getElementById('loginColorPreview').style = `background: ${"lightblue"} !important;`
  document.getElementById('bgPreview').style = `background: ${"lightblue"} !important;`
  document.getElementById('autoLog').checked = false;
  document.getElementById('loginEmail').value = "";
}
function update_preview() {
  document.getElementById('imgPreview').src = document.getElementById('imgLink').value;
}
function classOverviewTimed() {
  setTimeout(classesOverview, 4000)
}
function scheduleOverviewTimed() {
  setTimeout(scheduleOverview, 4000)
}
function classesOverview() {

  //    try{
  chrome.tabs.query({ url: "*://*.aeries.net/student/Dashboard*" }, function (tabs) {
    console.log("tabs:")
    console.log(tabs)
    if (tabs.length != 0) {
      for (var tab of tabs) {
        var response = []
        chrome.tabs.sendMessage(tab.id, { message: "scrape" }, function (response) {
          console.log("scrape response:")
          console.log(response);
          classJSON = response
          createOverview(classJSON)
          document.getElementById('backButton').onclick = backToSettings;
        });
      }
    } else {
      document.getElementsByTagName('body')[0].style = "font-weight: bold;margin-top: 45px;"
      document.getElementsByTagName('body')[0].innerHTML = `<div class="top-rounded">Quick Check Grades</div>Sorry, you need a Aeries /Dashboard.aspx tab open to use this feature :(. Please <a href = ${linkToDash} target = "_blank">open it</a> and try again, or wait for it to open automatically, in which case this page will refresh soon.<br>If the page that is opened is not a dashboard page, or does not open at all, try opening the dashboard manually then reopening this menu, which will save the link<br><br><a style="color: #7C0A02;">IF TABS KEEP OPENING, MAKE SURE AUTO-LOGIN IS ON!</a>`
      document.body.innerHTML += `<img id=backButton src=../icon/3DLogo.png>`
      document.getElementById('backButton').onclick = backToSettings;
      chrome.storage.sync.get("dashLink", function (result2) {
        console.log(`link: ${result2.dashLink}`)
        if ((result2.dashLink != "#") && (result2.dashLink != "") && (result2.dashLink != undefined)) {
          chrome.tabs.create({ url: result2.dashLink, active: false });
          classOverviewTimed()
          console.log(`dashlink: ${result2.dashLink}`)
        }
      });

    }
  });
  //      }catch{}
}
function resetBlocker() {
  backToSettings = true
}
function backToSettings() {
  var originalBody = `<img src="../icon/3DLogo.png" class="pointer" id="logo" style="position:absolute;top:5px;right:5px;height:30px;opacity:.8;border-color:#008b8b;border-style:solid;border-radius:10px"> <img src="../icon/icon_grades.png" class="pointer" id="gradesButton" style="position:absolute;top:5px;right:85px;height:30px;opacity:.8;border-color:#008b8b;border-style:solid;border-radius:10px"> <img src="../icon/icon_calendar.png" class="pointer" id="scheduleButton" style="position:absolute;top:5px;right:125px;height:30px;opacity:.8;border-color:#008b8b;border-style:solid;border-radius:10px"><p class="pointer" style="position:absolute;top:5px;right:45px;height:30px;opacity:.8;border-color:#008b8b;border-style:solid;border-radius:10px;background-color:#fff;font-weight:bolder;font-size:20pt;width:30px;text-align:center;line-height:26px;margin:0" id="refreshButton">&#x21BB;</p><label><input type="checkbox" id="toggleExtention" style="text-align:center;margin-left:0"> Use Customizations? v0.8.8</label><p class="section-header">Login Page Settings</p><div class="bundled-settings"><label><input type="checkbox" id="district" style="margin-left:15%"> Hide District Name on Login Page?</label><div class="bundled-settings" id="logOptions" style="border-top-left-radius:0;border-top-right-radius:0;border-color:transparent"><p id="loginColorPreview" class="colorPreview" style="background:grey"></p><input id="loginColor" class="colorInput" placeholder="Login Color" type="”text”"></div><label><input type="checkbox" id="autoLog" style="margin-left:15%"> Automatically Log In? (Google/OAuth)</label><div class="bundled-settings" id="logOptions" style="border-top-left-radius:0;border-top-right-radius:0;border-color:transparent"><p id="loginEmailCheck" class="colorPreview" style="background:grey"></p><input id="loginEmail" class="colorInput" placeholder="Your Email (Optional and Stored on YOUR device)" style="width:83%!important;font-size:12px;text-align:left;padding-left:5%" type="”text”"></div></div><p class="section-header">Sidebar Options:</p><div class="bundled-settings sidebar" id="sidebar-group"><div class="bundled-settings sidebar" id="sidebar"><p id="leftSidebar" class="sidebar-color">1</p><input id="sidebar1" class="sidebarSettings" placeholder="First Sidebar Color" type="”text”"><p id="rightSidebar" class="sidebar-color">2</p><input id="sidebar2" class="sidebarSettings" placeholder="Second Sidebar Color" type="”text”"></div><div class="bundled-settings" id="sidebar-nav" style="margin-top:5px"><label><input type="checkbox" id="navFloat" style="text-align:center;margin-left:15%"> Make Nav Buttons Float on Scroll?</label></div></div><p class="section-header">Background:</p><div class="bundled-settings" style="padding-bottom:2px"><p id="bgPreview" class="colorPreview" style="background:grey">1</p><input id="solidColor" class="colorInput" placeholder="green, #d8d8d8, etc." type="”text”"><br><label><input type="checkbox" id="useURL" style="margin-left:15%"> Use Background Image? (URL)</label><br><input id="imgLink" placeholder="Your Image URL" type="”link”" style="width:97.8%"><br><img id="imgPreview" class="preview" src="http://via.placeholder.com/350x150" style="padding:0;margin:0;width:100%;height:142px;text-align:center"></div><div id="status" style="border-color:transparent;background-color:transparent"></div><button id="save">Save</button>`
  document.body.innerHTML = originalBody
  document.body.style = ""
  setTimeout(setVersion, 100)
  backToSettings = false
  restore_options()
  registerActions()
  update_colors()
  setTimeout(resetBlocker, 5000)
}
function shareInterface() {
  chrome.tabs.query({ url: "*://*.aeries.net/student/Classes*" }, function (tabs) {
    for (tab of tabs) {
      chrome.tabs.sendMessage(tab.id, { message: "share schedule" }, function (response) {
        console.log(response)
        chrome.tabs.create({
          url: "html/share.html",
          active: false
        })
        classinfo_global = response
        setTimeout(function () {
          chrome.tabs.query({ title: "Simplify Aeries Share Schedule" }, function (tabs) {
            for (tab of tabs) {
              chrome.tabs.sendMessage(tab.id, { message: classinfo_global }, function (response) {
                console.log(response)
              })
            }
          })
        }, 200)

      })
    }
  })
}
function scheduleOverview() {
  if (runTimedOverviews) {

    chrome.tabs.query({ url: "*://*.aeries.net/student/Classes*" }, function (tabs) {

      if (tabs.length != 0) {
        for (var tab of tabs) {
          var response = ""
          chrome.tabs.sendMessage(tab.id, { message: "scrape schedule" }, function (response) {
            console.log("scrape schedule response:")
            console.log(response);
            if (response.length != 0) {
              scheduleBodyHTML = response
              document.body.innerHTML = scheduleBodyHTML
              setTimeout(function () {
                document.getElementById('shareButton').addEventListener("click", function () {
                  shareInterface();
                })
              }, 200)
              document.body.style = "font-weight: bold; margin-top: 55px;"
            }
            if ((response == undefined) || (response.length <= 0)) {
              document.getElementsByTagName('body')[0].innerHTML = `<div class="top-rounded2">Classes Schedule</div>Sorry, you need a Aeries /Classes.aspx tab open to use this feature :(. Please <a href = ${linkToClasses} target = "_blank">open it</a> and try again, or wait for it to open automatically, in which case this page will refresh soon.<br>If the page that is opened is not a Class Schedule page, or does not open at all, try opening the -Classes- page by hand then reopening this menu, which will save the link<br><br><a style="color: #7C0A02;">IF TABS KEEP OPENING, MAKE SURE AUTO-LOGIN IS ON!</a>`
              document.getElementsByTagName('body')[0].style = "font-weight: bold; margin-top: 55px;"
              scheduleOverviewTimed()
            }
            document.getElementById('backButton').onclick = backToSettings;
          });
        }
      } else {
        document.getElementsByTagName('body')[0].innerHTML = `<div class="top-rounded2">Classes Schedule</div>Sorry, you need a Aeries /Classes.aspx tab open to use this feature :(. Please <a href = ${linkToClasses} target = "_blank">open it</a> and try again, or wait for it to open automatically, in which case this page will refresh soon.<br>If the page that is opened is not a Class Schedule page, or does not open at all, try opening the -Classes- page by hand then reopening this menu, which will save the link<br><br><a style="color: #7C0A02;">IF TABS KEEP OPENING, MAKE SURE AUTO-LOGIN IS ON!</a>`
        document.getElementsByTagName('body')[0].style = "font-weight: bold; margin-top: 55px;"
        document.body.innerHTML += `<img id=backButton src=../icon/3DLogo.png>`
        document.getElementById('backButton').onclick = backToSettings;
        chrome.storage.sync.get("classLink", function (result3) {
          console.log(`link: ${result3.classLink}`)
          if ((result3.classLink != "#") && (result3.classLink != "") && (result3.classLink != undefined)) {

            chrome.tabs.create({ url: result3.classLink, active: false });
            scheduleOverviewTimed()
            console.log(`classLink: ${result3.classLink}`)
          }
        });

      }
    });
  }
}
function setVersion() {
  var manifestData = chrome.runtime.getManifest();
  console.log(manifestData.version);
  //document.getElementById('toggleExtention').parentElement.textContent = document.getElementById('toggleExtention').parentElement.textContent.replace("0.0.0", manifestData.version)
  document.getElementById('toggleExtention').parentElement.innerHTML = `<label><input type="checkbox" id="toggleExtention" style="text-align: center; margin-left: 0%">Use Customizations? v${manifestData.version}</label>`
  restore_options()
  registerActions()
}

setTimeout(setVersion, 200)




function registerActions() {
  document.getElementById('toggleExtention').addEventListener('click', save_options);
  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save').addEventListener('click', save_options);
  document.getElementById('sidebar1').oninput = update_colors;
  document.getElementById('sidebar2').oninput = update_colors;
  document.getElementById('loginColor').oninput = update_colors;
  document.getElementById('solidColor').oninput = update_colors;
  document.getElementById('loginEmail').oninput = emailInputCheck;
  document.getElementById('loginEmail').onchange = emailInputCheck;
  document.getElementById('imgLink').oninput = update_preview;
  document.getElementById('logo').onclick = open_feedback;
  document.getElementById('refreshButton').onclick = resetSettings;
  document.getElementById('gradesButton').onclick = classesOverview;
  document.getElementById('scheduleButton').onclick = scheduleOverview;

}
registerActions()