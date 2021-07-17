function scrapePeriods() {
    var classesInfo = []

    var numOfClasses = parseInt(document.querySelector(`#gridCourses > tbody > tr:last-of-type`).children[1].textContent.replace(/[Pd\s]/g, ''))
    scheduleElements = `<img id=backButton src=../icon/3DLogo.png style=position:absolute;top:5px;right:5px;height:30px><div class="top-rounded2">Class Schedule</div>`
    for (var periodNum = 1; periodNum < numOfClasses; periodNum++) {
        var classInfo = {}
        var classElement = document.querySelector(`#gridCourses > tbody > tr:nth-child(${periodNum + 2})`)
        classInfo.period = periodNum
        classInfo.name = classElement.children[0].textContent.split("-")[1].replace(/[\n\t]/g, "")
        classInfo.room = classElement.children[6].textContent.replace("Room ", "").replace(" ", "")
        classInfo.teacher = classElement.children[4].textContent.split("-")[1].replace(/[\s]/g, "")
        classInfo.teacherEmail = classElement.children[9].children[2].href
        classesInfo.push(classInfo)
        scheduleElements += `<div class="elementGroup2"><div class="classLeft2 gradeSection2">${classInfo.period}</div><div class="classMiddleLeft gradeSection2">${classInfo.name}</div><div class="classMiddleRight gradeSection2"><a href="${classInfo.teacherEmail}">${classInfo.teacher}</a><a></a></div><div class="classRight2 gradeSection2">${classInfo.room}</div></div>`
    }
    console.log("classes info:")
    console.log(classesInfo)
    console.log(scheduleElements)
    return scheduleElements
}



chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message && request.message == "scrape schedule") {
            elementForAdd = scrapePeriods()
            sendResponse(elementForAdd);
            console.log("sent response:")
            console.log(elementForAdd)
        }
    }
);