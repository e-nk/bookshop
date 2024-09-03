// URL of the GitHub Gist hosting your JSON data
const jsonUrl = 'https://gist.githubusercontent.com/e-nk/82e10cc5cf8f60a80e479981714fad94/raw/ba6595caf4cdcd820c85472ad99db057c994027b/products.json';

// Fetch the JSON data and display products
fetch(jsonUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log the data to inspect its structure

        // Extract the products array from the JSON data
        if (Array.isArray(data) && data.length > 0 && data[0].products && Array.isArray(data[0].products)) {
            const products = data[0].products; // Access the products array
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
                
                // Product Title
                const productTitle = document.createElement('h3');
                productTitle.className = 'product-title';
                productTitle.textContent = product.title;
                productCard.appendChild(productTitle);
                
                // Product Price
                const productPrice = document.createElement('p');
                productPrice.className = 'product-price';
                productPrice.textContent = '$' + product.price.toFixed(2); // Use toFixed for formatting
                productCard.appendChild(productPrice);
                
                // Product Category
                const productCategory = document.createElement('p');
                productCategory.className = 'product-category';
                productCategory.textContent = product.category;
                productCard.appendChild(productCategory);
                
                // Add product card to the container
                productsContainer.appendChild(productCard);
            });
        } else {
            console.error('Products data is not an array or does not contain products:', data);
        }
    })
    .catch(error => console.error('Error fetching JSON:', error));
