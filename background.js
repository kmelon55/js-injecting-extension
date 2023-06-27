const urlList = {
  naverUrl: "https://www.naver.com/",
};

function naver() {
  naverSnippet();

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
    const right = rootElement.children[1];
    const firstChild = rootElement.firstElementChild;
    const footer = document.getElementById("footer");
    const rightContentArea = document.getElementById("right-content-area");
    const rightContentAreaFirst = rightContentArea.firstElementChild;
    const widget = document.getElementById("widgetboard");
    const top = document.getElementById("topSearchWrap");
    const elements = document.getElementsByClassName("ad_area");

    if (top) {
      top.style.padding = "64px 0 70px";
    }
    if (elements) {
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
      }
    }

    if (rightContentArea) {
      const children = rightContentAreaFirst.children;

      children[1].style.display = "none";
      children[children.length - 1].style.display = "none";
      children[0].style.width = "35%";
      children[0].style.float = "right";
      children[0].style.margin = "0 90px 0 0";

      if (children[2]) {
        children[2].style.width = "55%";
        children[2].style.margin = "0";
      }

      right.style.width = "100%";
      rightContentArea.style.width = "100%";
      rightContentAreaFirst.style.width = "100%";
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
