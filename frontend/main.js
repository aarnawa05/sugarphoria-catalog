class Item {
    constructor(name = "", category = "", price = 0, locations = []) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.locations = locations;
    }
}

const item_list = []; // Example item list
const locations = ["Dallas", "Denver"];
const categories = ["Chips", "Candy", "Chocolate", "Toys/Plushies", "Foreign"]

/** For testing: loads items from the psuedo DB to the frontend */
function loadItems() {
    fetch("http://localhost:8080/api/items")
        .then(response => response.json())
        .then(data => {
            console.log("Here is the list of items: %j", data);

            data.forEach(function (item) {
                console.log(`Name: ${item.name}, Category: ${item.category}, Price: ${item.price}, Locations: ${item.locations.join(", ")}`);
                item_list.push(new Item(item.name, item.category, item.price, item.locations));
            });
        })
        .catch(error => {
            console.error("Error fetching items:", error);
        });
}

loadItems();

function deleteLastItem() {
    fetch("http://localhost:8080/api/items", {
        method: 'DELETE',
    })
        .then(response => {
            if (response.ok) {
                console.log("Last item deleted successfully");
                // @todo: refresh item list
            } else {
                console.error("Failed to delete last item");
            }
        })
        .catch(error => {
            console.error("Error deleting last item:", error);
        });
}

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

function loadCategories() {
    const category_container = document.querySelector("#catDropdown")

    // console.log(category_container.children);

    categories.forEach((category) => {
        const catOption = document.createElement("option");
        catOption.value = category;
        catOption.textContent = category;

        category_container.appendChild(catOption);
    })
}

loadLocations();
loadCategories();

const itemName = document.querySelector("#itemName"); // string
const itemPrice = document.querySelector("#itemPrice"); // int
const category = document.querySelector("#catDropdown"); // string

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

    const price = parseFloat(itemPrice.value.trim());
    const catVal = category.value.trim();

    console.log(locationSelections);
    const locations = Array.from(locationSelections)
        .filter(box => box.checked) // Filter only checked checkboxes
        .map(input => input.value); // Get the value of each checked checkbox

    // todo: validate inputs before adding

    // check if name is valid
    // check if price is not negative
    // check if category is valid

    console.log("Added item: ");
    console.log(`Name: ${name}, Price: ${price}, Category: ${catVal}, Locations: ${locations}`);

    new_Item = new Item(name, catVal, price, locations);
    console.log(JSON.stringify(new_Item));
    fetch("http://localhost:8080/api/items", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(new Item(name, catVal, price, locations))
    })
        .then(response => { response.json() })
        .then(data => {
            console.log("Item added successfully:", data);

            // Clear fields after adding the item
            itemName.value = '';
            itemPrice.value = '';
            category.value = '';
            locationSelections.forEach(box => box.checked = false); // Uncheck all checkboxes
        })
        .catch(error => {
            console.error("Error adding item:", error);
        });
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
