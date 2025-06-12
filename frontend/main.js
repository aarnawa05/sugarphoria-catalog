class Item {
    constructor(name = "", category = "", price = 0, location = []) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.location = location;
    }
}

const item_list = [new Item("Nerds", "test", 10.99, [])]; // Example item list
const locations = ["Dallas", "Denver", "Seattle"];

/** Get the locations from the location list and add it as options to the DOM */
function loadLocations() {
    const location_container = document.querySelector(".locations");
    // console.log(location_container.children);

    locations.forEach((location) => {
        const locationElement = document.createElement("div");
        locationElement.classList.add("location-option");
        locationElement.innerHTML = `
            <label for="${location}">${location}</label>
            <input type="checkbox" name="locations" value="${location}" id="${location}">
            `;
        location_container.appendChild(locationElement);
    })
}

loadLocations();

const itemName = document.querySelector("#itemName"); // string
const itemPrice = document.querySelector("#itemPrice"); // int
const category = document.querySelector("#itemCategory"); // string

// get locations from checked checkboxes
const locationSelections = document.querySelectorAll('.locations input[name="locations"]'); // NodeList of checkboxes

/** 
 * Function to add new item to the catalog
 */
const addItemEntered = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log("Add Item has been called");

    // Get the values from the input fields
    const name = itemName.value.trim();

    //
    const price = parseFloat(itemPrice.value.trim());
    const catVal = category.value.trim();

    console.log(locationSelections);
    const locations = Array.from(locationSelections)
        .filter(box => box.checked) // Filter only checked checkboxes
        .map(input => input.value); // Get the value of each checked checkbox


    console.log(`Name: ${name}, Price: ${price}, Category: ${catVal}, Locations: ${locations}`);
    item_list.push(new Item(name, category, price, locations));
}

const searchInput = document.querySelector("#itemSearchInput");

/**
 * Function to get the name value input in the function
 */
const searchEntered = (e) => {
    console.log("Search has been entered");

    // Get the search input value
    const searchValue = searchInput.value.trim().toLowerCase();
    console.log(`Searching for: ${searchValue}`);

    let itemFound = null;
    // Find name of the item in item list
    for (let i = 0; i < item_list.length; i++) {
        // console.log(item_list[i].name);
        if (item_list[i].name.toLowerCase() === searchValue) {
            itemFound = item_list[i];
            break;
        }
    }

    console.log(itemFound);
}

const searchSubmitButton = document.querySelector("#searchButton");
const addNewItemButton = document.querySelector("#addItemBtn");

addNewItemButton.addEventListener('click', addItemEntered);
searchSubmitButton.addEventListener('submit', searchEntered);
