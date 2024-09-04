// Retrieve the cart from localStorage or initialize an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update cart total price
function updateCartTotal() {
    const totalPriceElement = document.getElementById('cart-total');
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalPriceElement.textContent = total.toFixed(2); // Format to two decimal places
}

// Function to save the cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to update the cart count in the navbar
function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalItems;
}

// Function to remove an item from the cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    displayCartItems();
    updateCartTotal();
    updateCartCount();
}

// Function to update the quantity of a product in the cart
function updateQuantity(productId, newQuantity) {
    const product = cart.find(item => item.id === productId);
    if (product && newQuantity >= 1) {
        product.quantity = parseInt(newQuantity, 10);
        saveCart();
        updateCartTotal();
        updateCartCount();
        displayCartItems();  // To refresh buttons
    }
}

// Function to display cart items on the cart page
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items-container');
    cartItemsContainer.innerHTML = ''; // Clear existing items

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <img src="${item.images.default}" alt="${item.title}">
            <div class="cart-item-details">
                <p class="cart-item-title">${item.title}</p>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-quantity">
                <button class="btn btn-secondary" onclick="updateQuantity(${item.id}, ${item.quantity - 1})" ${item.quantity === 1 ? 'disabled' : ''}>-</button>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
                <button class="btn btn-secondary" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            <span class="remove-item" onclick="removeFromCart(${item.id})">&times;</span>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    updateCartTotal(); // Ensure the total price is updated
}

// Add event listener for the checkout button
document.getElementById('checkout-btn').addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        // Redirect to the checkout page
        window.location.href = 'checkout.html';
    }
});

// Initialize the cart page
document.addEventListener('DOMContentLoaded', () => {
    displayCartItems(); // Display cart items on page load
    updateCartCount(); // Update cart count in the navbar
});
