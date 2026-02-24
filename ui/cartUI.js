import { FormatINR } from "../utils/format.js";

let cart = [];
let total = 0;

export function addToCart(name, price) {
  cart.push({ name, price });
  total += price;
  renderCart();
}

export function renderCart() {
  const cartList = document.getElementById("cartItems");
  const totalPrice = document.getElementById("totalPrice");

  if (!cartList || !totalPrice) return;

  cartList.innerHTML = cart
    .map((item) => `<li>${item.name} - ${FormatINR(item.price)}</li>`)
    .join("");

  totalPrice.textContent = FormatINR(total);
}