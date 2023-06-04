function executeSnippet(snippet) {
  // content script에 스니펫을 실행하도록 메시지를 보냅니다.
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    chrome.scripting
      .executeScript({
        target: { tabId: activeTab.id },
        func: createSnippetFunction(snippet.code),
      })
      .then(() => console.log("injected a function"));
  });

  console.log("Executing snippet:", snippet);
}
function createSnippetFunction(code) {
  return new Function(code);
}
function checkSnippetExecution(url) {
  chrome.storage.sync.get("snippets", function (result) {
    const snippets = result.snippets || [];
    snippets.forEach(function (snippet) {
      if (snippet.url === url) {
        executeSnippet(snippet);
      }
    });
  });
}

chrome.webNavigation.onDOMContentLoaded.addListener(function (details) {
  const url = details.url;
  checkSnippetExecution(url);
});
