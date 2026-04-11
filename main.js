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



// %%%%%%%%%% Popup Search location %%%%%%%%%%%%
const loginBtn = document.querySelector('.login-btn');
const searchBtn = document.querySelector('#Search-res');
const locationBtn = document.querySelector('#Search-id');

const locationPopup = document.querySelector('.Search-location-popup');
const loginPopup = document.querySelector('.login-with-otp-container');


function openPopup(container, html){
  [locationPopup, loginPopup].forEach((popup) => {
    if (popup && popup !== container) {
      popup.style.display = "none";
      popup.style.opacity = "0";
    }
  });

  container.innerHTML=html;
  container.style.display="block";
  container.style.opacity="1";
  document.body.style.overflow="hidden";

  const closeBtn=container.querySelector('.Popup-Cross');
  if(closeBtn){
     closeBtn.style.cursor = "pointer";
     closeBtn.addEventListener('click', () => {
      container.style.display = "none";
      document.body.style.overflow = "auto";
    });
  }

}




// attribute for indent inner html
const locationPopupHtml=`
      <div class="Search-loc-heading">
        <h3>Search Location</h3>
        <i class="fa-solid fa-xmark Popup-Cross"></i>
      </div>
       <div class="search-item popup-search search-popup-input">
        <span class="icon"><i class="fa-solid fa-location-dot"></i></span>
        <input type="text" id="location-input" placeholder="Detecting your location..." />
        
      </div>
      <div class="Use-yr-crrnt-loc">
        <p> <i class="fa-solid fa-location-dot"></i> Use Current Location</p>
      </div>
      <div class="Popular-cities">
        <h4>Popular Cities</h4>
        <div class="Cities-Container">

          <div class="Cities">
            <a href="#" style="text-decoration: none; color: #f26419;">
            <img src="./images/Cities-img/delhi-ncr-26.avif" alt="mumbai">
            <p>Delhi NCR</p>
            </a>
          </div>

          <div class="Cities">
            <a href="" style= "text-decoration: none; color: #f26419;">
            <img src="./images/Cities-img/mumbai-26.png" alt="mumbai">
            <p>Mumbai</p>
            </a>
          </div>

          <div class="Cities">
            <a href="" style= "text-decoration: none; color: #f26419;">
            <img src="./images/Cities-img/bengaluru-26.avif" alt="mumbai">
            <p>Bengakuru</p>
            </a>
          </div>

          <div class="Cities">
            <a href="" style= "text-decoration: none; color: #f26419;">
            <img src="./images/Cities-img/chennai-26.avif" alt="mumbai">
            <p>Chennai</p>
            </a>
          </div>

          <div class="Cities">
            <a href="" style= "text-decoration: none; color: #f26419;">
            <img src="./images/Cities-img/agra-26.avif" alt="mumbai">
            <p>Agra</p>
            </a>
          </div>

          <div class="Cities">
            <a href="" style= "text-decoration: none; color: #f26419;">
            <img src="./images/Cities-img/dubai-26.avif" alt="mumbai">
            <p>Dubai</p>
            </a>
          </div>

          <div class="Cities">
            <a href="" style= "text-decoration: none; color: #f26419;">
            <img src="./images/Cities-img/abu-dhabi-26.avif" alt="mumbai">
            <p>Abu-Dhabi</p>
            </a>
          </div>

          <div class="Cities">
            <a href="" style= "text-decoration: none; color: #f26419;">
            <img src="./images/Cities-img/ahmedabad-26.avif" alt="mumbai">
            <p>Ahmedabad</p>
            </a>
          </div>

          <div class="Cities">
            <a href="" style= "text-decoration: none; color: #f26419;">
            <img src="./images/Cities-img/amritsar-26.avif" alt="mumbai">
            <p>Amritsar</p>
            </a>
          </div>

          <div class="Cities">
            <a href="" style= "text-decoration: none; color: #f26419;">
            <img src="./images/Cities-img/chandigarh-tricity-26.avif" alt="mumbai">
            <p>Chandigarh</p>
            </a>
          </div>

          <div class="Cities">
            <a href="" style= "text-decoration: none; color: #f26419;">
            <img src="./images/Cities-img/lucknow-26.avif" alt="mumbai">
            <p>Lucknow</p>
            </a>
          </div>

          <div class="Cities">
            <a href="" style= "text-decoration: none; color: #f26419;">
            <img src="./images/Cities-img/nagpur-26.avif" alt="mumbai">
            <p>Nagpur</p>
            </a>
          </div>

           <div class="Cities">
            <a href="" style= "text-decoration: none; color: #f26419;">
            <img src="./images/Cities-img/vadodara-26.avif" alt="mumbai">
            <p>Vdodara</p>
            </a>
          </div>

           <div class="Cities">
            <a href="" style= "text-decoration: none; color: #f26419;">
            <img src="./images/Cities-img/ranchi-26.avif" alt="mumbai">
            <p>Ranchi</p>
            </a>
          </div>

           <div class="Cities">
            <a href="" style= "text-decoration: none; color: #f26419;">
            <img src="./images/Cities-img/goa-26.avif" alt="mumbai">
            <p>Goa</p>
            </a>
          </div>

           <div class="Cities">
            <a href="" style= "text-decoration: none; color: #f26419;">
            <img src="./images/Cities-img/kochi-26.avif" alt="mumbai">
            <p>Kochi</p>
            </a>
          </div>

           <div class="Cities">
            <a href="" style= "text-decoration: none; color: #f26419;">
            <img src="./images/Cities-img/kolkata-26.avif" alt="mumbai">
            <p>Kolkata</p>
            </a>
          </div>

           <div class="Cities">
            <a href="" style= "text-decoration: none; color: #f26419;">
            <img src="./images/Cities-img/pune-26.avif" alt="mumbai">
            <p>Pune</p>
            </a>
          </div>

        </div>
        <div class="Cities-by-name">
          <h4>Other Cities</h4>
        </div>
      </div>`;

const loginPopupHtml= `<div class="Search-loc-heading">
        <h3>Enter Your Mobile Number</h3>
        <i class="fa-solid fa-xmark Popup-Cross"></i>
      </div>
  <div class="input-container-mb">
    <div class="login-input-form search-popup-input">
      <div class="country-isd"><img src="./images/country-flag/download.png" alt="country-image"> <span>+91<i class="fa-solid fa-angle-down"></i></span></div>
  <input type="text" placeholder="Mobile Number" name="mobile-number">
  </div>
  <p>We’ll text you to confirm your number.</p>
     </div>
     <div class="consent">
       <input type="checkbox"> <p>I hereby authorize to send notification on SMS/WhatsApp</p>
     </div>
    <button class="get-otp-btn">Get OTP</button>`;     

const searchPopupHtml = `
      <div class="Search-loc-heading search-popup-heading">
        <div>
          <h3>Find Food Fast</h3>
          <p>Search restaurants, cuisines, or dishes near you.</p>
        </div>
        <i class="fa-solid fa-xmark Popup-Cross"></i>
      </div>
      <div class="search-popup-shell">
        <div class="search-item popup-search search-popup-input">
          <span class="icon"><i class="fa-solid fa-magnifying-glass"></i></span>
          <input type="text" placeholder="Search pizza, biryani, burgers..." />
        </div>
        <div class="search-popup-section">
          <div class="search-popup-label-row">
            <h4>Trending right now</h4>
            <span>Popular nearby picks</span>
          </div>
          <div class="search-popup-chip-grid">
            <button type="button" class="search-popup-chip">Paneer Tikka</button>
            <button type="button" class="search-popup-chip">Chicken Biryani</button>
            <button type="button" class="search-popup-chip">Masala Dosa</button>
            <button type="button" class="search-popup-chip">Veg Momos</button>
            <button type="button" class="search-popup-chip">Cold Coffee</button>
            <button type="button" class="search-popup-chip">Family Combos</button>
          </div>
        </div>
        <div class="search-popup-section">
          <div class="search-popup-label-row">
            <h4>Quick categories</h4>
            <span>Jump into what you feel like eating</span>
          </div>
          <div class="search-popup-card-grid">
            <article class="search-popup-card">
              <span class="search-popup-card-icon"><i class="fa-solid fa-bowl-food"></i></span>
              <strong>Main Course</strong>
              <p>North Indian, Chinese, thalis, and more.</p>
            </article>
            <article class="search-popup-card">
              <span class="search-popup-card-icon"><i class="fa-solid fa-burger"></i></span>
              <strong>Fast Food</strong>
              <p>Burgers, wraps, fries, and late-night bites.</p>
            </article>
            <article class="search-popup-card">
              <span class="search-popup-card-icon"><i class="fa-solid fa-ice-cream"></i></span>
              <strong>Desserts</strong>
              <p>Cakes, shakes, pastries, and sweet cravings.</p>
            </article>
          </div>
        </div>
        <div class="search-popup-section">
          <div class="search-popup-label-row">
            <h4>Recent suggestions</h4>
            <span>Pick up where you left off</span>
          </div>
          <div class="search-popup-list">
            <button type="button" class="search-popup-list-item">
              <span><i class="fa-solid fa-clock-rotate-left"></i> Butter Chicken near me</span>
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </button>
            <button type="button" class="search-popup-list-item">
              <span><i class="fa-solid fa-clock-rotate-left"></i> Best pizza under 300</span>
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </button>
            <button type="button" class="search-popup-list-item">
              <span><i class="fa-solid fa-clock-rotate-left"></i> Cafe for evening snacks</span>
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </button>
          </div>
        </div>
      </div>`;     

locationBtn.addEventListener('click',()=>{
  openPopup(locationPopup,locationPopupHtml);
  getlocation();
})
loginBtn.addEventListener('click',()=>{
  openPopup(loginPopup, loginPopupHtml);
});
searchBtn.addEventListener('click',()=>{
  openPopup(locationPopup, searchPopupHtml);
})


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%



document.addEventListener("DOMContentLoaded", init);

// Expose handlers globally because index.html uses inline attributes.
if (typeof window !== "undefined") {
  window.getlocation = getlocation;
  window.searchRestaurants = searchRestaurants;
  // window.applyFilters = applyFilters;
  window.OpenRestaurant = OpenRestaurant;
}
