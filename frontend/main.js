function searchEntered() {
    console.log("searchEntered called");

    // Get the search input value
    const searchInput = document.getElementById("itemSearchInput");
    const searchValue = searchInput.value.trim();
    console.log("Searched for:", searchValue);
}