// Saves options to chrome.storage
function correctColor(strColor){
  var s = new Option().style;
  s.color = strColor;
  if ((s.color != strColor) && !(s.color.includes("rgb("))){
    return "white"
  }else {
    return strColor
  }
}
function open_feedback() {
  window.open('https://docs.google.com/forms/d/e/1FAIpQLScRFkl3fTB_d0nBePbrHBS7gjHXBgfGjcxeALL8QMX3JEaiRQ/viewform?usp=sf_link', '_blank');
}
function save_options() {
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
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        status.style = 'border-color: black; background-color: white;';
        setTimeout(function() {
          status.textContent = '';
          status.style = 'border-color: transparent; background-color: transparent;';
        }, 750);
      });
      try{
        chrome.tabs.query({url: "*://*.aeries.net/*"}, function(tabs) {
          for (var tab of tabs) {
            chrome.tabs.sendMessage(tab.id, {message: "reload"}, function(response) {
              console.log(response);
            });
          } 
        });
      }catch{}

    }
  function update_login() {
      console.log("running update_login")
      document.getElementById("autoLog").click(function() {
          if(document.getElementById("autoLog").checked == true) {
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
    }, function(items) {
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
    var re= /\b[a-z0-9-_.]+@[a-z0-9-_.]+(\.[a-z0-9]+)+/i
    if (re.test(document.getElementById('loginEmail').value) == true) {
      document.getElementById('loginEmailCheck').style = "background: lightgreen !important;";
    }
    if (re.test(document.getElementById('loginEmail').value) == false) {
      document.getElementById('loginEmailCheck').style = "background: pink !important;";
    }
    console.log("ran input check")
    console.log("element:")
    console.log(document.getElementById('loginEmail'))
    console.log("value:")
    console.log(document.getElementById('loginEmail').value)
    console.log("test result:")
    console.log(re.test(document.getElementById('loginEmail').value))
  }

  function update_preview() { 
    document.getElementById('imgPreview').src = document.getElementById('imgLink').value;
  }
  
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

 