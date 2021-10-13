let input = document.querySelector(".tex");
let addBtn = document.querySelector(".add");
let itemList = document.querySelector(".item-list");
let idCounter = 1;
let alertE = document.querySelector(".alert");
// let clearBtn = document.querySelector(".delete");
addBtn.addEventListener("click", function (e) {
  if (input.value === "") {
    displayAlert("يا أستاذ انت مكتبتش حاجه ", "danger");
  } else {
    let deletBtn = document.createElement("button");
    deletBtn.classList.add("delete");
    deletBtn.textContent = "Delete";

    let item = document.createElement("li");
    let task = document.createElement("p");
    item.classList.add("item");
    item.setAttribute("id", `item ${idCounter++}`);
    item.appendChild(task);
    item.appendChild(deletBtn);

    let valueInput = input.value;
    task.textContent = valueInput;
    itemList.appendChild(item);
    input.value = "";
    displayAlert("ابسط يا عم ابسططط", "suc");

    deletBtn.addEventListener("click", function (e) {
      let removeItem = document.getElementById(
        e.currentTarget.parentElement.getAttribute("id")
      );
      displayAlert("اتمسحت خلاص", "suc");

      itemList.removeChild(item);
    });
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
