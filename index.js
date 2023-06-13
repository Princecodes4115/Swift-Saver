let myLead = []; // empty array to store bookmarked URLs
// retrieving DOM elements
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("save-btn");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const ulEl = document.getElementById("ul-el");
const leadFromLocalStorage = JSON.parse(localStorage.getItem("myLead")); // attempting to retrieve previously saved bookmarks from local storage.

if (leadFromLocalStorage) {  // checking if there is any data stored in the leadFromLocalStorage
  myLead = leadFromLocalStorage;
  render(myLead);
}

tabBtn.addEventListener("click", function () { // requesting current active tab information 
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLead.push(tabs[0].url);
    localStorage.setItem("myLead", JSON.stringify(myLead));
    render(myLead);
  });
});

function render(lead) { // generating list of clickable elements from lead array
  let listItems = "";
  for (let i = 0; i < lead.length; i++) {
    listItems += `<li>
          <a target='_blank' href='${lead[i]}'> 
          ${lead[i]}
          </a>
      </li>`;
  }
  ulEl.innerHTML = listItems;  // assigning to DOM element for display 
}

ulEl.addEventListener("click", function (event) {
  // Check if the clicked element matches the selector ".delete-btn"
  if (event.target.matches(".delete-btn")) {
    // Get the index of the clicked element from the "data-index" attribute
    const index = event.target.dataset.index;
    // Remove the element at the specified index from the "myLead" array
    myLead.splice(index, 1);
    // Update the localStorage with the modified "myLead" array
    localStorage.setItem("myLead", JSON.stringify(myLead));
    // Render the updated "myLead" array on the UI
    render(myLead);
  }
});


deleteBtn.addEventListener("dblclick", function () { // delete button using double click
  localStorage.clear();
  myLead = [];
  render(myLead);
});

inputBtn.addEventListener("click", function () { // retrieves value from inputEl, push to array , clears input field, saves updated array in the local storage.
  myLead.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLead", JSON.stringify(myLead));
  render(myLead);
});
