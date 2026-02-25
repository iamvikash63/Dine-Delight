import { FormatINR } from "../utils/format.js";
import { renderMenuUI } from "./menuUI.js";

function renderCuisineBadges(restaurant) {
  const types = [
    restaurant?.restype1,
    restaurant?.restype2,
    restaurant?.restype3,
    restaurant?.restype4
  ].filter(Boolean);

  if (!types.length) return "";

  return `
    <div class="badges">
      ${types.map((type) => `<span>${type}</span>`).join("")}
    </div>
  `;
}

function renderOffersBadge(restaurant) {
  if (!restaurant?.offers) return "";
  return `
    <div class="badges">
      <span><i class="fa-solid fa-tag"></i> ${restaurant.offers}</span>
    </div>
  `;
}

export function renderRestaurantDetailUI({
  detailContainer,
  menuContainer,
  restaurant,
  onAddToCart
} = {}) {
  if (!detailContainer || !menuContainer) return;

  if (!restaurant) {
    detailContainer.innerHTML = "<p>Restaurant not found.</p>";
    menuContainer.innerHTML = "";
    return;
  }

  detailContainer.innerHTML = `
    <h1>Explore Your Favorite Restaurants</h1>
    <div class="hero-card">
      <div class="res-detail-img">
        <img src="${restaurant.image}" class="restaurant-img" alt="${restaurant.name}" />
      </div>
      <div class="restaurant-info">
        <h2>${restaurant.name}</h2>
        <p class="about">${restaurant.about || "No description available yet."}</p>
        <p class="address"><i class="fa-solid fa-location-dot"></i> ${restaurant.location || "Location not available"}</p>
        <div class="badges">
          <span class="open"><i class="fa-solid fa-circle-check"></i> Open Now</span>
          <span><i class="fa-solid fa-star"></i> ${Number(restaurant.rating || 0).toFixed(1)}</span>
          <span>Starting ${FormatINR(restaurant.price)}</span>
          <span><i class="fa-regular fa-clock"></i> ${restaurant.prepTime || "20-30 mins"}</span>
        </div>
        ${renderCuisineBadges(restaurant)}
        ${renderOffersBadge(restaurant)}
        <div class="actions">
          <button class="btn primary" type="button">View Menu</button>
          <button class="btn outline" type="button">Get Direction</button>
          <button class="btn outline" type="button">Pay Bill</button>
        </div>
      </div>
    </div>
  `;

  renderMenuUI({
    container: menuContainer,
    items: restaurant.menu,
    onAddToCart
  });
}
