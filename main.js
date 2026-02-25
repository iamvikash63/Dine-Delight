import { getCurrentLocation, reverseGeocode } from "./services/locationServices.js";
import { loadRestaurants } from "./services/restaurantServices.js";
import { renderRestaurants } from "./ui/restaurantUI.js";

let currentRestaurants = [];

async function getlocation() {
  const input = document.getElementById("location-input");
  if (!input) return;

  try {
    input.value = "Detecting location...";
    const coords = await getCurrentLocation();
    const area = await reverseGeocode(coords.latitude, coords.longitude);
    input.value = area;
  } catch (error) {
    input.value = "Unable to fetch location";
  }
}


 export function OpenRestaurant(id) {
  localStorage.setItem("selectedRestaurant", String(id));
  window.location.href = "restaurant-detail.html";
}

// function searchRestaurants() {
//   const inputEl = document.getElementById("searchInput");
//   if (!inputEl) return;

//   const input = inputEl.value.toLowerCase();
//   const cards = document.querySelectorAll(".restaurant-card");

//   cards.forEach((card) => {
//     const name = (card.getAttribute("data-name") || "").toLowerCase();
//     card.style.display = name.includes(input) ? "block" : "none";
//   });
// }

// function applyFilters() {
//   const ratingEl = document.getElementById("ratingFilter");
//   const priceEl = document.getElementById("priceFilter");
//   if (!ratingEl || !priceEl) return;

//   const ratingValue = ratingEl.value;
//   const priceValue = priceEl.value;
//   const cards = document.querySelectorAll(".restaurant-card");

//   cards.forEach((card) => {
//     const rating = Number(card.dataset.rating || 0);
//     const price = Number(String(card.dataset.price || "").replace(/[^\d.]/g, "")) || 0;
//     const selectedRating = Number(ratingValue || 0);
//     const selectedPrice = Number(priceValue || 0);

//     const ratingMatch = ratingValue === "" || rating >= selectedRating;
//     const priceMatch = priceValue === "" || price <= selectedPrice;

//     card.style.display = ratingMatch && priceMatch ? "block" : "none";
//   });
// }

async function init() {
  currentRestaurants = await loadRestaurants();
  renderRestaurants(currentRestaurants);
  await getlocation();
}

document.addEventListener("DOMContentLoaded", init);

// Expose handlers globally because index.html uses inline attributes.
if (typeof window !== "undefined") {
  window.Geolocation = getlocation;
  // window.searchRestaurants = searchRestaurants;
  // window.applyFilters = applyFilters;
  window.OpenRestaurant = OpenRestaurant;
}
