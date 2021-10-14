let input = document.querySelector(".tex");
let addBtn = document.querySelector(".add");
let itemList = document.querySelector(".item-list");
let idCounter = 1;
let alertE = document.querySelector(".alert");
let clearAll = document.querySelector(".clear-all");
let clearDone = document.querySelector(".clear-done");
let btnDiv = document.querySelector(".btn-con");
let tasks = [];
if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}
localGet();
addBtn.addEventListener("click", function (e) {
  if (input.value === "") {
    displayAlert("يا أستاذ انت مكتبتش حاجه ", "danger");
  } else {
    let value = input.value;
    addToArr(value);
    displayAlert("ابسط يا عم ابسططط", "suc");
  }
  input.value = "";
});

itemList.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    deleteTask(e.target.parentElement.getAttribute("data-id"));
    checkClear();
  }
  if (e.target.classList.contains("check")) {
    if (e.target.checked) {
      displayAlert("يا سلااام التاسك خلص", "suc");
    } else {
      displayAlert("رجعت في كلامك يا فالح", "danger");
    }
    e.target.parentElement.parentElement.parentElement.classList.toggle("done");
    comSwitch(
      e.target.parentElement.parentElement.parentElement.getAttribute(
        "data-id"
      ),
      e.target
    );
  }
});

btnDiv.addEventListener("click", function (e) {
  if (e.target.classList.contains("clear-all")) {
    itemList.innerHTML = "";
    tasks = [];
    localSet(tasks);
    checkClear();
  }
  if (e.target.classList.contains("clear-done")) {
    tasks = tasks.filter(function (e) {
      return e.completed !== true;
    });
    addEle(tasks);
    localSet(tasks);
    checkClear();
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
  localSet(tasks);
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
    let doneInput = document.createElement("input");
    doneInput.className = "check";
    doneInput.setAttribute("id", "check");
    doneInput.setAttribute("type", "checkbox");
    doneBtn.setAttribute("type", "checkbox");
    doneBtn.className = "checkbox path";
    doneBtn.innerHTML = `
        <svg viewBox="0 0 21 21">
            <path
                d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186">
            </path>
        </svg>`;
    doneBtn.prepend(doneInput);
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
      doneInput.checked = true;
    }

    itemList.appendChild(i);
    // item add
    checkClear();
  });
}

function comSwitch(taskId, check) {
  for (i of tasks) {
    if (i.id == taskId) {
      console.log(i);
      if (i.completed === false) {
        i.completed = true;
        localSet(tasks);
      } else {
        i.completed = false;
        localSet(tasks);
      }
    }
  }
}

function check(result) {
  if (result === true) {
  }
}

function localSet(list) {
  localStorage.setItem("tasks", JSON.stringify(list));
}

function localGet() {
  let data = JSON.parse(localStorage.getItem("tasks"));
  if (data) {
    addEle(tasks);
  }
}

function deleteTask(id) {
  tasks = tasks.filter(function (e) {
    return e.id != id;
  });
  localSet(tasks);
}
function checkClear() {
  if (tasks.length > 0) {
    btnDiv.classList.add("show");
  } else {
    btnDiv.classList.remove("show");
  }
}
