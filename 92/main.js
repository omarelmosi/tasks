let input = document.querySelector(".tex");
let addBtn = document.querySelector(".add");
let itemList = document.querySelector(".item-list");
let idCounter = 1;
let alertE = document.querySelector(".alert");

let tasks = [];

addBtn.addEventListener("click", function (e) {
  if (input.value === "") {
    displayAlert("يا أستاذ انت مكتبتش حاجه ", "danger");
  } else {
    let value = input.value;
    addToArr(value);
    input.value = "";
    displayAlert("ابسط يا عم ابسططط", "suc");
  }
});

itemList.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
  if (e.target.classList.contains("check")) {
    if (e.target.checked) {
      displayAlert("يا سلااام التاسك خلص", "suc");
    } else {
      displayAlert("رجعت في كلامك يا فالح", "danger");
    }
    e.target.parentElement.parentElement.parentElement.classList.toggle("done");
  }
});
function displayAlert(t, c) {
  alertE.classList.add(`alert-${c}`);
  alertE.textContent = t;
  setTimeout(() => {
    alertE.textContent = "";
    alertE.classList.remove(`alert-${c}`);
  }, 1000);
}

function addToArr(text) {
  const item = {
    id: Date.now(),
    title: text,
    completed: false,
  };
  tasks.push(item);
  addEle();
}

function addEle(ele) {
  itemList.innerHTML = "";
  tasks.forEach(function (e) {
    let i = document.createElement("li");
    // btn delete
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete");
    // btn delete

    //done btn
    let doneBtn = document.createElement("label");
    doneBtn.setAttribute("type", "checkbox");
    doneBtn.className = "checkbox path";
    doneBtn.innerHTML = `<input class = "check" id="check" type="checkbox">
        <svg viewBox="0 0 21 21">
            <path
                d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186">
            </path>
        </svg>`;
    //done btn

    // div for text and check
    let div = document.createElement("div");
    div.classList.add("con");
    let p = document.createElement("p");
    p.textContent = e.title;
    div.append(doneBtn, p);
    // div for text and check

    // item add
    i.className = "item";
    i.setAttribute("data-id", e.id);
    i.appendChild(div);
    i.appendChild(deleteBtn);
    if (e.completed) {
      i.className = "item done";
    }
    itemList.appendChild(i);
    // item add
  });
}
