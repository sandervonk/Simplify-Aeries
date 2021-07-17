//automatically press the 'preview mode' button where needed
try{
    //check if actually on old dashboard as opposed to old subpages which also show the message
    if(window.location.href.includes('Default.aspx')){
        var previewButton = document.getElementById('aPreview')
        //check if the button for toggling preview has the word 'True' -- for an href of 
        //"?SetParentPortalPreview=True", which means that the user is not using the new page
        if(previewButton.href.includes("True")) {
            previewButton.click()
        }
    }
}catch{}
function addStyle(stylesheet) {
    // Get HTML head element
    var head = document.getElementsByTagName('HEAD')[0]; 

    // Create new link Element
    var link = document.createElement('link');

    // set the attributes for link element 
    link.rel = 'stylesheet'; 
    
    link.type = 'text/css';
    
    link.href = stylesheet; 

    // Append link element to HTML head
    head.appendChild(link);
    }
function addClassByPage(constraints, head) {
    var doesInclude = false
    for (constraint of constraints) {if(window.location.href.includes(constraint)) {doesInclude = true}}
    if(doesInclude) {document.getElementsByTagName('html')[0].classList.add(head);}
}
if(window.location.href.includes('Test') && (window.location.href.includes('Score') || window.location.href.includes('Details'))) {
    var elementForChange = document.getElementsByTagName('html')[0]
    elementForChange.classList.add("testPage");  
}

addClassByPage(["Students.aspx", "StudentProfile", "EmergencyContacts", "Fees.aspx"], "studentInfo")
addClassByPage(["Attendance.aspx"], "Attendance")
addClassByPage(["GraduationRequirements", "Transcripts.aspx", "Grades.aspx", "StudentStandardsBasedProgress.aspx", "GradebookSummary.aspx", "GradebookDetails.aspx"], "Grades")
addClassByPage(["Classes", "Gradebook"], "Classes")
try{document.getElementById("AeriesFullPageContent").children[2].children[1].cellPadding = "25px"}catch{}
//try{document.getElementById('aspnetForm').style = ""}catch{}


//try{document.getElementById("divTimeOutWarning").parentElement.classList.add("timeoutWrapper")}catch{}