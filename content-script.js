async function addIframe() {
  const iframe = document.createElement("iframe");
  const loadComplete = new Promise((resolve) =>
    iframe.addEventListener("load", resolve)
  );
  iframe.src = "sandox.html";
  document.body.appendChild(iframe);
  await loadComplete;
  return iframe.contentWindow.document.title;
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "executeSnippet") {
    console.log("execute script");
    try {
      chrome.scripting
        .executeScript({
          target: { tabId: getTabId(), allFrames: true },
          func: addIframe,
        })
        .then((injectionResults) => {
          for (const frameResult of injectionResults) {
            const { frameId, result } = frameResult;
            console.log(`Frame ${frameId} result:`, result);
          }
        });
    } catch (error) {
      sendResponse({ success: false, error: error.message });
    }
  }
  return true;
});
