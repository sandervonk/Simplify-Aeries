function scrapePeriods(sendInfo) {
  let classesInfo = [];

  var numOfRows = parseInt(
    document
      .querySelector(`#gridCourses > tbody > tr:last-of-type`)
      .children[1].textContent.replace(/[Pd\s]/g, "")
  );
  let scheduleElements = [];
  scheduleElements[0] = `<img id=backButton src=../icon/3DLogo.png style=position:absolute;top:5px;right:5px;height:30px><img id=shareButton src=../imgForBack/share.png style=filter:brightness(1.5);position:absolute;top:5px;left:5px;height:30px><div class="top-rounded2">Class Schedule</div>`;
  for (var periodNum = 1; periodNum <= numOfRows; periodNum++) {
    console.log("running on", periodNum);
    var classInfo = {};
    var classElement = document.querySelector(
      `#gridCourses > tbody > tr:nth-child(${periodNum + 2})`
    );
    classInfo.period = parseInt(classElement.children[1].textContent.replace("Pd", ""));
    classInfo.name = classElement.children[0].textContent
      .split("-")[1]
      .replace(/[\n\t]/g, "")
      .split(":")[0];
    classInfo.room = classElement.children[6].textContent.replace("Room ", "").replace(" ", "");
    classInfo.teacher = classElement.children[4].textContent
      .split(",")[0]
      .replace("Teacher", "")
      .replace(/[\s]/g, "");
    classInfo.teacherEmail = classElement.children[9].children[2].href;
    console.log(classInfo);
    if (!scheduleElements[classInfo.period]) {
      classesInfo.push(classInfo);
      scheduleElements[
        classInfo.period
      ] = `<div class="elementGroup2"><div class="classLeft2 gradeSection2">${classInfo.period}</div><div class="classMiddleLeft gradeSection2">${classInfo.name}</div><div class="classMiddleRight gradeSection2"><a href="${classInfo.teacherEmail}">${classInfo.teacher}</a><a></a></div><div class="classRight2 gradeSection2">${classInfo.room}</div></div>`;
    } else {
      // periodNum--;
    }
  }
  if (arguments.length >= 1 && sendInfo === true) {
    return classesInfo;
  } else {
    return scheduleElements.join("");
  }
}
function shareInterface() {
  let classes = scrapePeriods(true);
  console.log("response from share scrape", classes);
  return classes;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message && request.message == "scrape schedule") {
    elementForAdd = scrapePeriods();
    sendResponse(elementForAdd);
    console.log("sent response:");
    console.log(elementForAdd);
  }
  if (request.message && request.message == "share schedule") {
    let classes = shareInterface();
    sendResponse(classes);
  }
});
