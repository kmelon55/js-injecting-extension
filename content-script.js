// const elementWithRootId = document.getElementById("root");

// if (elementWithRootId) {
//   // 첫 번째 자식 요소를 선택합니다.
//   const firstChild = elementWithRootId.firstChild;

//   if (firstChild) {
//     // 첫 번째 자식 요소에 대해 display를 none으로 설정합니다.
//     firstChild.style.display = "none";
//     console.log("success!");
//   } else {
//     console.error("The element with root ID has no child elements.");
//   }
// } else {
//   console.error("No element found with the given root ID.");
// }

// content script에서 스니펫 실행
function executeSnippetInContentScript(snippet) {
  const script = document.createElement("script");
  script.textContent = snippet.code;
  document.body.appendChild(script);
}

// background.js에서 메시지 수신 및 스니펫 실행
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.snippet) {
    executeSnippetInContentScript(request.snippet);
  }
});
