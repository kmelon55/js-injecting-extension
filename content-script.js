// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   if (message.action === "executeSnippet") {
//     try {
//       const { code } = message.snippet;

//       const blob = new Blob([code], { type: "text/javascript" });
//       const worker = new Worker(window.URL.createObjectURL(blob));

//       worker.onmessage = function (event) {
//         // 결과를 받아서 메인 스레드에서 처리
//         if (event.data === "alert") {
//           alert("Alert from Worker");
//         }
//         sendResponse({ success: true });
//         worker.terminate();
//       };

//       worker.onerror = function (error) {
//         sendResponse({ success: false, error: error.message });
//         worker.terminate();
//       };
//     } catch (error) {
//       sendResponse({ success: false, error: error.message });
//     }
//   }
//   return true; // 비동기 응답을 허용
// });

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "executeSnippet") {
    console.log("execute script");
    try {
      const code = message.snippet.code;

      const script = document.createElement("script");
      script.textContent = code;
      console.log(code);
      document.body.appendChild(script);

      sendResponse({ success: true });
    } catch (error) {
      sendResponse({ success: false, error: error.message });
    }
  }
  return true; // 비동기 응답을 허용
});

// const elementWithRootId = document.getElementById("root");

// if (elementWithRootId) {
//   const firstChild = elementWithRootId.firstChild;

//   if (firstChild) {
//     firstChild.style.display = "none";
//     console.log("success!");
//   } else {
//     console.error("The element with root ID has no child elements.");
//   }
// } else {
//   console.error("No element found with the given root ID.");
// }
