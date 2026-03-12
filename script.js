import { loadRestaurants, getRestaurantById } from "./services/restaurantServices.js";
import { renderRestaurantDetailUI } from "./ui/restaurantDetailUI.js";
import { addToCart } from "./ui/cartUI.js";

async function initRestaurantDetailPage() {
  const detailContainer = document.getElementById("restaurant-detail");
  const menuContainer = document.getElementById("menu");
  if (!detailContainer || !menuContainer) return;

  const selectedRestaurantId = localStorage.getItem("selectedRestaurant");
  console.log(selectedRestaurantId);
  if (!selectedRestaurantId) {
    detailContainer.innerHTML = "<p>Please select a restaurant from the home page.</p>";
    return;
  }

  try {
    const restaurants = await loadRestaurants();
    const restaurant = getRestaurantById(selectedRestaurantId, restaurants);

    renderRestaurantDetailUI({
      detailContainer,
      menuContainer,
      restaurant,
      onAddToCart: addToCart
    });
  } catch (error) {
    detailContainer.innerHTML = "<p>Unable to load restaurant details.</p>";
    menuContainer.innerHTML = "";
  }
}

window.addEventListener("DOMContentLoaded", initRestaurantDetailPage);
