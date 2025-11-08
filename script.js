/* ========================================
   JAVASCRIPT FOR CRUCIAL HEALTHY SALAD
   ======================================== */

// ========================================
// 1. GLOBAL VARIABLES & CONFIGURATION
// ========================================

const menuData = [
  {
    id: 1,
    name: "Classic Garden Salad",
    description: "Fresh lettuce, cherry tomatoes, cucumbers, carrots, and olives with light vinaigrette.",
    price: 120,
    category: "veg",
    calories: 150,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    alt: "Classic garden salad with fresh vegetables",
    ingredients: ["Lettuce", "Cherry Tomatoes", "Cucumbers", "Carrots", "Olives", "Vinaigrette"]
  },
  {
    id: 2,
    name: "Protein Power Salad",
    description: "Baby spinach, grilled chicken, sweet corn, kidney beans, bell peppers, olive oil dressing.",
    price: 160,
    category: "protein",
    calories: 280,
    image: "https://images.unsplash.com/photo-1515548214153-1c950c4e240b?auto=format&fit=crop&w=600&q=80",
    alt: "Protein power salad with grilled chicken and beans",
    ingredients: ["Baby Spinach", "Grilled Chicken", "Sweet Corn", "Kidney Beans", "Bell Peppers", "Olive Oil"]
  },
  {
    id: 3,
    name: "Crunchy Veggie Delight",
    description: "Mixed greens, broccoli, red cabbage, carrots, sesame seeds, tangy Asian sauce.",
    price: 140,
    category: "veg",
    calories: 180,
    image: "https://images.unsplash.com/photo-1464306076886-debede6bb36b?auto=format&fit=crop&w=600&q=80",
    alt: "Crunchy veggie delight salad with Asian sauce",
    ingredients: ["Mixed Greens", "Broccoli", "Red Cabbage", "Carrots", "Sesame Seeds", "Asian Sauce"]
  },
  {
    id: 4,
    name: "Fruit Fusion Salad",
    description: "Seasonal fruits, lettuce, nuts, mint, and yogurt drizzle.",
    price: 150,
    category: "fruit",
    calories: 200,
    image: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=600&q=80",
    alt: "Fruit fusion salad with nuts and yogurt",
    ingredients: ["Seasonal Fruits", "Lettuce", "Assorted Nuts", "Fresh Mint", "Yogurt"]
  },
  {
    id: 5,
    name: "Mediterranean Delight",
    description: "Romaine lettuce, feta cheese, kalamata olives, red onions, sun-dried tomatoes, Greek dressing.",
    price: 170,
    category: "veg",
    calories: 220,
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80",
    alt: "Mediterranean salad with feta and olives",
    ingredients: ["Romaine Lettuce", "Feta Cheese", "Kalamata Olives", "Red Onions", "Sun-dried Tomatoes", "Greek Dressing"]
  },
  {
    id: 6,
    name: "Quinoa Power Bowl",
    description: "Quinoa, roasted chickpeas, avocado, cherry tomatoes, cucumber, tahini dressing.",
    price: 180,
    category: "protein",
    calories: 320,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    alt: "Quinoa power bowl with chickpeas and avocado",
    ingredients: ["Quinoa", "Roasted Chickpeas", "Avocado", "Cherry Tomatoes", "Cucumber", "Tahini Dressing"]
  },
  {
    id: 7,
    name: "Caesar Supreme",
    description: "Crisp romaine, parmesan shavings, croutons, grilled chicken, classic Caesar dressing.",
    price: 165,
    category: "protein",
    calories: 290,
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=600&q=80",
    alt: "Caesar salad with grilled chicken",
    ingredients: ["Romaine Lettuce", "Parmesan Cheese", "Croutons", "Grilled Chicken", "Caesar Dressing"]
  },
  {
    id: 8,
    name: "Berry Bliss Salad",
    description: "Mixed berries, baby spinach, goat cheese, candied walnuts, raspberry vinaigrette.",
    price: 155,
    category: "fruit",
    calories: 210,
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&q=80",
    alt: "Berry salad with goat cheese and walnuts",
    ingredients: ["Mixed Berries", "Baby Spinach", "Goat Cheese", "Candied Walnuts", "Raspberry Vinaigrette"]
  },
  {
    id: 9,
    name: "Asian Crunch",
    description: "Napa cabbage, edamame, mandarin oranges, crispy wontons, sesame ginger dressing.",
    price: 145,
    category: "veg",
    calories: 190,
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=600&q=80",
    alt: "Asian crunch salad with edamame",
    ingredients: ["Napa Cabbage", "Edamame", "Mandarin Oranges", "Crispy Wontons", "Sesame Ginger Dressing"]
  },
  {
    id: 10,
    name: "Low-Cal Green Machine",
    description: "Kale, cucumber, celery, green apple, lemon juice, light herb dressing.",
    price: 130,
    category: "low-cal",
    calories: 95,
    image: "https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?auto=format&fit=crop&w=600&q=80",
    alt: "Low calorie green salad",
    ingredients: ["Kale", "Cucumber", "Celery", "Green Apple", "Lemon Juice", "Herb Dressing"]
  }
];

let cart = [];
let currentFilter = 'all';
let visibleMenuItems = 6;

// ========================================
// 2. UTILITY FUNCTIONS
// ========================================

function formatINR(amount) {
    return `₹${amount.toFixed(0)}`;
}

function announceToScreenReader(message) {
    const announcement = document.getElementById('announcement');
    if (announcement) {
        announcement.textContent = message;
        setTimeout(() => {
            announcement.textContent = '';
        }, 1000);
    }
}

function showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.add('active');
    }
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

function smoothScrollTo(targetId) {
    const element = document.querySelector(targetId);
    if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
}

function saveCart() {
    try {
        localStorage.setItem('crucialSaladCart', JSON.stringify(cart));
    } catch (e) {
        console.log('Unable to save cart');
    }
}

function loadCart() {
    try {
        const savedCart = localStorage.getItem('crucialSaladCart');
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCartCount();
        }
    } catch (e) {
        console.log('Unable to load cart');
    }
}

// ========================================
// 3. NAVIGATION FUNCTIONS
// ========================================

function setupNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }
    
    const navLinksItems = document.querySelectorAll('.nav-link');
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768 && navLinks) {
                navLinks.classList.remove('active');
                if (menuToggle) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
    
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                smoothScrollTo(href);
            }
        });
    });
}

// ========================================
// 4. MENU RENDERING FUNCTIONS
// ========================================

function renderMenu(filter = 'all') {
    const menuGrid = document.getElementById('menuGrid');
    if (!menuGrid) return;
    
    menuGrid.innerHTML = '';
    
    let filteredMenu = filter === 'all' 
        ? menuData 
        : menuData.filter(item => item.category === filter);
    
    const itemsToShow = filteredMenu.slice(0, visibleMenuItems);
    
    itemsToShow.forEach(item => {
        const menuDiv = document.createElement('div');
        menuDiv.className = 'menu-item';
        menuDiv.innerHTML = `
            <img src="${item.image}" alt="${item.alt}" loading="lazy" />
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <small style="color: #999; display: block; margin-top: 5px;">
                    ${item.calories} calories
                </small>
                <div class="menu-item-footer">
                    <div class="price">${formatINR(item.price)}</div>
                    <button class="add-to-cart" data-id="${item.id}" aria-label="Add ${item.name} to cart">
                        <i class="fas fa-cart-plus"></i>
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        menuGrid.appendChild(menuDiv);
    });
    
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        if (filteredMenu.length > visibleMenuItems) {
            loadMoreBtn.style.display = 'inline-flex';
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }
    
    announceToScreenReader(`${itemsToShow.length} salads displayed`);
}

function setupMenuFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            currentFilter = filter;
            visibleMenuItems = 6;
            renderMenu(filter);
            
            announceToScreenReader(`Filtering by ${filter}`);
        });
    });
    
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            visibleMenuItems += 6;
            renderMenu(currentFilter);
        });
    }
}

// ========================================
// 5. CART FUNCTIONS
// ========================================

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        if (totalItems > 0) {
            cartCount.style.display = 'inline-block';
        } else {
            cartCount.style.display = 'none';
        }
    }
}

function addToCart(id) {
    const item = menuData.find(m => m.id == id);
    if (!item) return;
    
    const existing = cart.find(c => c.id == id);
    
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    
    updateCartCount();
    saveCart();
    renderCartItems();
    
    announceToScreenReader(`${item.name} added to cart`);
    showToast(`${item.name} added to cart!`);
}

function removeFromCart(id) {
    const item = cart.find(c => c.id == id);
    const itemName = item ? item.name : 'Item';
    
    cart = cart.filter(item => item.id != id);
    updateCartCount();
    saveCart();
    renderCartItems();
    
    announceToScreenReader(`${itemName} removed from cart`);
    showToast(`${itemName} removed from cart`);
}

function updateQuantity(id, quantity) {
    const item = cart.find(c => c.id == id);
    
    if (item) {
        if (quantity <= 0) {
            removeFromCart(id);
        } else {
            item.quantity = quantity;
            saveCart();
            renderCartItems();
            updateCartCount();
        }
    }
}

function cartSubtotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function clearCart() {
    cart = [];
    updateCartCount();
    saveCart();
    renderCartItems();
    announceToScreenReader('Cart cleared');
}

// ========================================
// 6. CART MODAL FUNCTIONS
// ========================================

function openCartModal() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        renderCartItems();
        cartModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        cartModal.setAttribute('aria-hidden', 'false');
        
        const closeBtn = cartModal.querySelector('.close-btn');
        if (closeBtn) {
            setTimeout(() => closeBtn.focus(), 100);
        }
    }
}

function closeCartModal() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        cartModal.setAttribute('aria-hidden', 'true');
    }
}

function renderCartItems() {
    const cartItemsDiv = document.getElementById('cartItems');
    const cartSubtotalSpan = document.getElementById('cartSubtotal');
    
    if (!cartItemsDiv) return;
    
    cartItemsDiv.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = `
            <div style="text-align: center; padding: 40px 20px;">
                <i class="fas fa-shopping-cart" style="font-size: 4rem; color: #ddd; margin-bottom: 20px;"></i>
                <p style="font-size: 1.2rem; color: #999;">Your cart is empty</p>
                <p style="color: #666;">Add some delicious salads to get started!</p>
            </div>
        `;
        if (cartSubtotalSpan) {
            cartSubtotalSpan.textContent = formatINR(0);
        }
        return;
    }
    
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${formatINR(item.price)} × ${item.quantity} = ${formatINR(item.price * item.quantity)}</p>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})" aria-label="Decrease quantity">
                    <i class="fas fa-minus"></i>
                </button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})" aria-label="Increase quantity">
                    <i class="fas fa-plus"></i>
                </button>
                <button class="remove-btn" onclick="removeFromCart(${item.id})" aria-label="Remove ${item.name}">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });
    
    if (cartSubtotalSpan) {
        cartSubtotalSpan.textContent = formatINR(cartSubtotal());
    }
}

window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.calcDeliveryCharge = calcDeliveryCharge;

// ========================================
// 7. CHECKOUT MODAL FUNCTIONS
// ========================================

function openCheckoutModal() {
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }
    
    const checkoutModal = document.getElementById('checkoutModal');
    if (checkoutModal) {
        renderCheckout();
        closeCartModal();
        checkoutModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        checkoutModal.setAttribute('aria-hidden', 'false');
        
        const firstInput = checkoutModal.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
    }
}

function closeCheckoutModal() {
    const checkoutModal = document.getElementById('checkoutModal');
    if (checkoutModal) {
        checkoutModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        checkoutModal.setAttribute('aria-hidden', 'true');
    }
}

function renderCheckout() {
    const subtotal = cartSubtotal();
    
    const checkoutSubtotal = document.getElementById('checkoutSubtotal');
    if (checkoutSubtotal) {
        checkoutSubtotal.textContent = formatINR(subtotal);
    }
    
    calcDeliveryCharge();
}

function calcDeliveryCharge() {
    const distanceInput = document.getElementById('distance');
    const deliveryChargeSpan = document.getElementById('deliveryCharge');
    const totalAmountSpan = document.getElementById('totalAmount');
    
    if (!distanceInput || !deliveryChargeSpan || !totalAmountSpan) return 0;
    
    const distance = parseFloat(distanceInput.value) || 0;
    let charge = 0;
    
    if (distance > 2) {
        charge = Math.ceil(distance - 2) * 20;
    }
    
    const subtotal = cartSubtotal();
    const total = subtotal + charge;
    
    deliveryChargeSpan.textContent = charge === 0 ? 'FREE' : formatINR(charge);
    totalAmountSpan.textContent = formatINR(total);
    
    return charge;
}

function processOrder(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    const name = formData.get('custName').trim();
    const phone = formData.get('custPhone').trim();
    const email = formData.get('custEmail').trim();
    const address = formData.get('custAddress').trim();
    const distance = parseFloat(formData.get('distance'));
    
    if (!name || !phone || !email || !address || isNaN(distance)) {
        showToast('Please complete all required fields correctly');
        return;
    }
    
    if (!/^[0-9]{10}$/.test(phone)) {
        showToast('Please enter a valid 10-digit phone number');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        
        const subtotal = cartSubtotal();
        const deliveryCharge = calcDeliveryCharge();
        const total = subtotal + deliveryCharge;
        
        closeCheckoutModal();
        showSuccessModal(name, total);
        clearCart();
        
        console.log('Order placed:', {
            customer: { name, phone, email, address },
            items: cart,
            subtotal,
            deliveryCharge,
            total,
            timestamp: new Date().toISOString()
        });
    }, 2000);
}

// ========================================
// 8. SUCCESS MODAL FUNCTIONS
// ========================================

function showSuccessModal(customerName, totalAmount) {
    const successModal = document.getElementById('successModal');
    const successMessage = document.getElementById('successMessage');
    
    if (successModal && successMessage) {
        successMessage.textContent = `Thank you, ${customerName}! Your order of ${formatINR(totalAmount)} has been confirmed. Your fresh salad will be delivered within 1 hour.`;
        
        successModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        successModal.setAttribute('aria-hidden', 'false');
        
        announceToScreenReader(`Order placed successfully`);
    }
}

function closeSuccessModal() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        successModal.setAttribute('aria-hidden', 'true');
    }
}

window.closeSuccessModal = closeSuccessModal;

// ========================================
// 9. TOAST NOTIFICATION SYSTEM
// ========================================

function showToast(message, type = 'success') {
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 10001;
            max-width: 350px;
        `;
        document.body.appendChild(toastContainer);
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.cssText = `
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#ff4444' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        margin-bottom: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideInRight 0.3s ease;
    `;
    
    const icon = type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// ========================================
// 10. STATS COUNTER ANIMATION
// ========================================

function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(stat);
    });
}

// ========================================
// 11. FAQ ACCORDION FUNCTIONALITY
// ========================================

function setupFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });
            
            if (!isActive) {
                faqItem.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

// ========================================
// 12. FORM VALIDATION & SUBMISSION
// ========================================

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            if (!name || !email || !message) {
                showToast('Please fill in all required fields', 'error');
                return;
            }
            
            showLoading();
            
            setTimeout(() => {
                hideLoading();
                showToast('Thank you! We will get back to you soon.');
                this.reset();
                
                console.log('Contact form submitted:', { name, email, message });
            }, 1500);
        });
    }
}

function setupNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (!email) {
                showToast('Please enter your email', 'error');
                return;
            }
            
            showLoading();
            
            setTimeout(() => {
                hideLoading();
                showToast('Successfully subscribed to newsletter!');
                this.reset();
                
                console.log('Newsletter subscription:', email);
            }, 1000);
        });
    }
}

function setupCheckoutForm() {
    const checkoutForm = document.getElementById('checkoutForm');
    
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', processOrder);
        
        const distanceInput = document.getElementById('distance');
        if (distanceInput) {
            distanceInput.addEventListener('input', calcDeliveryCharge);
        }
    }
}

// ========================================
// 13. BACK TO TOP BUTTON
// ========================================

function setupBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ========================================
// 14. MODAL MANAGEMENT
// ========================================

function setupModals() {
    const closeButtons = document.querySelectorAll('.close-btn');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            closeCartModal();
            closeCheckoutModal();
            closeSuccessModal();
        });
    });
    
    const continueShoppingBtn = document.querySelector('.continue-shopping-btn');
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', closeCartModal);
    }
    
    window.addEventListener('click', function(event) {
        const cartModal = document.getElementById('cartModal');
        const checkoutModal = document.getElementById('checkoutModal');
        const successModal = document.getElementById('successModal');
        
        if (event.target === cartModal) {
            closeCartModal();
        } else if (event.target === checkoutModal) {
            closeCheckoutModal();
        } else if (event.target === successModal) {
            closeSuccessModal();
        }
    });
    
    const cartButton = document.getElementById('cartButton');
    if (cartButton) {
        cartButton.addEventListener('click', openCartModal);
    }
    
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', openCheckoutModal);
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCartModal();
            closeCheckoutModal();
            closeSuccessModal();
        }
    });
}

// ========================================
// 15. ADD TO CART BUTTON HANDLERS
// ========================================

function setupCartButtons() {
    const menuGrid = document.getElementById('menuGrid');
    
    if (menuGrid) {
        menuGrid.addEventListener('click', function(e) {
            const addToCartBtn = e.target.closest('.add-to-cart');
            if (addToCartBtn) {
                const productId = parseInt(addToCartBtn.getAttribute('data-id'));
                addToCart(productId);
            }
        });
    }
}

// ========================================
// 16. INITIALIZATION
// ========================================

function init() {
    console.log('Crucial Healthy Salad - Initializing...');
    
    loadCart();
    renderMenu();
    
    setupNavigation();
    setupMenuFilters();
    setupCartButtons();
    setupModals();
    setupCheckoutForm();
    setupContactForm();
    setupNewsletterForm();
    setupFAQ();
    setupBackToTop();
    
    animateStats();
    updateCartCount();
    
    console.log('Crucial Healthy Salad - Ready!');
}

// ========================================
// 17. EVENT LISTENERS
// ========================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        updateCartCount();
    }
});

window.addEventListener('online', function() {
    showToast('You are back online!', 'success');
});

window.addEventListener('offline', function() {
    showToast('You are offline', 'error');
});

console.log('Crucial Healthy Salad Script Loaded Successfully!');
