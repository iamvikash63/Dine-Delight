const businesses = [
    { id: 1, name: "Burger Kingly", img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400", menu: [
        { name: "Classic Beef", price: 12.00 },
        { name: "Cheese Blast", price: 15.00 }
    ]},
    { id: 2, name: "Pizza Palace", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400", menu: [
        { name: "Margherita", price: 10.00 },
        { name: "Pepperoni Special", price: 14.00 }
    ]}
];

let cart = [];

// Initialize Restaurants
function init() {
    const list = document.getElementById('business-list');
    businesses.forEach(b => {
        list.innerHTML += `
            <div class="card">
                <img src="${b.img}" alt="${b.name}">
                <div class="card-info">
                    <h3>${b.name}</h3>
                    <button class="btn-menu" onclick="showMenu(${b.id})">View Menu</button>
                </div>
            </div>`;
    });
}

function showMenu(id) {
    const biz = businesses.find(b => b.id === id);
    const modal = document.getElementById('menu-modal');
    const menuItems = document.getElementById('menu-items');
    document.getElementById('modal-title').innerText = biz.name;
    
    menuItems.innerHTML = biz.menu.map(item => `
        <div style="display:flex; justify-content:space-between; margin:10px 0;">
            <span>${item.name} - $${item.price}</span>
            <button onclick="addToCart('${item.name}', ${item.price})">Order</button>
        </div>
    `).join('');
    
    modal.style.display = "block";
}

function addToCart(name, price) {
    cart.push({name, price});
    document.getElementById('cart-count').innerText = cart.length;
    alert(`${name} added! Simulating Order Prep...`);
    startOrderPrep();
}

// Simulate Order Preparation & Notification
function startOrderPrep() {
    const status = document.getElementById('status-bar');
    status.classList.remove('hidden');
    
    setTimeout(() => {
        document.getElementById('status-text').innerText = "Food is Ready! 🍕";
        document.getElementById('bell-sound').play();
        
        // Browser Notification
        if (Notification.permission === "granted") {
            new Notification("Food Court", { body: "Your order is ready for pickup!" });
        }
    }, 5000); // Ready after 5 seconds
}

// Close Modal Logic
function closeModal() { document.getElementById('menu-modal').style.display = "none"; }

// Request Notification Permission on load
if (Notification.permission !== "denied") {
    Notification.requestPermission();
}

init();