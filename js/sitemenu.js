function saveSettings() {
    removeDistrict = JSON.parse(localStorage["Simplify-Hide-District"])
    if (localStorage["Simplify-Auto-Login"] === "false") {
        autoLogin = false
        OAuthEmail = ""
    } else {
        autoLogin = true
        OAuthEmail = localStorage["Simplify-Auto-Login"]
    }
    if (localStorage["Simplify-Background"].includes("url(")) {
        dashBackgroundImg = localStorage["Simplify-Background"].split('url(')[1].split(')')[0]
        dashBackgroundColor = "#ADD8E6";
        useBgImage = true
    } else {
        useBgImage = false
        dashBackgroundImg = "https://lh3.googleusercontent.com/-24SGkkk23w4/YL6HMZfiIYI/AAAAAAAAygY/43yk0zyDv_MfZXK2ZjxuvBM4Jgieik--wCJEEGAsYHg/s0/2021-06-07.png"
        dashBackgroundColor = localStorage["Simplify-Background"].substring(12, 19)
    }
    loginBackground = localStorage["Simplify-Login-Color"].substring(12, 19)
    sidebarColor = [localStorage["Simplify-Sidebar"].substring(49, 56), localStorage["Simplify-Sidebar"].substring(58, 65)]
    //remember to add floatBtn
    chrome.storage.sync.set({
        "automaticallyLogin": autoLogin,
        "background": loginBackground,
        "bgColor": dashBackgroundColor,
        "imgLink2": dashBackgroundImg,
        "loginOAuth": OAuthEmail,
        "remove": removeDistrict,
        "sColor1": sidebarColor[0],
        "sColor2": sidebarColor[1],
        "useImage": useBgImage,
    }, function () {
        console.log("value saved")
    });
}
function loadSettings() {
    //remember to add floatBtn
    chrome.storage.sync.get([
        "automaticallyLogin",
        "background",
        "bgColor",
        "imgLink2",
        "loginOAuth",
        "remove",
        "sColor1",
        "sColor2",
        "useImage"
    ], function (result) {
        console.log("loaded settings:")
        console.log(result)
        if (!result.automaticallyLogin) {
            localStorage["Simplify-Auto-Login"] = "false"
        } else {
            localStorage["Simplify-Auto-Login"] = result.loginOAuth
        }
        localStorage["Simplify-Hide-District"] = result.remove
        localStorage["Simplify-Login-Color"] = `background: ${result.background} !important`
        if (result.useImage) {
            localStorage["Simplify-Background"] = `background: url(${result.imgLink2}) !important; background-size: cover !important; background-position-x: center !important;`
        } else {
            localStorage["Simplify-Background"] = `background: ${result.bgColor} !important;`
        }
        localStorage["Simplify-Sidebar"] = `background: radial-gradient(58.5rem at 50% 5rem, ${result.sColor1}, ${result.sColor2})!important;`

    });
}

function setupListeners() {
    //set defaults
    if (localStorage["Simplify-Sidebar"] === undefined) {
        localStorage["Simplify-Sidebar"] = `background: radial-gradient(58.5rem at 50% 5rem, #2e8eab, #113e75)!important;`;
    }
    if (localStorage["Simplify-Login-Color"] === undefined) {
        localStorage["Simplify-Login-Color"] = `background: lightblue !important`
    }
    if (localStorage["Simplify-Hide-District"] === undefined) {
        localStorage["Simplify-Hide-District"] = true
    }
    if (localStorage["Simplify-Auto-Login"] === undefined) {
        localStorage["Simplify-Auto-Login"] = false;
    }
    if (localStorage["Simplify-Background"] === undefined) {
        localStorage["Simplify-Background"] = "background: #ADD8E6 !important"
    }
    //set background in ui
    var timeoutID;
    function startTimer() { timeoutID = window.setTimeout(closePreview, 3000); }
    function resetTimer() { window.clearTimeout(timeoutID); }
    function closePreview() { document.getElementById("simplifyMenu").className = document.getElementById("simplifyMenu").className.replace(" sidebar-edit", ""); tog1 = true; tog2 = true }
    tog1 = true
    tog2 = true
    //load colors into sidebar and its previews
    color1 = localStorage["Simplify-Sidebar"].substring(49, 56)
    color2 = localStorage["Simplify-Sidebar"].substring(58, 65)
    document.getElementById("sidebar1").children[0].value = color1
    document.getElementById("sidebar2").children[0].value = color2
    document.getElementsByClassName("sidebar-gradient")[0].style.background = `linear-gradient(90deg, ${color1}, ${color2})`
    //setup hide district button
    document.getElementById("hide-district").checked = JSON.parse(localStorage["Simplify-Hide-District"])
    document.getElementById("hide-district").addEventListener("input", function () {
        element = document.getElementById("hide-district")
        localStorage["Simplify-Hide-District"] = element.checked
        //for login page only
        try {
            if (element.checked) { districtVis = "hidden" } else { districtVis = "visible" }
            document.getElementById("district").style.visibility = districtVis
        } catch { }

    })
    //setup auto login requisites, do correct highlighting and load checks
    if (localStorage["Simplify-Auto-Login"] != "false") {
        document.getElementById("auto-login").checked = true
        document.getElementById("email-login").value = localStorage["Simplify-Auto-Login"]
        document.getElementsByClassName("login-email")[0].className += " good-email"
        document.querySelector("#simplify-parent > div:nth-child(2) > div.lower-part.auto-login.login-check").className += " enabled"
    }
    //setup autologin coloring and settings
    document.getElementById("auto-login").addEventListener("input", function () {
        element = document.getElementById("auto-login")
        if (element.checked) {
            element.parentElement.parentElement.className += " enabled"
        } else {
            parent = document.getElementsByClassName("lower-part auto-login login-check")[0]
            parent.className = parent.className.replace(" enabled", "")
            localStorage["Simplify-Auto-Login"] = false
        }

    })
    //add listeners for collapse icon/close functions
    document.querySelector("#simplify-body > div.simplify-title > div > span").addEventListener("click", function () {
        document.querySelector("#simplify-parent").style.display = "none"
        document.querySelector("#simplify-body").style = "min-height: 0px !important"
        icon = document.querySelector("#simplify-body > div.simplify-title > div > span")
        icon.className = document.querySelector("#simplify-body > div.simplify-title > div > span").className.replace('icon-expanded', 'icon-close')
        icon.title = "Click to close"
        icon.addEventListener("click", function () {
            document.getElementById("simplifyMenu").remove()
            //for login only
            try {
                document.querySelector("#simplify-settings").remove()
            } catch { }
            saveSettings()
            window.location.reload()
        })
    })

    //load previous settings to UI
    document.getElementById("login-color-picker").value = localStorage["Simplify-Login-Color"].substring(12, 19)
    if (localStorage["Simplify-Background"].includes("url(")) {
        document.querySelector("#bg-box").click()
        document.getElementById("bg-url").value = localStorage["Simplify-Background"].split('url(https://')[1].split(')')[0]
        try {
            function imageExists(e, r) { var t = new Image; t.onload = function () { r(!0) }, t.onerror = function () { r(!1) }, t.src = e } var imageUrl = 'https://' + document.getElementById('bg-url').value.split("//")[document.getElementById('bg-url').value.split("//").length - 1];
            imageExists(imageUrl, (function (e) {
                e && (document.getElementById('url-parent').className = 'lower-part bg-image url good-url', console.log('good-url')), e || (document.getElementById('url-parent').className = 'lower-part bg-image url')
                if (e) {
                    document.getElementById("bg-img-preview").src = imageUrl
                    //main page only
                    try {
                        document.getElementById("AeriesFullPageContent").style = `background: url(${imageUrl}) !important; background-size: cover !important; background-position-x: center !important;`
                    } catch { }
                    localStorage["Simplify-Background"] = `background: url(${imageUrl}) !important; background-size: cover !important; background-position-x: center !important;`
                }
            }));
        } catch { }
    } else {
        document.getElementById("dash-color-picker").value = localStorage["Simplify-Background"].split('background: ')[1].replace(' !important;', '')
    }

    //add listeners and checks for bg url setting
    document.getElementById("bg-url").addEventListener('input', function () {
        try {
            function imageExists(e, r) { var t = new Image; t.onload = function () { r(!0) }, t.onerror = function () { r(!1) }, t.src = e } var imageUrl = 'https://' + document.getElementById('bg-url').value.split("//")[document.getElementById('bg-url').value.split("//").length - 1];
            imageExists(imageUrl, (function (e) {
                e && (document.getElementById('url-parent').className = 'lower-part bg-image url good-url', console.log('good-url')), e || (document.getElementById('url-parent').className = 'lower-part bg-image url')
                if (e) {
                    document.getElementById("bg-img-preview").src = imageUrl
                    //for main page only
                    try { document.getElementById("AeriesFullPageContent").style = `background: url(${imageUrl}) !important; background-size: cover !important; background-position-x: center !important;` } catch { }
                    localStorage["Simplify-Background"] = `background: url(${imageUrl}) !important; background-size: cover !important; background-position-x: center !important;`
                }
            }));
        } catch { }
        document.getElementById("bg-url").value = document.getElementById('bg-url').value.split("//")[document.getElementById('bg-url').value.split("//").length - 1]
    });

    //add listeners and function for bg img/color switch
    document.getElementById("bg-box").addEventListener('change', function () {
        element = document.getElementById("bg-box")
        checked = element.checked
        if (!checked) {
            color = document.getElementById("dash-color-picker").value
            //for dash only
            try {
                document.getElementById("AeriesFullPageContent").style = `background: ${color} !important;`;
            } catch { }
            localStorage["Simplify-Background"] = `background: ${color} !important;`;
        } else {
            function imageExists(e, r) { var t = new Image; t.onload = function () { r(!0) }, t.onerror = function () { r(!1) }, t.src = e } var imageUrl = 'https://' + document.getElementById('bg-url').value.split("//")[document.getElementById('bg-url').value.split("//").length - 1];
            imageExists(imageUrl, (function (e) {
                e && (document.getElementById('url-parent').className = 'lower-part bg-image url good-url', console.log('good-url')), e || (document.getElementById('url-parent').className = 'lower-part bg-image url')
                if (e) {
                    document.getElementById("bg-img-preview").src = imageUrl
                    localStorage["Simplify-Background"] = `background: url(${imageUrl}) !important; background-size: cover !important; background-position-x: center !important;`
                    //for main page only
                    try {
                        document.getElementById("AeriesFullPageContent").style = `background: url(${imageUrl}) !important; background-size: cover !important; background-position-x: center !important;`
                    } catch { }
                }
            }));
            document.getElementById("bg-url").value = document.getElementById('bg-url').value.split("//")[document.getElementById('bg-url').value.split("//").length - 1]
        }
    });

    //auto-login email handling
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }//setup listeners for email input field
    document.getElementById("email-login").addEventListener("input", function () {
        element = document.getElementById("email-login")
        if (validateEmail(element.value)) {
            localStorage["Simplify-Auto-Login"] = element.value
            document.getElementsByClassName("login-email")[0].className += " good-email"
        } else {
            document.getElementsByClassName("login-email")[0].className = document.getElementsByClassName("login-email")[0].className.replace(" good-email", "")
        }
    })

    //add listeners for sidebars
    for (sidebarType of ["sidebar1", "sidebar2"]) {
        document.getElementById(sidebarType).addEventListener('input', function () {
            color1 = document.getElementById("sidebar1").children[0].value
            color2 = document.getElementById("sidebar2").children[0].value
            document.getElementsByClassName("sidebar-gradient")[0].style.background = `linear-gradient(90deg, ${color1}, ${color2})`
            localStorage["Simplify-Sidebar"] = `background: radial-gradient(58.5rem at 50% 5rem, ${color1}, ${color2})!important;`
            //only main page:
            try {
                document.getElementById("AeriesFullPageNav").style = `background: radial-gradient(58.5rem at 50% 5rem, ${color1}, ${color2})!important;`
                document.querySelector("#AeriesTextLogo").style = `background: ${color2} !important;`
                resetTimer()
            } catch { }
        });
    }

    document.getElementById("sidebar1").children[0].addEventListener('focus', function () { if (tog1 === true) { document.getElementById("simplifyMenu").className += " sidebar-edit"; startTimer() } else { document.getElementById("simplifyMenu").className = document.getElementById("simplifyMenu").className.replace(" sidebar-edit", "") } });
    document.getElementById("sidebar1").children[0].addEventListener('blur', function () { tog1 = !tog1; if (tog1 === true) { tog1 = false; document.getElementById("simplifyMenu").className += " sidebar-edit"; startTimer() } else { document.getElementById("simplifyMenu").className = document.getElementById("simplifyMenu").className.replace(" sidebar-edit", "") } });
    document.getElementById("sidebar2").children[0].addEventListener('focus', function () { if (tog2 === true) { document.getElementById("simplifyMenu").className += " sidebar-edit"; startTimer() } else { document.getElementById("simplifyMenu").className = document.getElementById("simplifyMenu").className.replace(" sidebar-edit", "") } });
    document.getElementById("sidebar2").children[0].addEventListener('blur', function () { tog2 = !tog2; if (tog2 === true) { tog2 = false; document.getElementById("simplifyMenu").className += " sidebar-edit"; startTimer() } else { document.getElementById("simplifyMenu").className = document.getElementById("simplifyMenu").className.replace(" sidebar-edit", "") } });

    //handlers for color pickers
    document.getElementById("dash-color-picker").addEventListener('input', function () {
        color = document.getElementById("dash-color-picker").value
        //main page only
        if (!window.location.href.includes("/Login")) {
            document.getElementById("AeriesFullPageContent").style = `background: ${color} !important;`
        }

        localStorage["Simplify-Background"] = `background: ${color} !important;`
    });
    document.getElementById("login-color-picker").addEventListener('input', function () {
        color = document.getElementById("login-color-picker").value
        //for login only
        if (window.location.href.includes("/Login")) {
            document.body.style = `background: ${color}!important`
        }
        localStorage["Simplify-Login-Color"] = `background: ${color}!important`
        //add to storage
    });
}
var settingsElement = `
<div id="simplifyMenu" style='display: unset;'>
    <div id='simplify-body'>
        <div class="simplify-title">
            Simplify Aeries Settings
            <div class="widget-options pull-right">
                <span class="icon-expanded widget-collapse" title="Click to collapse"></span>
            </div>
        </div>
        <div id='simplify-parent'>
            <div class='section'>Login</div>
            <div class='section-lower'>
                <div class='lower-part'>
                    <div class='divider checkbox'><input type="checkbox" id="hide-district"></div>
                    <div class='divider'>Hide District Name on Login Page?</div>
                </div>
                <div class='lower-part auto-login login-check'>
                    <div class='divider checkbox'><input type="checkbox" id="auto-login"></div>
                    <div class='divider'>Automatically Login In? (Google/OAuth)</div>
                </div>
                <div class='lower-part auto-login login-email'>
                    <div class='divider'><input id="email-login" placeholder="your.email@provider.com"></div>
                </div>
                <div class='lower-part'>
                    <div class='divider color' id='login-color'><input type="color" id="login-color-picker" value="#ADD8E6"></div>
                    <div class='divider'>Login Background</div>
                </div>
            </div>
            <div class='section'>Dashboard</div>
            <div class='section-lower bg-hide' id='bg-section'>
                <div class='lower-part sidebar-colors'>
                    <div id='sidebar1' class='divider sidebar-color sidebar-1'><input value='#2e8eab' type='color'></div>
                    <div class='divider sidebar-gradient'><span>Sidebar Colors</span></div>
                    <div id='sidebar2' class='divider sidebar-color sidebar-2'><input value='#113e75' type='color'></div>
                </div>
                <div class='lower-part bg-show bg-image box' id='bg-part'>
                    <div class='divider checkbox'><input type='checkbox' id='bg-box' onClick="if(document.getElementById('bg-box').checked){document.getElementById('bg-section').className=document.getElementById('bg-section').className.replace('bg-hide','bg-show')}else{document.getElementById('bg-section').className=document.getElementById('bg-section').className.replace('bg-show','bg-hide')}">
                    </div>
                    <div class='divider'>Use Background Image? (URL)</div>
                </div>
                <div class='lower-part bg-image image'>
                    <img src='https://via.placeholder.com/1920x1080' id='bg-img-preview'>
                </div>
                <div class='lower-part bg-image url' id="url-parent">
                    <input type='url' id='bg-url' placeholder='path.to/your.img'>
                </div>
                <div class='lower-part dash-bg'>
                    <div class='divider color' id='dash-color'><input type="color" id="dash-color-picker" value="#ADD8E6"></div>
                    <div class='divider'>Dashboard Background</div>
                </div>
            </div>
            <div class='section'>Features</div>
            <div class='section-lower'>
                <div class='lower-part'>
                </div>
            </div>
        </div>
    </div>
</div>`
loadSettings()
if (window.location.href.includes("aeries.net/student") && !window.location.href.includes("Login")) {
    document.head.innerHTML += `<style>@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');</style>`


    document.getElementById("nav-account-dropdown").innerHTML += `<li class="zebra"><a id="aSimplifyAeries" css="ContextMenuItem">Simplify Aeries</a></li>`

    //load from cache
    setTimeout(function () {

        document.getElementById('aSimplifyAeries').addEventListener("click", function () {
            document.querySelector("#nav-account-dropdown").className = document.querySelector("#nav-account-dropdown").className.replace(" show", "")
            document.body.innerHTML += settingsElement
            setTimeout(setupListeners, 300)
            console.log(`showing menu`)
            setTimeout(function () {
                document.getElementById("simplifyMenu").className = "blurred"
            }, 100)

        })
        if (localStorage["Simplify-Background"] === undefined) {
            localStorage["Simplify-Background"] = `background: lightblue !important;`;
        }
        if (localStorage["Simplify-Sidebar"] === undefined) {
            localStorage["Simplify-Sidebar"] = `background: radial-gradient(58.5rem at 50% 5rem, #2e8eab, #113e75)!important;`;
        }
        if (localStorage["Simplify-Hide-District"] === undefined) {
            localStorage["Simplify-Hide-District"] = true
        }
        if (localStorage["Simplify-Auto-Login"] === undefined) {
            localStorage["Simplify-Auto-Login"] = false;
        }
        document.getElementById("AeriesFullPageContent").style = localStorage["Simplify-Background"]
        document.getElementById("AeriesFullPageNav").style = localStorage["Simplify-Sidebar"]
        document.querySelector("#AeriesTextLogo").style = `background: ${localStorage["Simplify-Sidebar"].substring(58, 65)} !important;`
    }, 200)



} else if (window.location.href.includes('student/Login')) {
    //set defaults
    if (localStorage["Simplify-Sidebar"] === undefined) {
        localStorage["Simplify-Sidebar"] = `background: radial-gradient(58.5rem at 50% 5rem, #2e8eab, #113e75)!important;`;
    }
    if (localStorage["Simplify-Login-Color"] === undefined) {
        localStorage["Simplify-Login-Color"] = `background: lightblue !important`
    }
    if (localStorage["Simplify-Hide-District"] === undefined) {
        localStorage["Simplify-Hide-District"] = true
    }
    if (localStorage["Simplify-Auto-Login"] === undefined) {
        localStorage["Simplify-Auto-Login"] = false;
    }

    //login sequence:
    if (localStorage["Simplify-Auto-Login"] != "false") {
        console.log("Auto Logging in...")
    }
    //end login

    //show/hide district name
    if (JSON.parse(localStorage["Simplify-Hide-District"])) { districtVis = "hidden" } else { districtVis = "visible" }

    //add styles that can only be applied once stuff loads
    setTimeout(function () {
        document.getElementById("district").style.visibility = districtVis
        document.styleSheets[0].insertRule(`
        @font-face {
            font-family: 'aeries_sanssemibold';
            src: url('https://mvla.asp.aeries.net/student/StyleSheets/fonts/Aeries/aeriessans-semibold-webfont.woff2') format('woff2'), url('https://mvla.asp.aeries.net/student/StyleSheets/fonts/Aeries/aeriessans-semibold-webfont.woff') format('woff');
            font-weight: normal;
            font-style: normal;
        }`)
    }, 300)

    //set background color for login
    document.body.style = localStorage["Simplify-Login-Color"]
    document.head.innerHTML += `
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap') 
      </style>`

    //add settings icon to login bar
    setTimeout(function () {
        document.querySelector("#login-block > div.login-box.clearfix > div.language-wrapper > p").innerHTML += `<a id="simplify-settings" title="Open Simplify Aeries Settings" style="padding-left: 10px;font-size:20pt !important;line-height: 10px !important;position: absolute;top: 50%;transform: translateY(-50%);cursor: pointer;text-decoration: none !important;user-select: none;">&#9881;</a>`
        document.querySelector("#simplify-settings").addEventListener("click", function () {
            document.body.innerHTML += settingsElement
            setTimeout(setupListeners, 300)
            setTimeout(function () {

                //load values
                //load previous settings to UI
                if (localStorage["Simplify-Background"].includes("url(")) {
                    document.querySelector("#bg-box").click()
                    document.getElementById("bg-url").value = localStorage["Simplify-Background"].split('url(https://')[1].split(')')[0]
                    try {
                        function imageExists(e, r) { var t = new Image; t.onload = function () { r(!0) }, t.onerror = function () { r(!1) }, t.src = e } var imageUrl = 'https://' + document.getElementById('bg-url').value.split("//")[document.getElementById('bg-url').value.split("//").length - 1];
                        imageExists(imageUrl, (function (e) {
                            e && (document.getElementById('url-parent').className = 'lower-part bg-image url good-url', console.log('good-url')), e || (document.getElementById('url-parent').className = 'lower-part bg-image url')
                            if (e) {
                                document.getElementById("bg-img-preview").src = imageUrl
                                localStorage["Simplify-Background"] = `background: url(${imageUrl}) !important; background-size: cover !important; background-position-x: center !important;`
                            }
                        }));
                    } catch { }
                } else {
                    document.getElementById("dash-color-picker").value = localStorage["Simplify-Background"].split('background: ')[1].replace(' !important;', '')
                }
            }, 200)

        })
    }, 200)

}

