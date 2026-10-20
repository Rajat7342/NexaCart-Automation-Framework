/* =========================
   PRODUCT DATA
========================= */

const products = {

    "Pro Laptop": {
        category: "Electronics",
        price: 1299,
        oldPrice: 1499,
        rating: 4.8,
        icon: "💻",
        description:
            "Experience next-generation performance with a premium design built for work, creativity and entertainment."
    },

    "Smart Watch": {
        category: "Electronics",
        price: 249,
        oldPrice: 299,
        rating: 4.7,
        icon: "⌚",
        description:
            "Track your health, stay connected and manage your day with a powerful smart watch designed for modern life."
    },

    "Urban Sneakers": {
        category: "Fashion",
        price: 129,
        oldPrice: 169,
        rating: 4.6,
        icon: "👟",
        description:
            "Modern everyday sneakers combining comfort, lightweight construction and a clean urban aesthetic."
    },

    "Wireless Headphones": {
        category: "Electronics",
        price: 179,
        oldPrice: 229,
        rating: 4.9,
        icon: "🎧",
        description:
            "Immerse yourself in crystal-clear audio with powerful sound, comfortable design and wireless freedom."
    },

    "Premium Sunglasses": {
        category: "Fashion",
        price: 199,
        oldPrice: 249,
        rating: 4.7,
        icon: "🕶️",
        description:
            "Premium sunglasses featuring a timeless design, lightweight frame and everyday UV protection."
    },

    "Urban Backpack": {
        category: "Fashion",
        price: 89,
        oldPrice: 119,
        rating: 4.5,
        icon: "🎒",
        description:
            "A sleek everyday backpack designed for work, travel and city life with smart storage."
    }

};


/* =========================
   GET PRODUCT
========================= */

const params = new URLSearchParams(window.location.search);

const productName =
    params.get("product") || "Pro Laptop";

const product =
    products[productName] || products["Pro Laptop"];


/* =========================
   DOM
========================= */

const productCategory =
    document.getElementById("productCategory");

const detailCategory =
    document.getElementById("detailCategory");

const productNameElement =
    document.getElementById("productName");

const productIcon =
    document.getElementById("productIcon");

const productPrice =
    document.getElementById("productPrice");

const oldPrice =
    document.getElementById("oldPrice");

const rating =
    document.getElementById("rating");

const productDescription =
    document.getElementById("productDescription");

const quantityElement =
    document.getElementById("quantity");

const minusButton =
    document.getElementById("minusButton");

const plusButton =
    document.getElementById("plusButton");

const addCartButton =
    document.getElementById("addCartButton");

const buyButton =
    document.getElementById("buyButton");

const productWishlist =
    document.getElementById("productWishlist");

const cartCount =
    document.getElementById("cartCount");

const toast =
    document.getElementById("toast");

const toastTitle =
    document.getElementById("toastTitle");

const toastMessage =
    document.getElementById("toastMessage");

let quantity = 1;


/* =========================
   LOAD PRODUCT
========================= */

productCategory.textContent =
    product.category;

detailCategory.textContent =
    product.category.toUpperCase();

productNameElement.textContent =
    productName;

productIcon.textContent =
    product.icon;

productPrice.textContent =
    `$${product.price}`;

oldPrice.textContent =
    `$${product.oldPrice}`;

rating.textContent =
    product.rating;

productDescription.textContent =
    product.description;


/* =========================
   DISCOUNT
========================= */

const discount =
    Math.round(
        ((product.oldPrice - product.price)
        / product.oldPrice) * 100
    );

document.querySelector(".discount").textContent =
    `${discount}% OFF`;


/* =========================
   QUANTITY
========================= */

plusButton.addEventListener("click", () => {

    if (quantity < 10) {
        quantity++;
        quantityElement.textContent = quantity;
    }

});


minusButton.addEventListener("click", () => {

    if (quantity > 1) {
        quantity--;
        quantityElement.textContent = quantity;
    }

});


/* =========================
   CART
========================= */

let cart = JSON.parse(
    localStorage.getItem("nexacart_cart")
) || [];


function saveCart() {

    localStorage.setItem(
        "nexacart_cart",
        JSON.stringify(cart)
    );

}


function updateCartCount() {

    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    cartCount.textContent =
        totalItems;

}


function addToCart() {

    const existing =
        cart.find(
            item =>
                item.name === productName
        );


    if (existing) {

        existing.quantity += quantity;

    } else {

        cart.push({

            name: productName,

            price: product.price,

            icon: product.icon,

            category: product.category,

            quantity: quantity

        });

    }


    saveCart();

    updateCartCount();

    showToast(
        "Added to Cart",
        `${quantity} × ${productName} added`
    );

}


addCartButton.addEventListener(
    "click",
    addToCart
);


/* =========================
   BUY NOW
========================= */

buyButton.addEventListener(
    "click",
    () => {

        addToCart();

        setTimeout(() => {

            showToast(
                "Ready for Checkout",
                "Checkout flow will open next."
            );

        }, 500);

    }
);


/* =========================
   WISHLIST
========================= */

let wishlist = JSON.parse(
    localStorage.getItem("nexacart_wishlist")
) || [];


function updateWishlistButton() {

    const exists =
        wishlist.includes(productName);

    productWishlist.classList.toggle(
        "liked",
        exists
    );

    productWishlist.textContent =
        exists ? "♥" : "♡";

}


productWishlist.addEventListener(
    "click",
    () => {

        const index =
            wishlist.indexOf(productName);


        if (index === -1) {

            wishlist.push(productName);

            showToast(
                "Wishlist",
                "Product saved to wishlist."
            );

        } else {

            wishlist.splice(index, 1);

            showToast(
                "Wishlist",
                "Product removed from wishlist."
            );

        }


        localStorage.setItem(
            "nexacart_wishlist",
            JSON.stringify(wishlist)
        );


        updateWishlistButton();

    }
);


/* =========================
   NAVIGATION
========================= */

function goBack() {

    window.location.href =
        "dashboard.html";

}


document
    .getElementById("cartButton")
    .addEventListener(
        "click",
        () => {

            showToast(
                "Cart",
                `${cart.length} product type(s) in your cart.`
            );

        }
    );


document
    .getElementById("wishlistButton")
    .addEventListener(
        "click",
        () => {

            showToast(
                "Wishlist",
                `${wishlist.length} item(s) saved.`
            );

        }
    );


/* =========================
   TOAST
========================= */

let toastTimer;


function showToast(title, message) {

    toastTitle.textContent =
        title;

    toastMessage.textContent =
        message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2800);

}


/* =========================
   CURSOR
========================= */

const cursorDot =
    document.querySelector(".cursor-dot");

const cursorRing =
    document.querySelector(".cursor-ring");


let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;


document.addEventListener(
    "mousemove",
    event => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        cursorDot.style.left =
            `${mouseX}px`;

        cursorDot.style.top =
            `${mouseY}px`;

    }
);


function animateCursor() {

    ringX +=
        (mouseX - ringX) * .14;

    ringY +=
        (mouseY - ringY) * .14;


    cursorRing.style.left =
        `${ringX}px`;

    cursorRing.style.top =
        `${ringY}px`;


    requestAnimationFrame(
        animateCursor
    );

}


animateCursor();


/* =========================
   CURSOR HOVER
========================= */

document
    .querySelectorAll("button, .brand")
    .forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                cursorRing.style.width =
                    "55px";

                cursorRing.style.height =
                    "55px";

                cursorRing.style.background =
                    "rgba(255,255,255,.06)";

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                cursorRing.style.width =
                    "34px";

                cursorRing.style.height =
                    "34px";

                cursorRing.style.background =
                    "transparent";

            }
        );

    });


/* =========================
   PRODUCT TILT
========================= */

const imageCard =
    document.querySelector(".main-image-card");


imageCard.addEventListener(
    "mousemove",
    event => {

        const rect =
            imageCard.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;


        const rotateY =
            ((x / rect.width) - .5) * 8;

        const rotateX =
            ((y / rect.height) - .5) * -8;


        imageCard.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)`;

    }
);


imageCard.addEventListener(
    "mouseleave",
    () => {

        imageCard.style.transform =
            "perspective(900px) rotateX(0) rotateY(0)";

    }
);


/* =========================
   INITIALIZE
========================= */

updateCartCount();

updateWishlistButton();