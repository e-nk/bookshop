const jsonUrl = 'https://gist.githubusercontent.com/e-nk/82e10cc5cf8f60a80e479981714fad94/raw/ba6595caf4cdcd820c85472ad99db057c994027b/products.json';

// Fetch the JSON data and display products
fetch(jsonUrl)
    .then(response => response.json())
    .then(data => {
        const products = data[0].products;
        const productsContainer = document.getElementById('products-container');

        products.forEach(product => {
            // Create product card
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            // Product Image
            const productImage = document.createElement('img');
            productImage.src = product.images.default;
            productImage.alt = product.title;
            productCard.appendChild(productImage);

            // Add to Cart button on the image
            const addToCartBtn = document.createElement('div');
            addToCartBtn.className = 'add-to-cart-btn';
            addToCartBtn.textContent = 'Add to Cart';
            addToCartBtn.addEventListener('click', () => addToCart(product)); // Add product to cart on click
            productCard.appendChild(addToCartBtn);
            
            // Product Title
            const productTitle = document.createElement('h3');
            productTitle.className = 'product-title';
            productTitle.textContent = product.title;
            productCard.appendChild(productTitle);
            
            // Product Price
            const productPrice = document.createElement('p');
            productPrice.className = 'product-price';
            productPrice.textContent = '$' + product.price.toFixed(2);
            productCard.appendChild(productPrice);
            
            // Add product card to the container
            productsContainer.appendChild(productCard);
        });
    })
    .catch(error => console.error('Error fetching JSON:', error));
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Load existing cart from localStorage or create a new one

    // Function to add a product to the cart
    function addToCart(product) {
        // Check if the product already exists in the cart
        const existingProduct = cart.find(item => item.id === product.id);
    
        if (existingProduct) {
            existingProduct.quantity += 1; // If the product already exists, increment the quantity
        } else {
            // Add a new product to the cart with quantity = 1
            cart.push({ ...product, quantity: 1 });
        }
    
        // Save the updated cart in localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    
        // Update the cart count display
        updateCartCount();
    }
    
    // Function to update the cart count in the navbar
    function updateCartCount() {
        const cartCountElement = document.getElementById('cart-count');
        cartCountElement.textContent = cart.reduce((total, product) => total + product.quantity, 0); // Display total number of items
    }
    
    // Function to initialize cart and cart count when the page loads
    function initCart() {
        updateCartCount(); // Ensure the cart count is up to date on page load
    }
    
    // Call initCart when the page loads to display correct cart count
    document.addEventListener('DOMContentLoaded', initCart);
    
    // Fetch the JSON data and display products
    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            const products = data[0].products;
            const productsContainer = document.getElementById('products-container');
    
            products.forEach(product => {
                // Create product card
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                
                // Product Image
                const productImage = document.createElement('img');
                productImage.src = product.images.default;
                productImage.alt = product.title;
                productCard.appendChild(productImage);
    
                // Add to Cart button on the image
                const addToCartBtn = document.createElement('div');
                addToCartBtn.className = 'add-to-cart-btn';
                addToCartBtn.textContent = 'Add to Cart';
                addToCartBtn.addEventListener('click', () => addToCart(product)); // Add product to cart on click
                productCard.appendChild(addToCartBtn);
                
                // Product Title
                const productTitle = document.createElement('h3');
                productTitle.className = 'product-title';
                productTitle.textContent = product.title;
                productCard.appendChild(productTitle);
                
                // Product Price
                const productPrice = document.createElement('p');
                productPrice.className = 'product-price';
                productPrice.textContent = '$' + product.price.toFixed(2);
                productCard.appendChild(productPrice);
                
                // Add product card to the container
                productsContainer.appendChild(productCard);
            });
        })
        .catch(error => console.error('Error fetching JSON:', error));
    