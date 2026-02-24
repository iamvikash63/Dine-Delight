import { FormatINR } from "../utils/format.js";

export function renderRestaurants(restaurants){
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