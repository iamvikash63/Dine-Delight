import { FormatINR } from "../utils/format.js";
import { renderMenuUI } from "./menuUI.js";

function renderCuisineBadges(restaurant) {
  const types = Array.isArray(restaurant?.restaurantTypes)
    ? restaurant.restaurantTypes
    : [
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
  const offerText = Array.isArray(restaurant?.offers)
    ? restaurant.offers[0]
    : restaurant?.offers;
  if (!offerText) return "";
  return `
    <div class="badges">
      <span><i class="fa-solid fa-tag"></i> ${offerText}</span>
    </div>
  `;
}

function getLocationText(restaurant) {
  if (typeof restaurant?.location === "object") {
    return [restaurant.location?.area, restaurant.location?.city].filter(Boolean).join(", ");
  }
  return restaurant?.location || "Location not available";
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

  const rating = Number(restaurant.rating || 0).toFixed(1);
  const locationText = getLocationText(restaurant);
  const deliveryText = restaurant.deliveryTime || restaurant.prepTime || "20-30 mins";
  const menuItems = restaurant.menuItems || restaurant.menu || [];
  const cuisineCount = Array.isArray(restaurant?.restaurantTypes) ? restaurant.restaurantTypes.length : 0;
  const isOpenNow = restaurant?.isOpen !== false;
  const aboutText =
    restaurant.description ||
    restaurant.about ||
    "No description available yet.";

  detailContainer.innerHTML = `
    <div class="detail-intro">
      <p class="detail-eyebrow">Restaurant Profile</p>
      <h1>${restaurant.name} Menu, Reviews & Ordering</h1>
      <p>
        Check chef highlights, delivery estimate, offers and top dishes before placing your order.
      </p>
      <div class="intro-points">
        <span><i class="fa-solid fa-circle-check"></i> Trusted partner on DineDelight</span>
        <span><i class="fa-solid fa-headset"></i> Customer support throughout your order</span>
      </div>
    </div>
    <div class="hero-card">
      <div class="res-detail-img">
        <img src="${restaurant.image}" class="restaurant-img" alt="${restaurant.name}" />
      </div>
      <div class="restaurant-info">
        <h2>${restaurant.name}</h2>
        <p class="about">${aboutText}</p>
        <p class="address"><i class="fa-solid fa-location-dot"></i> ${locationText}</p>
        <div class="quick-facts">
          <article>
            <small>Guest Rating</small>
            <strong>${rating} <i class="fa-solid fa-star"></i></strong>
          </article>
          <article>
            <small>Delivery ETA</small>
            <strong>${deliveryText}</strong>
          </article>
          <article>
            <small>Cost For Two</small>
            <strong>${FormatINR(restaurant.priceForTwo ?? restaurant.price ?? 0)}</strong>
          </article>
          <article>
            <small>Popular Cuisines</small>
            <strong>${cuisineCount || 1}+</strong>
          </article>
        </div>
        <div class="badges">
          <span class="${isOpenNow ? "open" : "closed"}">
            <i class="fa-solid ${isOpenNow ? "fa-circle-check" : "fa-circle-xmark"}"></i>
            ${isOpenNow ? "Open Now" : "Currently Closed"}
          </span>
          <span><i class="fa-solid fa-star"></i> ${rating}</span>
          <span><i class="fa-solid fa-indian-rupee-sign"></i> Starting ${FormatINR(restaurant.priceForTwo ?? restaurant.price ?? 0)}</span>
          <span><i class="fa-regular fa-clock"></i> ${deliveryText}</span>
        </div>
        ${renderCuisineBadges(restaurant)}
        ${renderOffersBadge(restaurant)}
        <div class="actions">
          <button class="btn primary js-view-menu" type="button">View Menu</button>
          <button class="btn outline js-get-direction" type="button">Get Direction</button>
          <button class="btn outline" type="button">Pay Bill</button>
        </div>
      </div>
    </div>
  `;

  renderMenuUI({
    container: menuContainer,
    items: menuItems,
    onAddToCart
  });

  const viewMenuButton = detailContainer.querySelector(".js-view-menu");
  viewMenuButton?.addEventListener("click", () => {
    menuContainer.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  const directionButton = detailContainer.querySelector(".js-get-direction");
  directionButton?.addEventListener("click", () => {
    const mapsQuery = encodeURIComponent(`${restaurant.name} ${locationText}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`, "_blank", "noopener");
  });
}
