window.onload = function () {
  // 저장된 스니펫 로드
  loadSavedSnippets();

  // 스니펫 저장 폼 submit 이벤트 핸들러
  document
    .getElementById("snippet-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("snippet-name").value;
      const url = document.getElementById("snippet-url").value;
      const code = document.getElementById("snippet-code").innerText;
      const editIndex = parseInt(document.getElementById("edit-index").value);
      if (Number.isNaN(editIndex)) {
        saveSnippet(name, url, code);
      } else {
        editSnippet(editIndex, name, url, code);
      }
      clearForm();
    });
};

// 스니펫 저장
function saveSnippet(name, url, code) {
  chrome.storage.sync.get("snippets", function (result) {
    const snippets = result.snippets || [];
    snippets.push({ name, url, code });
    chrome.storage.sync.set({ snippets: snippets }, function () {
      loadSavedSnippets();
    });
    console.log(snippets);
  });
}

// 스니펫 로드 및 리스트 업데이트
function loadSavedSnippets() {
  chrome.storage.sync.get("snippets", function (result) {
    const snippets = result.snippets || [];
    const snippetList = document.getElementById("snippet-list");
    snippetList.innerHTML = "";
    snippets.forEach(function (snippet, index) {
      const li = document.createElement("li");
      const toggleBtn = document.createElement("input");
      toggleBtn.type = "checkbox";
      toggleBtn.checked = true; // 기본값은 활성화
      toggleBtn.addEventListener("change", function () {
        // 코드 활성화/비활성화 로직 작성
      });
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", function () {
        showEditForm(index);
      });
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", function () {
        deleteSnippet(index);
      });
      li.textContent = `${snippet.name} (${snippet.url})`;
      li.appendChild(toggleBtn);
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
      snippetList.appendChild(li);
    });
  });
}

function editSnippet(index, newName, newUrl, newCode) {
  chrome.storage.sync.get("snippets", function (result) {
    const snippets = result.snippets || [];
    const snippet = snippets[index];
    snippet.name = newName;
    snippet.url = newUrl;
    snippet.code = newCode;
    chrome.storage.sync.set({ snippets }, function () {
      loadSavedSnippets();
    });
    console.log(snippets);
  });
}

function showEditForm(index) {
  const snippetName = document.getElementById("snippet-name");
  const snippetUrl = document.getElementById("snippet-url");
  const snippetCode = document.getElementById("snippet-code");

  const snippets = chrome.storage.sync.get("snippets", function (result) {
    const snippets = result.snippets || [];
    const snippet = snippets[index];
    snippetName.value = snippet.name;
    snippetUrl.value = snippet.url;
    snippetCode.value = snippet.code;

    document.getElementById("edit-index").value = index;
  });
}

// 스니펫 삭제
function deleteSnippet(index) {
  chrome.storage.sync.get("snippets", function (result) {
    const snippets = result.snippets || [];
    snippets.splice(index, 1);
    chrome.storage.sync.set({ snippets }, function () {
      loadSavedSnippets();
    });
    console.log(snippets);
  });
}

// 폼 초기화
function clearForm() {
  document.getElementById("snippet-name").value = "";
  document.getElementById("snippet-url").value = "";
  document.getElementById("snippet-code").value = "";
  document.getElementById("edit-index").value = "";
}
