const itemInput = document.getElementById("item-input");
const priceInput = document.getElementById("price-input");
const addBtn = document.getElementById("add-btn");
const markBtn = document.getElementById("mark-btn");
const clearBtn = document.getElementById("clear-btn");
const list = document.getElementById("list");
const totalAll = document.getElementById("total-all");
const totalBought = document.getElementById("total-bought");
 

let items = JSON.parse(localStorage.getItem("shoppingItems")) || [];
 
function saveItems() {
    localStorage.setItem("shoppingItems", JSON.stringify(items));
}
 
function showList() {
    list.innerHTML = "";
    let total = 0;
    let boughtTotal = 0;
 
    items.forEach(function (item, index) {
        total = total + item.price;
        if (item.bought === true) {
            boughtTotal = boughtTotal + item.price;
        }
 
        const li = document.createElement("li");
        li.dataset.index = index; // remember the position in the array
 
        if (item.bought === true) {
            li.classList.add("done");
        }
 
        const text = document.createElement("span");
        text.textContent = item.name + " - Ksh " + item.price;
 
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
 
        li.appendChild(text);
        li.appendChild(editBtn);
        list.appendChild(li);
    });
 
    totalAll.textContent = total;
    totalBought.textContent = boughtTotal;
}

function addItem() {
    const name = itemInput.value.trim();
    const price = Number(priceInput.value);
 
    if (name === "" || priceInput.value === "") {
        alert("Please enter an item name and a price");
        return;
    }
 
    if (price < 0) {
        alert("Price cannot be negative");
        return;
    }
 
    const newItem = {
        name: name,
        price: price,
        bought: false
    };
 
    items.push(newItem);
    saveItems();
    showList();
 
    itemInput.value = "";
    priceInput.value = "";
}
 
addBtn.addEventListener("click", addItem);
 
markBtn.addEventListener("click", function () {
    items.forEach(function (item) {
        item.bought = true;
    });
    saveItems();
    showList();
});
 
clearBtn.addEventListener("click", function () {
    items = [];
    saveItems();
    showList();
});
 
list.addEventListener("click", function (event) {
    // find the li that was clicked
    const li = event.target.closest("li");
    if (li === null) {
        return;
    }
 
    const index = li.dataset.index;
 
    if (event.target.tagName === "BUTTON") {
        // the Edit button was clicked
        const newName = prompt("Edit item name:", items[index].name);
        if (newName === null) {
            return;
        }
        const newPrice = prompt("Edit price:", items[index].price);
        if (newPrice === null) {
            return;
        }
 
        if (newName.trim() !== "") {
            items[index].name = newName.trim();
        }
        if (newPrice.trim() !== "" && Number(newPrice) >= 0) {
            items[index].price = Number(newPrice);
        }
    } else {
        // somewhere else on the item was clicked, so mark / unmark it
        items[index].bought = !items[index].bought;
    }
 
    saveItems();
    showList();
});
 
showList();