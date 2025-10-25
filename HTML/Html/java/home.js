// ==================== DATA ====================
const PRODUCTS = Object.freeze([{
    id: 1,
    img: 'img/BTS.png',
    name: 'BBQ T-shirt',
    price: 500,
    description: 'BBQ T-shirt high quality cotton material',
    type: 'shirt'
}, {
    id: 2,
    img: 'img/hoodie.png',
    name: 'BBQ Hoodie',
    price: 800,
    description: 'Comfortable hoodie for gym',
    type: 'Hoodie'
}, {
    id: 3,
    img: 'img/sp2.png',
    name: 'BBQ Sweatpants',
    price: 600,
    description: 'Premium sweatpants',
    type: 'Sweatpants'
}, {
    id: 4,
    img: 'img/cs.png',
    name: 'BBQ Compression',
    price: 450,
    description: 'Compression shirt for workout',
    type: 'shirt'
}, {
    id: 5,
    img: 'img/whry.png',
    name: 'BBQ Whey',
    price: 1200,
    description: 'Whey protein 100%',
    type: 'Whey Protein'
}]);

// ==================== CART MANAGER ====================
const CartManager = {
    STORAGE_KEY: 'bbq_cart',
    cart: [],

    // โหลดตะกร้าจาก localStorage
    load() {
        try {
            const saved = localStorage.getItem(this.STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                // Validate data integrity
                if (Array.isArray(parsed)) {
                    this.cart = parsed.filter(item => 
                        item.id && item.name && item.price && item.quantity > 0
                    );
                    console.log('✓ Cart loaded:', this.cart.length, 'items');
                    return true;
                }
            }
        } catch (error) {
            console.error('❌ Error loading cart:', error);
            this.cart = [];
        }
        return false;
    },

    // บันทึกตะกร้าลง localStorage
    save() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.cart));
            console.log('✓ Cart saved');
            return true;
        } catch (error) {
            console.error('❌ Error saving cart:', error);
            return false;
        }
    },

    // เพิ่มสินค้าลงตะกร้า
    addItem(productId) {
        const id = Number(productId);
        
        console.log('📦 addItem called');
        console.log('   Input ID:', productId, '(Type:', typeof productId, ')');
        console.log('   Converted ID:', id, '(Type:', typeof id, ')');
        console.log('   Current cart:', this.cart);
        
        const existingItem = this.cart.find(item => Number(item.id) === id);

        if (existingItem) {
            existingItem.quantity++;
            console.log(`   ✓ Increased quantity: ${existingItem.name} → ${existingItem.quantity}`);
        } else {
            const product = PRODUCTS.find(p => p.id === id);
            if (!product) {
                console.error('   ❌ Product not found with ID:', id);
                console.log('   Available products:', PRODUCTS.map(p => p.id));
                return false;
            }

            const newItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                img: product.img,
                quantity: 1
            };
            
            this.cart.push(newItem);
            console.log(`   ✓ Added NEW item: ${product.name}`, newItem);
        }

        console.log('   Final cart:', this.cart);
        this.save();
        return true;
    },

    // อัพเดทจำนวนสินค้า
    updateQuantity(productId, delta) {
        const id = Number(productId);
        const item = this.cart.find(item => Number(item.id) === id);

        if (!item) {
            console.error('❌ Item not found in cart:', id);
            return false;
        }

        item.quantity += delta;

        if (item.quantity <= 0) {
            this.removeItem(id);
        } else {
            console.log(`✓ Updated quantity: ${item.name} → ${item.quantity}`);
            this.save();
        }

        return true;
    },

    // ลบสินค้าออกจากตะกร้า
    removeItem(productId) {
        const id = Number(productId);
        const initialLength = this.cart.length;
        this.cart = this.cart.filter(item => Number(item.id) !== id);

        if (this.cart.length < initialLength) {
            console.log('✓ Item removed from cart');
            this.save();
            return true;
        }
        return false;
    },

    // คำนวณจำนวนสินค้าทั้งหมด
    getTotalItems() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    },

    // คำนวณราคารวม
    getTotalPrice() {
        return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },

    // เคลียร์ตะกร้า
    clear() {
        this.cart = [];
        this.save();
        console.log('✓ Cart cleared');
    },

    // ดึงข้อมูลตะกร้า
    getItems() {
        return [...this.cart]; // Return copy
    }
};

// ==================== UI MANAGER ====================
const UIManager = {
    // แสดงสินค้าทั้งหมด
    renderProducts() {
        const html = PRODUCTS.map(product => `
            <div class="product-items ${product.type}" data-id="${product.id}">
                <img class="product-img" src="${product.img}" alt="${product.name}">
                <p style="font-size: 1.2vw;">${product.name}</p>
                <p style="font-size: 1.2vw;">${product.price.toLocaleString()} THB</p>
            </div>
        `).join('');

        $('#productlist').html(html);
    },

    // แสดง Modal รายละเอียดสินค้า
    showProductModal(productId) {
        const id = Number(productId);
        const product = PRODUCTS.find(p => p.id === id);
        
        if (!product) {
            console.error('❌ Product not found:', productId);
            return;
        }

        console.log('🔍 Opening modal for:', product.name, '(ID:', id, ')');

        const modal = $('.modal').eq(0);
        modal.find('.modaldesc-img').attr('src', product.img);
        modal.find('.modaldesc-detail p').eq(0).text(product.name);
        modal.find('.modaldesc-detail p').eq(1).text(`${product.price.toLocaleString()} THB`);
        modal.find('.modaldesc-detail p').eq(2).text(product.description);
        modal.find('.btn-buy').attr('data-product-id', id);
        
        // Verify button data
        console.log('✓ Button data-product-id set to:', modal.find('.btn-buy').attr('data-product-id'));
        
        modal.fadeIn(200);
    },

    // แสดง Modal ตะกร้า
    showCartModal() {
        const modal = $('.modal').eq(1);
        const items = CartManager.getItems();
        
        if (items.length === 0) {
            const emptyHtml = '<p style="text-align: center; color: gray; padding: 40px; font-size: 1.2vw;">🛒 Your cart is empty</p>';
            modal.find('.cartlist').html(emptyHtml);
            modal.find('.btn-checkout').prop('disabled', true);
        } else {
            const cartHtml = this.generateCartHTML(items);
            modal.find('.cartlist').html(cartHtml);
            modal.find('.btn-checkout').prop('disabled', false);
        }

        modal.fadeIn(200);
    },

    // สร้าง HTML ของตะกร้า
    generateCartHTML(items) {
        const itemsHtml = items.map(item => {
            const subtotal = item.price * item.quantity;
            return `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.img}" alt="${item.name}" class="cart-img">
                    <div class="cart-detail">
                        <p class="cart-name">${item.name}</p>
                        <p class="cart-price">${item.price.toLocaleString()} THB × ${item.quantity}</p>
                        <p class="cart-subtotal">Subtotal: <b>${subtotal.toLocaleString()} THB</b></p>
                        <div class="cart-quantity-control">
                            <button class="btnc btn-decrease" data-product-id="${item.id}">−</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="btnc btn-increase" data-product-id="${item.id}">+</button>
                        </div>
                    </div>
                    <button class="btnc btn-remove" data-product-id="${item.id}">×</button>
                </div>
            `;
        }).join('');

        const total = CartManager.getTotalPrice();
        const totalHtml = `
            <div style="border-top: 2px solid #000; padding-top: 15px; margin-top: 15px;">
                <p style="font-size: 1.5vw; font-weight: bold; text-align: right;">
                    Total: ${total.toLocaleString()} THB
                </p>
            </div>
        `;

        return itemsHtml + totalHtml;
    },

    // อัพเดทจำนวนสินค้าบน badge
    updateCartBadge() {
        const count = CartManager.getTotalItems();
        $('.cartcount').text(count);
        
        // เพิ่ม animation เมื่อมีการเปลี่ยนแปลง
        $('.cartcount').addClass('bounce');
        setTimeout(() => $('.cartcount').removeClass('bounce'), 300);
    },

    // แสดง Toast notification
    showToast(message, type = 'success') {
        const bgColor = type === 'success' ? '#28a745' : '#dc3545';
        const toast = $('<div>')
            .text(message)
            .css({
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                background: bgColor,
                color: '#fff',
                padding: '15px 25px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                zIndex: 9999,
                fontSize: '14px',
                fontWeight: '500',
                opacity: 0,
                transform: 'translateY(20px)',
                transition: 'all 0.3s ease'
            });

        $('body').append(toast);
        
        setTimeout(() => {
            toast.css({ opacity: 1, transform: 'translateY(0)' });
        }, 10);

        setTimeout(() => {
            toast.css({ opacity: 0, transform: 'translateY(-20px)' });
            setTimeout(() => toast.remove(), 300);
        }, 2700);
    },

    // ปิด Modal
    closeModal(index = 0) {
        $('.modal').eq(index).fadeOut(200);
    }
};

// ==================== CHECKOUT ====================
const Checkout = {
    process() {
        const items = CartManager.getItems();
        
        if (items.length === 0) {
            UIManager.showToast('Cart is empty!', 'error');
            return;
        }

        const total = CartManager.getTotalPrice();
        const itemsList = items
            .map(item => `• ${item.name} ×${item.quantity} = ${(item.price * item.quantity).toLocaleString()} THB`)
            .join('\n');
        
        const confirmMsg = `Order Summary:\n\n${itemsList}\n\n━━━━━━━━━━━━━━━━━━━━━━\nTotal: ${total.toLocaleString()} THB\n\nConfirm purchase?`;
        
        if (confirm(confirmMsg)) {
            this.success(total);
        } else {
            console.log('Checkout cancelled');
        }
    },

    success(total) {
        alert(`✓ Payment Successful!\n\nAmount paid: ${total.toLocaleString()} THB\n\nThank you for shopping with us!`);
        
        CartManager.clear();
        UIManager.updateCartBadge();
        UIManager.closeModal(1);
        
        console.log('✓ Checkout completed');
    }
};

// ==================== EVENT HANDLERS ====================
$(document).ready(() => {
    // โหลดข้อมูลเริ่มต้น
    CartManager.load();
    UIManager.updateCartBadge();
    UIManager.renderProducts();

    // คลิกที่สินค้า → เปิด Modal
    $(document).on('click', '.product-items', function() {
        const productId = $(this).data('id');
        UIManager.showProductModal(productId);
    });

    // คลิก Background → ปิด Modal
    $(document).on('click', '.modal-bg', function() {
        UIManager.closeModal($(this).parent('.modal').index('.modal'));
    });

    // ปุ่มปิด Modal รายละเอียดสินค้า
    $(document).on('click', '.btn-close', function() {
        UIManager.closeModal(0);
    });

    // ปุ่ม Cancel ในตะกร้า
    $(document).on('click', '.btn-cancel', function() {
        UIManager.closeModal(1);
    });

    // เพิ่มสินค้าลงตะกร้า
    $(document).on('click', '.btn-buy', function(e) {
        e.stopPropagation();
        const productId = $(this).data('product-id');
        
        console.log('🛒 Add to Cart button clicked');
        console.log('   Product ID from button:', productId, '(Type:', typeof productId, ')');
        
        if (CartManager.addItem(productId)) {
            UIManager.updateCartBadge();
            UIManager.showToast('✓ Added to cart!');
            UIManager.closeModal(0);
        } else {
            UIManager.showToast('Failed to add item', 'error');
        }
    });

    // เปิดตะกร้า
    $('.nav-profile-cart').click(function() {
        UIManager.showCartModal();
    });

    // ปุ่ม + ในตะกร้า
    $(document).on('click', '.btn-increase', function(e) {
        e.stopPropagation();
        const productId = $(this).data('product-id');
        
        if (CartManager.updateQuantity(productId, 1)) {
            UIManager.updateCartBadge();
            UIManager.showCartModal();
        }
    });

    // ปุ่ม - ในตะกร้า
    $(document).on('click', '.btn-decrease', function(e) {
        e.stopPropagation();
        const productId = $(this).data('product-id');
        
        if (CartManager.updateQuantity(productId, -1)) {
            UIManager.updateCartBadge();
            UIManager.showCartModal();
        }
    });

    // ปุ่ม × (Remove)
    $(document).on('click', '.btn-remove', function(e) {
        e.stopPropagation();
        const productId = $(this).data('product-id');
        
        if (confirm('Remove this item from cart?')) {
            if (CartManager.removeItem(productId)) {
                UIManager.updateCartBadge();
                UIManager.showCartModal();
                UIManager.showToast('Item removed');
            }
        }
    });

    // ปุ่ม Checkout
    $(document).on('click', '.btn-checkout, .btn-Buy', function(e) {
        e.stopPropagation();
        Checkout.process();
    });

    // Keyboard shortcuts
    $(document).on('keydown', function(e) {
        // ESC = ปิด Modal
        if (e.key === 'Escape') {
            $('.modal:visible').fadeOut(200);
        }
    });
});

// ==================== UTILITY FUNCTIONS ====================
// เคลียร์ตะกร้า (สำหรับ debug)
function clearCart() {
    if (confirm('Clear all items from cart?')) {
        CartManager.clear();
        UIManager.updateCartBadge();
        UIManager.showToast('Cart cleared');
        console.log('✓ Cart cleared manually');
    }
}

// Debug: แสดงข้อมูลตะกร้า
function debugCart() {
    console.log('=== CART DEBUG ===');
    console.log('Items:', CartManager.getItems());
    console.log('Total items:', CartManager.getTotalItems());
    console.log('Total price:', CartManager.getTotalPrice(), 'THB');
    console.log('localStorage:', localStorage.getItem(CartManager.STORAGE_KEY));
}

// Export functions สำหรับใช้ใน Console
window.BBQShop = {
    CartManager,
    UIManager,
    clearCart,
    debugCart
};