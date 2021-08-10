
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
    ["#33333373", "black"],
    ["#2244ff73", "black"],
    ["#ff442273", "black"],
    ["#cccccc", "white"],
    ["#333333", "black"],
    ["#2244dd", "black"],
    ["#dd4422", "black"]
]
function shareImg(imgURI) {
    /*
    const blob = await(await fetch(imgURI)).blob();
    const file = new File([blob], 'MySchedule.png', { type: blob.type });
    navigator.share({
        title: 'My Schedule',
        text: 'Check out my schedule, generated by Simplify Aeries!',
        files: [file],
    })
    */
}
let timeoutID = window.setTimeout(function () {
    try { createPage(JSON.parse(localStorage["simplify-message"])) } catch { console.log("reverting to saved JSON failed") }
    console.log("used saved values")
}, 1000)

let colorIndex = 0
let themeIndex = 0
var r = document.querySelector(':root');
function decrease_brightness(hex, percent) {
    var r = parseInt(hex.substr(1, 2), 16),
        g = parseInt(hex.substr(3, 2), 16),
        b = parseInt(hex.substr(5, 2), 16);

    return '#' +
        ((0 | (1 << 8) + r * (100 - percent) / 100).toString(16)).substr(1) +
        ((0 | (1 << 8) + g * (100 - percent) / 100).toString(16)).substr(1) +
        ((0 | (1 << 8) + b * (100 - percent) / 100).toString(16)).substr(1);
}
function setTheme([bg, border]) {
    r.style.setProperty('--tile-bg', bg);
    r.style.setProperty('--tile-border', border);
}
function setColors([color1, color2], [color3, color4]) {
    //if (arguments.length != 4) {
    color3 = color1
    color4 = color2
    //}
    document.getElementById("color1").style.background = decrease_brightness(color1, 30)
    document.getElementById("bg-color").style.background = `linear-gradient(135deg, ${color1}, ${color2})`
    document.getElementById("bg-gradient").style.background = `linear-gradient(135deg, ${color3}, ${color4})`
    document.getElementById("color2").style.background = decrease_brightness(color2, 30)
}
function createPage(json) {
    let classesHTML = ""
    console.log(json)
    for (slot of json) {
        console.log(slot)
        classesHTML += `<div class="class"><div class="class-details" id="period">${slot.period}</div><div class="class-details" id="name">${slot.name}</div><div class="class-details" id="teacher"> - ${slot.teacher}</div><div class="class-details" id="room">${slot.room}</div></div>`
    }
    document.getElementById("classes").innerHTML = classesHTML
}
window.addEventListener("load", function () {


    $("#download").click(function () {
        function saveAs(uri, filename) {
            imgURI = uri

            var link = document.createElement('a');
            if (typeof link.download === 'string') {
                link.href = uri;
                link.download = filename;

                //Firefox requires the link to be in the body
                document.body.appendChild(link);

                //simulate click
                link.click();

                //remove the link when done
                document.body.removeChild(link);
            } else {
                window.open(uri);
            }
        }
        html2canvas(document.getElementsByClassName("display")[0]).then(function (canvas) {
            imgURI = canvas.toDataURL()
            saveAs(imgURI, 'classes.png');
            shareImg(imgURI);
        });
    });

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
    document.querySelector(".title-input").addEventListener("input", function () {
        let text = document.querySelector(".title-input").value
        let title = document.querySelector(".title-spacer")
        let classElement = document.getElementById("classes")
        title.innerText = text
        if (text.length === 0) {
            title.style.display = "none"
            classElement.style.height = "73vh"
        } else {
            title.style.display = ""
            classElement.style.height = ""
        }
        if (text.length > 20) {
            classElement.style.height = "64.5vh"
        }
    })
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.message) {
                createPage(request.message);
                console.log(request.message)
                window.clearTimeout(timeoutID)
                localStorage["simplify-message"] = JSON.stringify(request.message)
                console.log(localStorage["simplify-message"])
            }

        }
    );
})


