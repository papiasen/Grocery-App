import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: "https://playing-around-17c5e-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const getYourGroceryinDB = ref(database, "groceryList")


const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const groceryList = document.getElementById("grocery-list")

addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value
    push(getYourGroceryinDB, inputValue)
    clearInputField()
})


onValue(getYourGroceryinDB, function (snapshot) {


    if (snapshot.exists()) {

        let itemsArray = Object.entries(snapshot.val())
        console.log(itemsArray)

        clearGroceryList()

        for (let i = 0; i < itemsArray.length; i++) {

            let currentItem = itemsArray[i]

            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            groceryListValues(currentItem)
        }
    } else {
        groceryList.innerHTML = `<p> No items here... yet </p>`
    }



})


function clearGroceryList() {
    groceryList.innerHTML = ""
}


function clearInputField() {
    inputFieldEl.value = ""
}


function groceryListValues(item) {
    // groceryList.innerHTML += `<li>${itemValue}</li>`

    // console.log(item)

    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", function () {
        let exactLocationOfItemInDB = ref(database, `groceryList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    groceryList.append(newEl)
}