const itemList = document.getElementById("item-list");

function createItem(string) {
  let div = document.createElement("div");
  div.classList.add("item");
  let p = document.createElement("p");
  p.textContent = `${string}`;

  if (string === "Error") {
    return;
  }
  if (string === "") {
    return;
  }

  itemList.appendChild(div);
  div.appendChild(p);
  div.appendChild(createDeleteButton());
  sessionStorage.setItem(string, string);
}

function createDeleteButton() {
  let button = document.createElement("button");
  button.classList.add("delete-button");
  button.textContent = "Delete";
  button.onclick = function deleteItem(parentNode) {
    let parent = button.parentElement;
    let keys = Object.keys(sessionStorage);
    for (let i = 0; i < keys.length; i++) {
      if (parent.firstChild.textContent == keys[i]) {
        sessionStorage.removeItem(keys[i]);
      }
    }
    parent.remove();
  };

  return button;
}

function validateItems(string) {
  let items = document.getElementsByClassName("item");
  let x = 0;
  for (let i = 0; i < items.length; i++) {
    x++;
    if (x >= 10) {
      alert("Please delete an item before adding a new one.");
      return "Error";
    }
  }
  return string;
}

function populateList() {
  let keys = Object.keys(sessionStorage);
  for (let i = 0; i < keys.length; i++) {
    createItem(validateItems(keys[i]));
  }
}

function deleteAll() {
  let keys = Object.keys(sessionStorage);  
  for(let i = 0; i < keys.length; i++) {
    sessionStorage.removeItem(keys[i]);
  }
  itemList.textContent="";
}

populateList();

const submit = document.getElementById("submit");

submit.addEventListener(`click`, (e) => {
  e.preventDefault();
  let newItem = document.getElementById("new-item");
  createItem(validateItems(newItem.value));
  newItem.value = "";
});

let textInput = document.getElementById("new-item");
textInput.addEventListener("keydown", (event) => {
  // if not 'enter key' just exit here
  if (event.keyCode !== 13) return;
  event.preventDefault();
  let newItem = document.getElementById("new-item");
  createItem(validateItems(newItem.value));
  newItem.value = "";
});

const clearAll = document.getElementById("clear-all");

clearAll.addEventListener("click", (e) => {
  e.preventDefault();
  deleteAll();
})