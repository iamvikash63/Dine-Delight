import { FormatINR } from "../utils/format.js";

function getSafeText(value, fallback = "") {
  return String(value ?? fallback);
}

export function renderMenuUI({ container, items = [], onAddToCart } = {}) {
  if (!container) return;

  if (!Array.isArray(items) || items.length === 0) {
    container.innerHTML = `<p class="empty-menu">Menu is not available right now.</p>`;
    return;
  }

  container.innerHTML = items
    .map((item, index) => {
      const dishName = getSafeText(item?.name ?? item?.dish, `Dish ${index + 1}`);
      const dishPrice = Number(item?.price || 0);
      const dishImage = getSafeText(
        item?.image,
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
      );
      const dishDescription = getSafeText(
        item?.description,
        "Freshly prepared with premium ingredients."
      );

      return `
        <article class="dish-card">
          <img src="${dishImage}" alt="${dishName}" loading="lazy" />
          <h4>${dishName}</h4>
          <p>${dishDescription}</p>
          <div class="dish-footer">
            <span>${FormatINR(dishPrice)}</span>
            <button
              class="js-add-dish"
              type="button"
              data-name="${dishName.replace(/"/g, "&quot;")}"
              data-price="${dishPrice}"
            >
              Add
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  const addButtons = container.querySelectorAll(".js-add-dish");
  addButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const name = button.dataset.name || "Dish";
      const price = Number(button.dataset.price || 0);
      if (typeof onAddToCart === "function") {
        onAddToCart(name, price);
      }
    });
  });
}
