function createPage(json) {
    console.log(json)
}
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message) {
            createPage(request.message);
        }

    }
);