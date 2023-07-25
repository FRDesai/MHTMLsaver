// background.js (service worker)
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "downloadMHTML") {
    console.log("downloadMHTML...");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      const filename = sanitizeFilename(tab.title);
      chrome.pageCapture.saveAsMHTML({ tabId: tab.id }, function (mhtmlBlob) {
        const reader = new FileReader();
        reader.onloadend = function () {
          const base64Data = reader.result.split(",")[1];

          // Use chrome.downloads API to initiate the download
          chrome.downloads.download({
            url: "data:application/mhtml;base64," + base64Data,
            filename: filename + ".mhtml",
            saveAs: true,
          });
        };
        reader.readAsDataURL(mhtmlBlob);
      });
    });
  }
});

function sanitizeFilename(title) {
  return title.replace(/[\\/:*?"<>|]/g, "_").trim();
}
