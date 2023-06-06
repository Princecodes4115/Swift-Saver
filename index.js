let myLead = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("save-btn");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const ulEl = document.getElementById("ul-el");
const leadFromLocalStorage = JSON.parse(localStorage.getItem("myLead"));

if (leadFromLocalStorage) {
  myLead = leadFromLocalStorage;
  render(myLead);
}

tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLead.push(tabs[0].url);
    localStorage.setItem("myLead", JSON.stringify(myLead));
    render(myLead);
    // chrome.tabs.sendMessage(tabs[0].id, {
    //   type: "get-url"
    // }, function(response) {
    //   if (response.url) {
    //     tabs.url = response.url
    //   }
    // });
  });
});

function render(lead) {
  let listItems = "";
  for (let i = 0; i < lead.length; i++) {
    listItems += `<li>
          <a target='_blank' href='${lead[i]}'> 
          ${lead[i]}
          </a>
      </li>`;
  }
  ulEl.innerHTML = listItems;
}

ulEl.addEventListener("click", function (event) {
  if (event.target.matches(".delete-btn")) {
    const index = event.target.dataset.index;
    myLead.splice(index, 1);
    localStorage.setItem("myLead", JSON.stringify(myLead));
    render(myLead);
  }
});

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLead = [];
  render(myLead);
});

inputBtn.addEventListener("click", function () {
  myLead.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLead", JSON.stringify(myLead));
  render(myLead);
});
