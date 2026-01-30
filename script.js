// geolocation search restaurant based on ther location
window.onload = getlocation;

function getlocation(){
  const input = document.getElementById("location-input");


  if(navigator.geolocation){
    input.value="detecting location...";
    navigator.geolocation.getCurrentPosition(showPosition,showError);
    
  }else{
    alert("geolocation is not supported by this browser.");
  }


}

function showPosition(position){
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;

  console.log("Latitude:", lat);
  console.log("Longitude:", lng);

  fetchRestaurants(lat, lng);


}

function showError(error) {
  alert("Location access denied.");
}


// fetch restaurants data 

async function fetchRestaurants(lat,lng) {

  const input = document.getElementById("location-input");

  try{
    const locResponse=await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);

    const data = await locResponse.json();

    const area =
      data.address.suburb ||
      data.address.city ||
      data.address.town ||
      data.address.village;

    input.value = area || "Location found";
  
  } catch (error) {
    input.value = "Unable to fetch location";
  }

  

  const response= await fetch("restaurants.json");
  const data = await response.json();

console.log(data);
  //save restaurants data in local storage 
  localStorage.setItem("restaurants", JSON.stringify(data));


  displayRestaurants(data);
}


// Display Reaturants details dynamicaly in html


function displayRestaurants(restaurants){
  const restaurantContainer = document.getElementById("restaurantGrid");
  restaurantContainer.innerHTML = "";
  restaurants.forEach(rest =>{
    restaurantContainer.innerHTML += `
      <div class="restaurant-card" data-name="${rest.name}" data-rating="${rest.rating}" data-price="${rest.price}" onclick="OpenRestaurant(${rest.id})">
        <img src="${rest.image}" alt="${rest.name}" />
        <div class="card-body">
          <h3>${rest.name}</h3>
          <p class="rating">⭐ ${rest.rating}</p>
          <p class="avg-rest-price">Starting Just @₹${rest.price}</p>
          <p class="Res-location"><i class="fa-solid fa-location-dot"></i>${rest.location}</p>
          
        </div>
      </div>
    `;
  });


}

// Open Restaurants by id 
function OpenRestaurant(id){
localStorage.setItem("selectedRestaurant",id);
window.location.href="restaurant-detail.html";
}


// Try to load restaurants from localStorage on page load
const storedRestaurants = localStorage.getItem("restaurants");
if (storedRestaurants) {
  displayRestaurants(JSON.parse(storedRestaurants));
}






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

    totalPrice.textContent = `₹${total}`;
  }

