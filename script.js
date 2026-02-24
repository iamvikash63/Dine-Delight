import { FormatINR } from "./utils/format.js";
import { saveToStorage } from "./utils/storage.js";
import { getfromStorage } from "./utils/storage.js";


// Geolocation search restaurant based on current location
getlocation();

function getlocation() {
  const input = document.getElementById("location-input");
  if (!input) return;

  if (navigator.geolocation) {
    input.value = "Detecting location...";
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;

  console.log("Latitude:", lat);
  console.log("Longitude:", lng);

  fetchRestaurants(lat, lng);
}

function showError() {
  alert("Location access denied.");
}

// Fetch restaurants data
async function fetchRestaurants(lat, lng) {
  const input = document.getElementById("location-input");

  try {
    const locResponse = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const data = await locResponse.json();

    const area =
      data.address.suburb ||
      data.address.city ||
      data.address.town ||
      data.address.village;

    if (input) input.value = area || "Location found";
  } catch (error) {
    if (input) input.value = "Unable to fetch location";
  }

  const response = await fetch("restaurants.json");
  const data = await response.json();
saveToStorage("restaurants",data);
  // localStorage.setItem("restaurants", JSON.stringify(data));
  displayRestaurants(data);
}

// Display restaurants on index page
function displayRestaurants(restaurants) {
  const restaurantContainer = document.getElementById("restaurantGrid");
  if (!restaurantContainer) return;

  const cardHtml = restaurants.map((rest) => {
    const cuisines = [rest.restype1, rest.restype2].filter(Boolean).join(" | ") || "Multi Cuisine";
    const menuCount = Array.isArray(rest.menu) ? rest.menu.length : 0;
    const aboutText = (rest.about || "Freshly prepared meals from trusted kitchens.").slice(0, 88);
    const rating = Number(rest.rating || 0).toFixed(1);

    return `
      <article
        class="restaurant-card"
        data-name="${rest.name}"
        data-rating="${rest.rating}"
        data-price="${rest.price}"
        onclick="OpenRestaurant(${rest.id})"
        role="button"
        tabindex="0"
        onkeydown="if(event.key==='Enter'){OpenRestaurant(${rest.id})}"
      >
        <div class="restaurant-media">
          <img src="${rest.image}" alt="${rest.name}" loading="lazy" />
          ${rest.offers ? `<span class="offer-badge">${rest.offers}</span>` : ""}
          <span class="prep-time-chip"><i class="fa-regular fa-clock"></i> ${rest.prepTime || "25 min"}</span>
        </div>

        <div class="card-body">
          <div class="card-head">
            <h3>${rest.name}</h3>
            <span class="rating-pill"><i class="fa-solid fa-star"></i> ${rating}</span>
          </div>

          <p class="card-cuisine">${cuisines}</p>
          <p class="card-about">${aboutText}${aboutText.endsWith(".") ? "" : "..."}</p>

          <div class="card-meta">
            <span><i class="fa-solid fa-location-dot"></i> ${rest.location}</span>
            <span><i class="fa-solid fa-indian-rupee-sign"></i> Starts ${FormatINR(rest.price)}</span>
            <span><i class="fa-solid fa-utensils"></i> ${menuCount} menu items</span>
          </div>

          <div class="card-footer">
            <span class="service-tag">Delivery</span>
            <span class="service-tag">Takeaway</span>
            <span class="view-action">View Details <i class="fa-solid fa-arrow-right"></i></span>
          </div>
        </div>
      </article>
    `;
  });

  restaurantContainer.innerHTML = cardHtml.join("");
}

// Open restaurant by id
function OpenRestaurant(id) {
  localStorage.setItem("selectedRestaurant", String(id));
  window.location.href = "restaurant-detail.html";
}

// function formatINR(value) {
//   return `\u20B9${Number(value || 0).toLocaleString("en-IN")}`;
// }

function renderCuisineBadges(restaurant) {
  const types = [
    restaurant.restype1,
    restaurant.restype2,
    restaurant.restype3,
    restaurant.restype4
  ].filter(Boolean);

  if (!types.length) return "";
  return `
    <div class="badges">
      ${types.map((type) => `<span>${type}</span>`).join("")}
    </div>
  `;
}

function renderOffersBadges(restaurant) {
  if (!restaurant.offers) return "";
  return `
    <div class="badges">
      <span><i class="fa-solid fa-tag"></i> ${restaurant.offers}</span>
    </div>
  `;
}

async function renderRestaurantDetail() {
  const detailEl = document.getElementById("restaurant-detail");
  if (!detailEl) return;

  let restaurants = JSON.parse(localStorage.getItem("restaurants") || "[]");
  const openResid = localStorage.getItem("selectedRestaurant");

  if (!restaurants.length) {
    try {
      const response = await fetch("restaurants.json");
      restaurants = await response.json();
      localStorage.setItem("restaurants", JSON.stringify(restaurants));
    } catch (e) {
      detailEl.innerHTML = "<p>Unable to load restaurant data.</p>";
      return;
    }
  }

  const restaurant = restaurants.find((r) => String(r.id) === String(openResid));
  if (!restaurant) {
    detailEl.innerHTML = "<p>Restaurant not found.</p>";
    return;
  }

  detailEl.innerHTML = `
    <h1>Explore Your Favorite Restaurants</h1>
    <div class="hero-card">
      <div class="res-detail-img">
        <img src="${restaurant.image}" class="restaurant-img" alt="${restaurant.name}" />
      </div>
      <div class="restaurant-info">
        <h2>${restaurant.name}</h2>
        <p class="about">${restaurant.about || "No description available yet."}</p>
        <p class="address"><i class="fa-solid fa-location-dot"></i>${restaurant.location || "Location not available"}</p>
        <div class="badges">
          <span class="open"><i class="fa-solid fa-circle-check"></i> Open Now</span>
          <span><i class="fa-solid fa-star"></i> ${restaurant.rating}</span>
          <span>Starting ${FormatINR(restaurant.price)}</span>
          <span><i class="fa-regular fa-clock"></i> ${restaurant.prepTime || "20-30 mins"}</span>
        </div>
        ${renderCuisineBadges(restaurant)}
        ${renderOffersBadges(restaurant)}
        <div class="actions">
          <button class="btn primary">View Menu</button>
          <button class="btn outline">Get Direction</button>
          <button class="btn outline">Pay Bill</button>
        </div>
      </div>
    </div>
  `;

  const menuDiv = document.getElementById("menu");
  if (!menuDiv || !Array.isArray(restaurant.menu)) return;

  menuDiv.innerHTML = "";
  restaurant.menu.forEach((item) => {
    const dishName = item.dish || "Dish";
    const dishPrice = Number(item.price || 0);
    menuDiv.innerHTML += `
      <div class="dish-card">
        <img src="${item.image}" alt="${dishName}" />
        <h4>${dishName}</h4>
        <p>${item.description || "Freshly prepared with premium ingredients."}</p>
        <div class="dish-footer">
          <span>${FormatINR(dishPrice)}</span>
          <button onclick="addToCart('${dishName.replace(/'/g, "\\'")}', ${dishPrice})">Add</button>
        </div>
      </div>
    `;
  });
}

// Load restaurants from localStorage on page load
const storedRestaurants = localStorage.getItem("restaurants");
if (storedRestaurants) {
  displayRestaurants(JSON.parse(storedRestaurants));
}

window.addEventListener("DOMContentLoaded", () => {
  renderRestaurantDetail();
});

// Search functionality
function searchRestaurants() {
  const inputEl = document.getElementById("searchInput");
  if (!inputEl) return;

  const input = inputEl.value.toLowerCase();
  const cards = document.querySelectorAll(".restaurant-card");

  cards.forEach((card) => {
    const name = (card.getAttribute("data-name") || "").toLowerCase();
    card.style.display = name.includes(input) ? "block" : "none";
  });
}

// Filter functionality
function applyFilters() {
  const ratingEl = document.getElementById("ratingFilter");
  const priceEl = document.getElementById("priceFilter");
  if (!ratingEl || !priceEl) return;

  const ratingValue = ratingEl.value;
  const priceValue = priceEl.value;
  const cards = document.querySelectorAll(".restaurant-card");

  cards.forEach((card) => {
    const rating = Number(card.dataset.rating || 0);
    const price = Number(String(card.dataset.price || "").replace(/[^\d.]/g, "")) || 0;
    const selectedRating = Number(ratingValue || 0);
    const selectedPrice = Number(priceValue || 0);

    const ratingMatch = ratingValue === "" || rating >= selectedRating;
    const priceMatch = priceValue === "" || price <= selectedPrice;

    card.style.display = ratingMatch && priceMatch ? "block" : "none";
  });
}

let cart = [];
let total = 0;

function addToCart(name, price) {
  cart.push({ name, price });
  total += price;
  renderCart();
}

function renderCart() {
  const cartList = document.getElementById("cartItems");
  const totalPrice = document.getElementById("totalPrice");
  if (!cartList || !totalPrice) return;

  cartList.innerHTML = "";
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${FormatINR(item.price)}`;
    cartList.appendChild(li);
  });

  totalPrice.textContent = FormatINR(total);
}

// Expose functions globally because index.html uses inline onclick handlers
if (typeof window !== "undefined") {
  window.OpenRestaurant = OpenRestaurant;
  window.getlocation = getlocation;
  window.applyFilters = applyFilters;
  window.searchRestaurants = searchRestaurants;
  window.addToCart = addToCart;
}
