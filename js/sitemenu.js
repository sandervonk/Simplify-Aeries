
testing = true
if (testing) { menudisplay = "unset" } else { menudisplay = "none" }
if (window.location.href.includes("aeries.net/student") && !window.location.href.includes("Login")) {
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
    js = "document.getElementById('simplifyMenu').style.display = '';console.log(`running show menu`)"
    document.getElementById("nav-account-dropdown").innerHTML += `<li class="zebra" onclick="javascript:${js}"><a id="aSimplifyAeries" css="ContextMenuItem">Simplify Aeries</a></li>`
    document.getElementsByClassName("icon-expanded widget-collapse")[document.getElementsByClassName("icon-expanded widget-collapse").length - 1].addEventListener("click", function () {
        if (document.getElementById('simplify-body').className.includes('collapsed')) { document.getElementById('simplify-body').className = 'expanded' } else { document.getElementById('simplify-body').className = 'collapsed' }
    });
    setTimeout(function () {
        body = document.getElementById("simplify-parent")
        body.style["max-height"] = `${body.offsetHeight}px`
    }, 500)

    document.getElementById("bg-url").addEventListener('input', function () {
        try {
            function imageExists(e, r) { var t = new Image; t.onload = function () { r(!0) }, t.onerror = function () { r(!1) }, t.src = e } var imageUrl = 'https://' + document.getElementById('bg-url').value.split("//")[document.getElementById('bg-url').value.split("//").length - 1];
            imageExists(imageUrl, (function (e) {
                e && (document.getElementById('url-parent').className = 'lower-part bg-image url good-url', console.log('good-url')), e || (document.getElementById('url-parent').className = 'lower-part bg-image url')
                if (e) {
                    document.getElementById("bg-img-preview").src = imageUrl
                    document.getElementById("AeriesFullPageContent").style = `background: url(${imageUrl}) !important;`
                }
            }));
        } catch { }
        document.getElementById("bg-url").value = document.getElementById('bg-url').value.split("//")[document.getElementById('bg-url').value.split("//").length - 1]
    });

    document.getElementById("sidebar1").addEventListener('input', function () {
        color1 = document.getElementById("sidebar1").children[0].value
        color2 = document.getElementById("sidebar2").children[0].value
        document.getElementsByClassName("sidebar-gradient")[0].style.background = `linear-gradient(90deg, ${color1}, ${color2})`
        document.getElementById("AeriesFullPageNav").style = `background: radial-gradient(58.5rem at 50% 5rem, ${color1}, ${color2})!important;`
        //add to storage
    });
    document.getElementById("sidebar2").addEventListener('input', function () {
        color1 = document.getElementById("sidebar1").children[0].value
        color2 = document.getElementById("sidebar2").children[0].value
        document.getElementsByClassName("sidebar-gradient")[0].style.background = `linear-gradient(90deg, ${color1}, ${color2})`
        document.getElementById("AeriesFullPageNav").style = `background: radial-gradient(58.5rem at 50% 5rem, ${color1}, ${color2})!important;`
        //add to storage
    });
    document.getElementById("dash-color-picker").addEventListener('input', function () {
        color = document.getElementById("dash-color-picker").value
        document.getElementById("AeriesFullPageContent").style = `background: ${color} !important;`
        //add to storage
    });
    document.getElementById("login-color-picker").addEventListener('input', function () {
        color = document.getElementById("login-color-picker").value
        //add to storage
    });
}



