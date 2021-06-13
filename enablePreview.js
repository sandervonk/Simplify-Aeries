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
if(window.location.href.includes('Test') && (window.location.href.includes('Score') || window.location.href.includes('Details'))) {
    addStyle("TestScoresTweaks.css")
}