// search functionality

function searchRestaurants() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let cards = document.querySelectorAll(".restaurant-card");

  cards.forEach(card => {
    let name = card.getAttribute("data-name").toLowerCase();
    if (name.includes(input)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// filter


function applyFilters() {
  let ratingValue = document.getElementById("ratingFilter").value;
  let priceValue = document.getElementById("priceFilter").value;
  let cards = document.querySelectorAll(".restaurant-card");

  cards.forEach(card => {
    let rating = card.dataset.rating;
    let price = card.dataset.price;

    let ratingMatch = ratingValue === "" || rating >= ratingValue;
    let priceMatch = priceValue === "" || price === priceValue;

    card.style.display = (ratingMatch && priceMatch) ? "block" : "none";
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

    cartList.innerHTML = "";

    cart.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - ₹${item.price}`;
      cartList.appendChild(li);
    });

    totalPrice.textContent = total;
  }

