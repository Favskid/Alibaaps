// cart.js — Cart state lives in localStorage (no login required)

const CART_KEY = 'alibaaps_cart';

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getCartCount() {
  return getCart().reduce((t, i) => t + i.quantity, 0);
}

function addToCart(productId, size, name, price, image, colour) {
  const cart = getCart();
  const pid  = String(productId);
  const idx  = cart.findIndex(i => String(i.productId) === pid && i.size === size);
  if (idx > -1) {
    cart[idx].quantity += 1;
    if (colour) cart[idx].colour = colour;
  } else {
    cart.push({ productId: pid, size, name, price, image, colour: colour || '', quantity: 1 });
  }
  saveCart(cart);
  updateCartBadge();
}

function removeFromCart(productId, size) {
  saveCart(getCart().filter(i => !(String(i.productId) === String(productId) && i.size === size)));
  updateCartBadge();
}

function updateQuantity(productId, size, delta) {
  const cart = getCart();
  const idx  = cart.findIndex(i => String(i.productId) === String(productId) && i.size === size);
  if (idx > -1) {
    const newQty = cart[idx].quantity + delta;
    if (newQty < 1) {
      cart.splice(idx, 1);
    } else {
      cart[idx].quantity = newQty;
    }
    saveCart(cart);
    updateCartBadge();
  }
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

function getCartTotal() {
  return getCart().reduce((t, i) => t + i.price * i.quantity, 0);
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  const count = getCartCount();
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
}

document.addEventListener('DOMContentLoaded', updateCartBadge);
