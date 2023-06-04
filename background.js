function checkSnippetExecution(url) {
  chrome.storage.sync.get("snippets", function (result) {
    const snippets = result.snippets || [];
    snippets.forEach(function (snippet) {
      if (snippet.url === url) {
        // (async () => {
        //   const [tab] = await chrome.tabs.query({
        //     active: true,
        //     lastFocusedWindow: true,
        //   });
        // })(
        //   chrome.scripting.executeScript(
        //     {
        //       target: { tabId: tab.id },
        //       func: `(function executeSnippet() {
        //       ${snippet.code}
        //     })();`,
        //     },
        //     function () {
        //       console.log("Executed snippet:", snippet);
        //     }
        //   )
        // );

        // message passing
        (async () => {
          const [tab] = await chrome.tabs.query({
            active: true,
            lastFocusedWindow: true,
          });
          const response = await chrome.tabs.sendMessage(tab.id, {
            action: "executeSnippet",
            snippet: snippet,
          });
          console.log(response);
        })();
      }
    });
  });
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    const url = tab.url;
    checkSnippetExecution(url);
  }
});
