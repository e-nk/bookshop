// Initialize Stripe with your publishable key
const stripe = Stripe('pk_test_51N5kHrDMMZh8YOx3XQJrZg0ZSIeNuPYyXivTh6q7kYXDUKQ3HVgaOjbNNVuYSsOPOfSXSxiaoYQ6BagtyhZNdcOz00GcyROiGE'); 
const elements = stripe.elements();

// Create an instance of the card Element and mount it
const cardElement = elements.create('card', { style: { base: { fontSize: '18px' } } });
cardElement.mount('#card-element');

// Handle real-time validation errors from the card Element
cardElement.on('change', function(event) {
    const displayError = document.getElementById('card-errors');
    if (event.error) {
        displayError.textContent = event.error.message;
    } else {
        displayError.textContent = '';
    }
});

// Load the cart from localStorage and display the order summary
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Display order summary and calculate total
function displayOrderSummary() {
    const orderSummary = document.getElementById('order-summary');
    const productPreview = document.getElementById('product-preview');
    const checkoutTotalElement = document.getElementById('checkout-total');
    let total = 0;

    // Clear the previous product preview (if reloading)
    productPreview.innerHTML = '';

    cart.forEach(item => {
        // Create product preview
        const productItem = document.createElement('div');
        productItem.classList.add('order-item');
        productItem.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <p>${item.title} (x${item.quantity})</p>
                <p>$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        `;
        productPreview.appendChild(productItem);

        // Calculate total
        total += item.price * item.quantity;
    });

    // Update total price
    checkoutTotalElement.textContent = total.toFixed(2);
}

document.addEventListener('DOMContentLoaded', displayOrderSummary);

// Handle form submission and Stripe payment processing
const form = document.getElementById('payment-form');
const cardholderName = document.getElementById('cardholder-name');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Create payment method and confirm payment with Stripe
    stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
            name: cardholderName.value
        },
    }).then(function(result) {
        if (result.error) {
            // Show error in #card-errors element
            const errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
        } else {
            // Send paymentMethod.id to the server to create a payment intent and confirm payment
            handlePaymentMethod(result.paymentMethod);
        }
    });
});

// Function to handle payment and process it through the server
function handlePaymentMethod(paymentMethod) {
    fetch('/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            paymentMethodId: paymentMethod.id,
            cart: cart, // Send the cart to the server
        }),
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(paymentIntent) {
        return stripe.confirmCardPayment(paymentIntent.client_secret);
    })
    .then(function(result) {
        if (result.error) {
            // Display error message
            const errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
        } else {
            // Redirect to success page after successful payment
            window.location.href = '/success.html';
        }
    });
}
