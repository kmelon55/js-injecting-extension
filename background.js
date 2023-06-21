const urlList = {
  naverUrl: "https://www.naver.com/",
};

function naver() {
  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        const widget = document.getElementById("widgetboard");
        if (widget) {
          naverSnippet();
          observer.disconnect();
        }
      }
    }
  });

  const observerOptions = {
    childList: true,
    subtree: true,
  };
  observer.observe(document.body, observerOptions);

  function naverSnippet() {
    const rootElement = document.getElementById("root");
    const firstChild = rootElement.firstElementChild;
    const footer = document.getElementById("footer");
    const rightContentAreaFirst =
      document.getElementById("right-content-area").firstElementChild;
    const widget = document.getElementById("widgetboard");

    if (rightContentAreaFirst) {
      const children = rightContentAreaFirst.children;
      children[1].style.display = "none";
      children[children.length - 1].style.display = "none";
    }

    if (firstChild) {
      firstChild.style.display = "none";
    }

    if (footer) {
      footer.style.display = "none";
    }

    if (widget) {
      widget.style.display = "none";
    }
  }
}

function checkSnippetExecution(url, tabId) {
  for (key in urlList) {
    if (urlList[key] === url) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: naver,
      });
    }
  }
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete") {
    const url = tab.url;
    checkSnippetExecution(url, tabId);
  }
});
