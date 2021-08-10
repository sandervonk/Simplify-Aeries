let colors = [
    ["#66c3c3", "#41d841"],
    ["#FF9900", "#E85CA1"],
    ["#4A86E8", "#66C3C3"],
    ["#434343", "#B7B7B7"],
    ["#FFD966", "#E69138"],
    ["#674EA7", "#B4A7D6"]
]
let themes = [
    ["#cccccc73", "white"],
    ["#33333373", "black"]
]
let colorIndex = 0
let themeIndex = 0
var r = document.querySelector(':root');

function setTheme([bg, border]) {
    r.style.setProperty('--tile-bg', bg);
    r.style.setProperty('--tile-border', border);
}
function setColors([color1, color2], [color3, color4]) {
    //if (arguments.length != 4) {
    color3 = color1
    color4 = color2
    //}
    document.getElementById("color1").style.background = color1
    document.getElementById("bg-color").style.background = `linear-gradient(135deg, ${color1}, ${color2})`
    document.getElementById("bg-gradient").style.background = `linear-gradient(135deg, ${color3}, ${color4})`
    document.getElementById("color2").style.background = color2
}
function createPage(json) {
    console.log(json)
}
window.addEventListener("load", function () {
    let randFirst = parseInt(Math.random() * (colors.length - 1))
    setColors(colors[randFirst], colors[randFirst + 1 % colors.length])
    document.getElementById("bg-gradient").addEventListener("click", function () {
        colorIndex++

        setColors(colors[colorIndex % colors.length], colors[(colorIndex + 1) % colors.length])
    })
    document.getElementById("tile-style").addEventListener("click", function () {
        themeIndex++
        setTheme(themes[themeIndex % themes.length])
    })
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.message) {
                createPage(request.message);
                localStorage["simplify-message"] = request.message
            }

        }
    );
})


