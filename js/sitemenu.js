
testing = true
if (testing) { menudisplay = "unset" } else { menudisplay = "none" }
if (window.location.href.includes("aeries.net/student")) {
    document.head.innerHTML += `<style>@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');</style>`
    document.body.innerHTML += `
    <div id="simplifyMenu" style='display: ${menudisplay};'>
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
                        <div class='divider checkbox'><input type="checkbox"></div>
                        <div class='divider'>Hide District Name on Login Page?</div>
                    </div>
                    <div class='lower-part'>
                        <div class='divider checkbox'><input type="checkbox"></div>
                        <div class='divider'>Automatically Login In? (Google/OAuth)</div>
                    </div>
                    <div class='lower-part'>
                        <div class='divider color' id='login-color'></div>
                        <div class='divider'>Login Background</div>
                    </div>
                </div>
                <div class='section'>Dashboard</div>
                <div class='section-lower bg-hide' id='bg-section'>
                    <div class='lower-part'>
                        <div class='divider'>Thing1</div>
                        <div class='divider'>Thing2</div>
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
                </div>
                <div class='section'>Features</div>
                <div class='section-lower'>
                    <div class='lower-part'>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    js = "document.getElementById('simplifyMenu').style.display = '';console.log(`running show menu`)"
    document.getElementById("nav-account-dropdown").innerHTML += `<li class="zebra" onclick="javascript:${js}"><a id="aSimplifyAeries" css="ContextMenuItem">Simplify Aeries</a></li>`
    document.getElementsByClassName("icon-expanded widget-collapse")[document.getElementsByClassName("icon-expanded widget-collapse").length - 1].addEventListener("click", function () {
        if (document.getElementById('simplify-body').className.includes('collapsed')) { document.getElementById('simplify-body').className = 'expanded' } else { document.getElementById('simplify-body').className = 'collapsed' }
    });
}

console.log(window.location.href.substring(window.location.href.length - 26))
if (window.location.href.substring(window.location.href.length - 26) === "aeries.net/Simplify-Aeries") {
    console.log("site matches!")
    document.body.innerHTML = ""
    document.head.children[1].textContent = "Simplify Aeries Settings"
    document.head.children[2].innerHTML = `.container{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);padding:0;margin:0;width:500px;text-align:justify}h1{display:inline}.center-container{display:inline-block;padding:0;margin:0;width:500px}.bundled-settings{background-color:#fff;border-radius:25px;border-color:#000;border-width:medium;border-style:solid;padding:15px}.section-header{font-size:15px;font-weight:700;font-family:Montserrat,sans-serif;position:fixed initial;padding-left:40px;margin-bottom:0!important;margin-top:0!important}a{color:teal!important}`
    document.body.style = `font-family: montserrat, sans-serif !important; width: 380px !important;`
    document.body.innerHTML = `<div class=container><div class=center-container style=margin-top:20px;margin-bottom:10px><img src=https://github.com/sandervonk/Simplify-Aeries/raw/main/icon/3DLogo.png style=height:40px;margin-left:5%;vertical-align:100%><h1 style="vertical-align:60%;font-family:'Montserrat Alternates',sans-serif!important;padding-left:20px!important">Simplify Aeries</h1></div><p class=section-header>What It Is</p><div class=bundled-settings>Simplify Aeries is a Chrome Extension made to inprove the interactive and viewing experience of Aeries.net Student SIS sites, it does so through the use of CSS and JS content scripts. Feel free to take a look in the extension's folder to learn how it works (on the code side, for how YOU use it, see the below)!</div><p class=section-header>How To Use It</p><div class=bundled-settings>The extension has several main tabs, all of which (aside from the main/settings page) are described in the tutorial that opens when you first open the extension popup. To do this, find the icon on your top tray, note that there might be a puzzle icon which needs to be clicked before you 'pin' the Simplify Aeries widget in some browsers. From there, you'll want to tweak the settings to fit your liking before clicking 'Save'. To access the 'Quick Check Grades' and 'Class Schedule' tabs, you must first have visited your school/district's Aeries page with the extension installed. It will automatically set itself up from there. Note that this link should looks something like yourschool.asp.aeries.net/student/* .</div><p class=section-header>Other</p><div class=bundled-settings>If you have any problems getting the extension to work, or don't understand how to use some features, click the logo in the top right of the popup, which will both open a short feedback Google Form and make it so that the tutorial will re-run next time you open the popup. I hope you like it, and please use the form if you have any problems!</div><p class=section-header>Versioning info</p><div class=bundled-settings id=versioningInfo>This is version [0.0.0] of the Simplify Aeries Extension, made for Google Chrome and Microsoft Chromium Edge browsers. The extension is currently compatible with Aeries SIS version [9.21.6.22].</div><script src=../js/Info.js></script></div><div class=container style=left:20%!important;width:fit-content;position:fixed><img src="../imgForBack/Quick Check Grades.png"style=border-style:solid;height:auto;width:250px;border-radius:25px!important;display:none></div><div class=container style=left:80%!important;width:fit-content;position:fixed><img src="../imgForBack/Class Schedule.png"style=border-style:solid;height:auto;width:250px;border-radius:25px!important;display:none></div>`
}

document.getElementById("bg-url").addEventListener('input', function () {
    try {
        function imageExists(e, r) { var t = new Image; t.onload = function () { r(!0) }, t.onerror = function () { r(!1) }, t.src = e } var imageUrl = 'https://' + document.getElementById('bg-url').value.split("//")[document.getElementById('bg-url').value.split("//").length - 1];
        imageExists(imageUrl, (function (e) {
            e && (document.getElementById('url-parent').className = 'lower-part bg-image url good-url', console.log('good-url')), e || (document.getElementById('url-parent').className = 'lower-part bg-image url')
            if (e) {
                document.getElementById("bg-img-preview").src = imageUrl
            }
        }));
    } catch { }
    document.getElementById("bg-url").value = document.getElementById('bg-url').value.split("//")[document.getElementById('bg-url').value.split("//").length - 1]
});

