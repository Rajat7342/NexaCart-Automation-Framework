// ========================================
// NEXACART DASHBOARD
// ========================================


// ========================================
// CURSOR
// ========================================

const cursorDot =
    document.querySelector(".cursor-dot");

const cursorRing =
    document.querySelector(".cursor-ring");


let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;


document.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    cursorDot.style.left =
        `${mouseX}px`;

    cursorDot.style.top =
        `${mouseY}px`;

});


function animateCursor() {

    ringX +=
        (mouseX - ringX) * 0.12;

    ringY +=
        (mouseY - ringY) * 0.12;


    cursorRing.style.left =
        `${ringX}px`;

    cursorRing.style.top =
        `${ringY}px`;


    requestAnimationFrame(
        animateCursor
    );
}


animateCursor();


// ========================================
// CURSOR HOVER
// ========================================

const interactiveElements =
    document.querySelectorAll(
        "button, a, input, .product-card, .category-card"
    );


interactiveElements.forEach((element) => {

    element.addEventListener(
        "mouseenter",
        () => {

            cursorRing.classList.add(
                "hover"
            );

        }
    );


    element.addEventListener(
        "mouseleave",
        () => {

            cursorRing.classList.remove(
                "hover"
            );

        }
    );

});


// ========================================
// TOAST
// ========================================

const toast =
    document.getElementById("toast");


function showToast(
    title,
    message
) {

    const titleElement =
        toast.querySelector("strong");

    const messageElement =
        toast.querySelector("small");


    titleElement.textContent =
        title;

    messageElement.textContent =
        message;


    toast.classList.add("show");


    clearTimeout(
        window.toastTimer
    );


    window.toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2200);

}


// ========================================
// CART SYSTEM
// ========================================

const cartButton =
    document.getElementById(
        "cartButton"
    );


const cartDrawer =
    document.getElementById(
        "cartDrawer"
    );


const cartCount =
    document.getElementById(
        "cartCount"
    );


const cartItemsContainer =
    document.getElementById(
        "cartItems"
    );


const cartTotal =
    document.getElementById(
        "cartTotal"
    );


const closeCart =
    document.getElementById(
        "closeCart"
    );


const drawerOverlay =
    document.getElementById(
        "drawerOverlay"
    );


const checkoutButton =
    document.getElementById(
        "checkoutButton"
    );


let cart = JSON.parse(
    localStorage.getItem("nexacart_cart")
) || [];


function updateCart() {

    localStorage.setItem(
        "nexacart_cart",
        JSON.stringify(cart)
    );


    cartCount.textContent =
        cart.length;


    cartItemsContainer.innerHTML =
        "";


    if (cart.length === 0) {

        cartItemsContainer.innerHTML = `

            <div class="empty-state">

                <span>🛒</span>

                <h3>Your cart is empty</h3>

                <p>
                    Add something you love.
                </p>

            </div>

        `;


        cartTotal.textContent =
            "$0";


        return;
    }


    let total = 0;


    cart.forEach(
        (item, index) => {

            total += item.price;


            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "cart-item";


            element.innerHTML = `

                <div class="cart-item-image">
                    ${item.icon}
                </div>

                <div class="cart-item-info">

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        $${item.price.toLocaleString()}
                    </p>

                </div>

                <button
                    class="remove-cart"
                    data-index="${index}"
                >
                    Remove
                </button>

            `;


            cartItemsContainer
                .appendChild(element);

        }
    );


    cartTotal.textContent =
        `$${total.toLocaleString()}`;


    document
        .querySelectorAll(".remove-cart")
        .forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    cart.splice(
                        index,
                        1
                    );


                    updateCart();


                    showToast(
                        "Removed",
                        "Product removed from cart"
                    );

                }
            );

        });

}


// ========================================
// OPEN CART
// ========================================

function openCart() {

    cartDrawer.classList.add(
        "active"
    );

    drawerOverlay.classList.add(
        "active"
    );

}


// ========================================
// CLOSE DRAWERS
// ========================================

function closeDrawers() {

    cartDrawer.classList.remove(
        "active"
    );

    wishlistDrawer.classList.remove(
        "active"
    );

    drawerOverlay.classList.remove(
        "active"
    );

}


cartButton.addEventListener(
    "click",
    openCart
);


closeCart.addEventListener(
    "click",
    closeDrawers
);


drawerOverlay.addEventListener(
    "click",
    closeDrawers
);


// ========================================
// ADD TO CART
// ========================================

const addButtons =
    document.querySelectorAll(
        ".add-cart"
    );


const productIcons = {

    "Pro Laptop": "💻",

    "Smart Watch": "⌚",

    "Urban Sneakers": "👟",

    "Wireless Headphones": "🎧",

    "Premium Sunglasses": "🕶️",

    "Urban Backpack": "🎒"

};


addButtons.forEach((button) => {

    button.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();


            const card =
                button.closest(
                    ".product-card"
                );


            const name =
                card.dataset.product;


            const price =
                Number(
                    card.dataset.price
                );


            cart.push({

                name: name,

                price: price,

                icon:
                    productIcons[name] || "📦"

            });


            updateCart();


            // Cart badge animation

            cartCount.animate(

                [
                    {
                        transform:
                            "scale(1)"
                    },

                    {
                        transform:
                            "scale(1.5)"
                    },

                    {
                        transform:
                            "scale(1)"
                    }

                ],

                {
                    duration: 450
                }

            );


            showToast(
                "Added to cart",
                `${name} added successfully`
            );

        }
    );

});


// ========================================
// CHECKOUT
// ========================================

checkoutButton.addEventListener(
    "click",
    () => {

        if (cart.length === 0) {

            showToast(
                "Cart is empty",
                "Add a product first"
            );

            return;
        }


        showToast(
            "Checkout",
            "Checkout page coming next"
        );

    }
);


// ========================================
// WISHLIST
// ========================================

const wishlistButton =
    document.getElementById(
        "wishlistButton"
    );


const wishlistDrawer =
    document.getElementById(
        "wishlistDrawer"
    );


const closeWishlist =
    document.getElementById(
        "closeWishlist"
    );


const wishlistItemsContainer =
    document.getElementById(
        "wishlistItems"
    );


const wishlistButtons =
    document.querySelectorAll(
        ".wishlist"
    );


let wishlist = [];


wishlistButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();


                const card =
                    button.closest(
                        ".product-card"
                    );


                const name =
                    card.dataset.product;


                const category =
                    card.dataset.category;


                const price =
                    Number(
                        card.dataset.price
                    );


                const existing =
                    wishlist.find(
                        item =>
                            item.name === name
                    );


                if (existing) {

                    wishlist =
                        wishlist.filter(
                            item =>
                                item.name !== name
                        );


                    button.textContent =
                        "♡";


                    button.classList.remove(
                        "liked"
                    );


                    showToast(
                        "Removed",
                        `${name} removed from wishlist`
                    );

                } else {

                    wishlist.push({

                        name: name,

                        category: category,

                        price: price,

                        icon:
                            productIcons[name] ||
                            "📦"

                    });


                    button.textContent =
                        "♥";


                    button.classList.add(
                        "liked"
                    );


                    showToast(
                        "Wishlist",
                        `${name} saved successfully`
                    );

                }


                updateWishlist();

            }
        );

    }
);


// ========================================
// UPDATE WISHLIST
// ========================================

function updateWishlist() {

    wishlistItemsContainer
        .innerHTML = "";


    if (wishlist.length === 0) {

        wishlistItemsContainer.innerHTML = `

            <div class="empty-state">

                <span>♡</span>

                <h3>
                    Your wishlist is empty
                </h3>

                <p>
                    Save products you love.
                </p>

            </div>

        `;

        return;
    }


    wishlist.forEach(
        (item) => {

            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "cart-item";


            element.innerHTML = `

                <div class="cart-item-image">
                    ${item.icon}
                </div>

                <div class="cart-item-info">

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        $${item.price.toLocaleString()}
                    </p>

                </div>

            `;


            wishlistItemsContainer
                .appendChild(element);

        }
    );

}


// ========================================
// OPEN WISHLIST
// ========================================

wishlistButton.addEventListener(
    "click",
    () => {

        updateWishlist();


        wishlistDrawer.classList.add(
            "active"
        );


        drawerOverlay.classList.add(
            "active"
        );

    }
);


closeWishlist.addEventListener(
    "click",
    closeDrawers
);


// ========================================
// SEARCH
// ========================================

const searchInput =
    document.getElementById(
        "navSearch"
    );


const products =
    document.querySelectorAll(
        ".product-card"
    );


searchInput.addEventListener(
    "input",
    () => {

        const term =
            searchInput.value
                .toLowerCase()
                .trim();


        products.forEach(
            (product) => {

                const name =
                    product.dataset.product
                        .toLowerCase();


                const category =
                    product.dataset.category
                        .toLowerCase();


                if (
                    name.includes(term) ||
                    category.includes(term)
                ) {

                    product.style.display =
                        "";

                } else {

                    product.style.display =
                        "none";

                }

            }
        );

    }
);


// ========================================
// CATEGORY FILTER
// ========================================

const categories =
    document.querySelectorAll(
        ".category-card"
    );


categories.forEach(
    (category) => {

        category.addEventListener(
            "click",
            () => {

                const selected =
                    category.dataset.category;


                categories.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                category.classList.add(
                    "active"
                );


                productTabs.forEach(
                    tab => {

                        tab.classList.remove(
                            "active"
                        );


                        if (
                            tab.dataset.filter ===
                            selected
                        ) {

                            tab.classList.add(
                                "active"
                            );

                        }

                    }
                );


                filterProducts(
                    selected
                );


                document
                    .getElementById("shop")
                    .scrollIntoView({
                        behavior:
                            "smooth"
                    });

            }
        );

    }
);


// ========================================
// PRODUCT TABS
// ========================================

const productTabs =
    document.querySelectorAll(
        ".product-tabs button"
    );


productTabs.forEach(
    (tab) => {

        tab.addEventListener(
            "click",
            () => {

                const filter =
                    tab.dataset.filter;


                productTabs.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                tab.classList.add(
                    "active"
                );


                filterProducts(
                    filter
                );

            }
        );

    }
);


// ========================================
// FILTER PRODUCTS
// ========================================

function filterProducts(
    filter
) {

    products.forEach(
        (product) => {

            const category =
                product.dataset.category;


            if (
                filter === "All" ||
                category === filter
            ) {

                product.style.display =
                    "";

            } else {

                product.style.display =
                    "none";

            }

        }
    );

}


// ========================================
// VIEW ALL
// ========================================

const viewAllButton =
    document.getElementById(
        "viewAllButton"
    );


viewAllButton.addEventListener(
    "click",
    () => {

        searchInput.value = "";


        productTabs.forEach(
            tab => {

                tab.classList.remove(
                    "active"
                );

            }
        );


        productTabs[0]
            .classList.add(
                "active"
            );


        categories.forEach(
            category => {

                category.classList.remove(
                    "active"
                );

            }
        );


        categories[0]
            .classList.add(
                "active"
            );


        filterProducts(
            "All"
        );

    }
);


// ========================================
// SHOP NOW
// ========================================

const shopNowButton =
    document.getElementById(
        "shopNowButton"
    );


shopNowButton.addEventListener(
    "click",
    () => {

        document
            .getElementById("shop")
            .scrollIntoView({
                behavior:
                    "smooth"
            });

    }
);


// ========================================
// EXPLORE DEALS
// ========================================

const exploreDealsButton =
    document.getElementById(
        "exploreDealsButton"
    );


exploreDealsButton.addEventListener(
    "click",
    () => {

        showToast(
            "Exclusive Deals",
            "Special offers coming soon"
        );

    }
);


// ========================================
// PROFILE
// ========================================

const profileButton =
    document.getElementById(
        "profileButton"
    );


profileButton.addEventListener(
    "click",
    () => {

        showToast(
            "Profile",
            "Profile dashboard coming next"
        );

    }
);


// ========================================
// HERO PRODUCT
// ========================================

const heroProductButton =
    document.getElementById(
        "heroProductButton"
    );


heroProductButton.addEventListener(
    "click",
    () => {

        showToast(
            "Pro Laptop",
            "Product details coming next"
        );

    }
);


// ========================================
// HELP
// ========================================

const helpButton =
    document.getElementById(
        "helpButton"
    );


helpButton.addEventListener(
    "click",
    () => {

        showToast(
            "NexaCart Support",
            "How can we help you?"
        );

    }
);


// ========================================
// KEYBOARD SEARCH
// ========================================

document.addEventListener(
    "keydown",
    (event) => {

        if (
            (event.ctrlKey ||
             event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            searchInput.focus();

        }


        if (event.key === "Escape") {

            closeDrawers();

        }

    }
);


// ========================================
// PRODUCT 3D TILT
// ========================================

products.forEach(
    (card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    (y - centerY) / 30;


                const rotateY =
                    (centerX - x) / 30;


                card.style.transform =
                    `perspective(800px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    }
);


// ========================================
// HERO SLIDER INDICATOR
// ========================================

const slideDots =
    document.querySelectorAll(
        ".slide-indicator span"
    );


let currentSlide = 0;


setInterval(
    () => {

        slideDots[currentSlide]
            .classList.remove(
                "active"
            );


        currentSlide =
            (currentSlide + 1) %
            slideDots.length;


        slideDots[currentSlide]
            .classList.add(
                "active"
            );

    },
    3000
);
/* =========================
   PRODUCT DETAILS NAVIGATION
========================= */

document.querySelectorAll(".product-card").forEach(card => {

    card.addEventListener("click", (event) => {

        // Don't open product page when clicking
        // Add to Cart or Wishlist
        if (
            event.target.closest(".add-cart") ||
            event.target.closest(".wishlist")
        ) {
            return;
        }

        const productName =
            card.dataset.product;

        if (!productName) {
            return;
        }

        window.location.href =
            `product.html?product=${encodeURIComponent(productName)}`;

    });

});