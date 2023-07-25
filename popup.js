document.getElementById("saveButton").addEventListener("click", function () {
  chrome.runtime.sendMessage({ action: "downloadMHTML" });
  console.log("Download...");
});
