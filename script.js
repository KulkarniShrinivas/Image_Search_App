// API access key for Unsplash
const accessKey = "MxctctpEbIcBNHGkDwKVrj8sAeIV3yQNYgU-RndRvUc";

// DOM elements
const formE1 = document.querySelector("form");
const inputE1 = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

// Variables to track input data and pagination
let inputData = "";
let page = 1;

// Asynchronous function to fetch and display search results
async function searchImages() {
    // Retrieve input value
    inputData = inputE1.value;

    // Construct the URL for the Unsplash API
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    // Fetch data from the API
    const response = await fetch(url);
    const data = await response.json();

    // Extract results from the response
    const results = data.results;

    // Clear search results if it's the first page
    if (page == 1) {
        searchResults.innerHTML = "";
    }

    // Iterate over the results and create HTML elements for each image
    results.map((result) => {
        // Create elements
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;  // Link to the Unsplash page for the image
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        // Append child elements to the searchResults container
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    // Increment the page number for the next search
    page++;

    // Show the "Show More" button if it's not the first page
    if (page > 1) {
        showMore.style.display = "block";
    }
}

// Event listener for the form submission
formE1.addEventListener("submit", (event) => {
    event.preventDefault();
    // Reset the page number to 1 and initiate a new search
    page = 1;
    searchImages();
});

// Event listener for the "Show More" button
showMore.addEventListener("click", (event) => {
    event.preventDefault();
    // Initiate a new search to fetch more results
    searchImages();
});
