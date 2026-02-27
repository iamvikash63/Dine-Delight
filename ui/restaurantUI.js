import { FormatINR } from "../utils/format.js";

export function renderRestaurants(data){
    const restaurantContainer = document.getElementById("restaurantGrid");

 
  if (!restaurantContainer) return;
  let Res_con_HTML=``;  
    data.forEach(rest =>{
      
      const MenuCount= rest.menuItems;
      let Count = MenuCount.length;
      const cuisines = rest.restaurantTypes.slice(0, 2).join(" | ") || "Multi Cuisine";
      const About = (rest.description || rest.about || "Freshly prepared meals from trusted kitchens.").slice(0, 70);

    Res_con_HTML+=`<article
        class="restaurant-card"
        data-name="${rest.name}"
        data-rating="${rest.rating}"
        data-price="${rest.priceForTwo}"
        onclick="OpenRestaurant(${rest.id})"
        role="button"
        tabindex="0"
        onkeydown="if(event.key==='Enter'){OpenRestaurant(${rest.id})}"
      >
        <div class="restaurant-media">
          <img src="${rest.image}" alt="${rest.name}" loading="lazy" />
          <span class="offer-badge">${rest.offers}</span>
          <span class="prep-time-chip"><i class="fa-regular fa-clock"></i> ${rest.deliveryTime}</span>
        </div>

        <div class="card-body">
          <div class="card-head">
            <h3>${rest.name}</h3>
            <span class="rating-pill"><i class="fa-solid fa-star"></i> ${rest.rating}</span>
          </div>

          <p class="card-cuisine">${cuisines}</p>
          <p class="card-about">${About}${About.endsWith(".") ? "" : "..."}</p>

          <div class="card-meta">
            <span><i class="fa-solid fa-location-dot"></i> ${rest.location.area || "Location not available"}</span>
            <span><i class="fa-solid fa-indian-rupee-sign"></i> Starts ${FormatINR(rest.priceForTwo)}</span>
            <span><i class="fa-solid fa-utensils"></i> ${Count} menu items</span>
          </div>

          <div class="card-footer">
            <span class="service-tag">Delivery</span>
            <span class="service-tag">Takeaway</span>
            <span class="view-action">View Details <i class="fa-solid fa-arrow-right"></i></span>
          </div>
        </div>
      </article>`
    });
     restaurantContainer.innerHTML=Res_con_HTML;
     console.log(restaurantContainer)
    
  // const cardHtml = data.map((rest) => {
  //   const restaurantTypes = Array.isArray(rest.restaurantTypes)
  //     ? rest.restaurantTypes
  //     : [rest.restype1, rest.restype2, rest.restype3, rest.restype4].filter(Boolean);
  //   const cuisines = restaurantTypes.slice(0, 2).join(" | ") || "Multi Cuisine";
  //   const menuItems = Array.isArray(rest.menuItems) ? rest.menuItems : rest.menu;
  //   const menuCount = Array.isArray(menuItems) ? menuItems.length : 0;
  //   const aboutText = (rest.description || rest.about || "Freshly prepared meals from trusted kitchens.").slice(0, 88);
  //   const rating = Number(rest.rating || 0).toFixed(1);
  //   const offerText = Array.isArray(rest.offers) ? rest.offers[0] : rest.offers;
  //   const price = rest.priceForTwo ?? rest.price ?? 0;
  //   const time = rest.deliveryTime || rest.prepTime || "25 min";
  //   const locationText = typeof rest.location === "object"
  //     ? [rest.location?.area, rest.location?.city].filter(Boolean).join(", ")
  //     : rest.location;

//     return `
//       <article
//         class="restaurant-card"
//         data-name="${rest.name}"
//         data-rating="${rest.rating}"
//         data-price="${price}"
//         onclick="OpenRestaurant(${rest.id})"
//         role="button"
//         tabindex="0"
//         onkeydown="if(event.key==='Enter'){OpenRestaurant(${rest.id})}"
//       >
//         <div class="restaurant-media">
//           <img src="${rest.image}" alt="${rest.name}" loading="lazy" />
//           ${offerText ? `<span class="offer-badge">${offerText}</span>` : ""}
//           <span class="prep-time-chip"><i class="fa-regular fa-clock"></i> ${time}</span>
//         </div>

//         <div class="card-body">
//           <div class="card-head">
//             <h3>${rest.name}</h3>
//             <span class="rating-pill"><i class="fa-solid fa-star"></i> ${rating}</span>
//           </div>

//           <p class="card-cuisine">${cuisines}</p>
//           <p class="card-about">${aboutText}${aboutText.endsWith(".") ? "" : "..."}</p>

//           <div class="card-meta">
//             <span><i class="fa-solid fa-location-dot"></i> ${locationText || "Location not available"}</span>
//             <span><i class="fa-solid fa-indian-rupee-sign"></i> Starts ${FormatINR(price)}</span>
//             <span><i class="fa-solid fa-utensils"></i> ${menuCount} menu items</span>
//           </div>

//           <div class="card-footer">
//             <span class="service-tag">Delivery</span>
//             <span class="service-tag">Takeaway</span>
//             <span class="view-action">View Details <i class  ="fa-solid fa-arrow-right"></i></span>
//           </div>
//         </div>
//       </article>
//     `;
//   });

//   restaurantContainer.innerHTML = cardHtml.join("");
}
