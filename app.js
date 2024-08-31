import { handleScroll } from "./headerScroll.js";
import { fetchProducts } from "./fetchProducts.js";
const searchInput = document.getElementById("search-input");
const productsContainer = document.getElementById("products-container");
const showMoreButton = document.getElementById("show-more-button");

let allProducts = [];
let displayedProducts = [];
let productsPerPage = 9;
let currentIndex = 0;

// Initialize scroll effect
handleScroll();

// Function to display products
function displayProducts(products) {
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description.substring(0, 100)}...</p>
        `;
    productsContainer.appendChild(productCard);
  });
}

// Fetch and display initial products on page load
async function init() {
  allProducts = await fetchProducts();
  loadMoreProducts();
}

// Function to load more products when "Show More" is clicked
function loadMoreProducts() {
  const nextProducts = allProducts.slice(
    currentIndex,
    currentIndex + productsPerPage
  );
  displayProducts(nextProducts);
  currentIndex += productsPerPage;

  if (currentIndex >= allProducts.length) {
    showMoreButton.style.display = "none";
  } else {
    showMoreButton.style.display = "block";
  }
}

// Filter products based on search input
function filterProducts() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );

  // Reset the container and indices when filtering
  productsContainer.innerHTML = "";
  displayedProducts = [];
  currentIndex = 0;

  allProducts = filteredProducts;
  loadMoreProducts();
}

searchInput.addEventListener("input", filterProducts);
showMoreButton.addEventListener("click", loadMoreProducts);

init();

document.getElementById("burger-menu").addEventListener("click", function () {
  document.getElementById("nav-menu").classList.toggle("active");
});
