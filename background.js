function checkSnippetExecution(url, tabId) {
  chrome.storage.sync.get("snippets", function (result) {
    const snippets = result.snippets || [];
    snippets.forEach(function (snippet) {
      if (snippet.url === url) {
        console.log(snippet.code);
        chrome.scripting
          .insertCSS({
            target: { tabId: tabId },
            css: snippet.code,
          })
          .then(() => console.log("CSS injected"));
      }
    });
  });
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (tab.url) {
    const url = tab.url;
    console.log(url);
    checkSnippetExecution(url, tabId);
  }
});

chrome.tabs.onCreated.addListener(function (tab) {
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (tab.url) {
      const url = tab.url;
      checkSnippetExecution(url, tabId);
    }
  });
});
