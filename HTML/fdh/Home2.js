const products = [
    {
        id: 1,
        img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
        name: 'BBQ Classic T-Shirt',
        price: 500,
        description: 'Premium cotton t-shirt for maximum comfort during your workouts. Breathable and durable.',
        type: 'shirt'
    },
    {
        id: 2,
        img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
        name: 'BBQ Pro Hoodie',
        price: 890,
        description: 'Warm and comfortable hoodie perfect for cold gym sessions. Features moisture-wicking technology.',
        type: 'Hoodie'
    },
    {
        id: 3,
        img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
        name: 'BBQ Sweatpants',
        price: 750,
        description: 'Flexible and comfortable sweatpants for all your training needs. Perfect fit guaranteed.',
        type: 'Sweatpants'
    },
    {
        id: 4,
        img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
        name: 'BBQ Compression Shirt',
        price: 650,
        description: 'High-performance compression wear for enhanced muscle support and recovery.',
        type: 'shirt'
    },
    {
        id: 5,
        img: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=400',
        name: 'BBQ Whey Protein',
        price: 1200,
        description: 'Premium whey protein isolate with 25g protein per serving. Available in multiple flavors.',
        type: 'Whey Protein'
    },
    {
        id: 6,
        img: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400',
        name: 'BBQ Training Tank',
        price: 450,
        description: 'Lightweight tank top for intense training sessions. Maximum breathability.',
        type: 'shirt'
    }
];

let cart = [];
let currentFilter = 'all';
let selectedProduct = null;

// Render Products
function renderProducts(productsToRender) {
    const container = document.getElementById('productsContainer');
    container.innerHTML = productsToRender.map(product => `
                <div class="product-card" onclick="openProductModal(${product.id})">
                    <img class="product-img" src="${product.img}" alt="${product.name}">
                    <div class="product-info">
                        <div class="product-name">${product.name}</div>
                        <div class="product-type">${product.type}</div>
                        <div class="product-price">${product.price} THB</div>
                    </div>
                </div>
            `).join('');
}

// Filter Products
function filterProducts(type) {
    currentFilter = type;
    const filtered = type === 'all' ? products : products.filter(p => p.type === type);
    renderProducts(filtered);

    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

// Search Products
document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.type.toLowerCase().includes(searchTerm)
    );
    renderProducts(filtered);
});

// Open Product Modal
function openProductModal(productId) {
    selectedProduct = products.find(p => p.id === productId);
    document.getElementById('modalImg').src = selectedProduct.img;
    document.getElementById('modalName').textContent = selectedProduct.name;
    document.getElementById('modalPrice').textContent = selectedProduct.price;
    document.getElementById('modalDescription').textContent = selectedProduct.description;
    document.getElementById('productModal').classList.add('active');
}

// Close Modal
function closeModal() {
    document.getElementById('productModal').classList.remove('active');
}

// Add to Cart
function addToCart() {
    if (selectedProduct) {
        cart.push(selectedProduct);
        updateCartCount();
        alert(`${selectedProduct.name} added to cart!`);
        closeModal();
    }
}

// Update Cart Count
function updateCartCount() {
    document.getElementById('cartCount').textContent = cart.length;
}

// Open Cart (placeholder)
function openCart() {
    alert(`You have ${cart.length} items in your cart!`);
}

// Close modal on background click
document.getElementById('productModal').addEventListener('click', (e) => {
    if (e.target.id === 'productModal') {
        closeModal();
    }
});

// Initial render
renderProducts(products);