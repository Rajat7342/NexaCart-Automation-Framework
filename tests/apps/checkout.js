/* =========================
   CART
========================= */

let cart = JSON.parse(
    localStorage.getItem("nexacart_cart")
) || [];


/* =========================
   DOM
========================= */

const summaryItems =
    document.getElementById("summaryItems");

const itemCount =
    document.getElementById("itemCount");

const subtotalElement =
    document.getElementById("subtotal");

const shippingElement =
    document.getElementById("shipping");

const taxElement =
    document.getElementById("tax");

const totalElement =
    document.getElementById("total");

const placeOrder =
    document.getElementById("placeOrder");

const successOverlay =
    document.getElementById("successOverlay");


/* =========================
   ORDER SUMMARY
========================= */

function renderOrder() {

    summaryItems.innerHTML = "";

    if (cart.length === 0) {

        summaryItems.innerHTML = `
            <div style="
                padding:30px 0;
                text-align:center;
                color:rgba(255,255,255,.35);
                font-size:12px;
            ">
                Your cart is empty.
            </div>
        `;

        itemCount.textContent = "0 items";

        subtotalElement.textContent = "$0";
        shippingElement.textContent = "$0";
        taxElement.textContent = "$0";
        totalElement.textContent = "$0";

        return;
    }


    let subtotal = 0;
    let totalQuantity = 0;


    cart.forEach(item => {

        subtotal +=
            item.price * item.quantity;

        totalQuantity +=
            item.quantity;


        const itemElement =
            document.createElement("div");

        itemElement.className =
            "summary-item";


        itemElement.innerHTML = `

            <div class="summary-item-icon">
                ${item.icon}
            </div>

            <div class="summary-item-info">

                <strong>
                    ${item.name}
                </strong>

                <span>
                    ${item.category} · Qty ${item.quantity}
                </span>

            </div>

            <div class="summary-item-price">
                $${item.price * item.quantity}
            </div>

        `;


        summaryItems.appendChild(
            itemElement
        );

    });


    const shipping =
        subtotal >= 50 ? 0 : 9;

    const tax =
        subtotal * 0.08;

    const total =
        subtotal + shipping + tax;


    itemCount.textContent =
        `${totalQuantity} item${totalQuantity !== 1 ? "s" : ""}`;


    subtotalElement.textContent =
        `$${subtotal.toFixed(2)}`;

    shippingElement.textContent =
        shipping === 0
            ? "FREE"
            : `$${shipping.toFixed(2)}`;

    taxElement.textContent =
        `$${tax.toFixed(2)}`;

    totalElement.textContent =
        `$${total.toFixed(2)}`;

}


renderOrder();


/* =========================
   PAYMENT METHOD
========================= */

const paymentOptions =
    document.querySelectorAll(
        ".payment-option"
    );

const cardFields =
    document.getElementById(
        "cardFields"
    );


paymentOptions.forEach(option => {

    option.addEventListener(
        "click",
        () => {

            paymentOptions.forEach(
                item =>
                    item.classList.remove(
                        "active"
                    )
            );

            option.classList.add(
                "active"
            );


            const method =
                option.dataset.payment;


            if (method === "card") {

                cardFields.style.display =
                    "block";

            } else {

                cardFields.style.display =
                    "none";

            }

        }
    );

});


/* =========================
   FORM VALIDATION
========================= */

function validateForm() {

    const requiredFields = [

        {
            id: "email",
            name: "Email"
        },

        {
            id: "firstName",
            name: "First Name"
        },

        {
            id: "lastName",
            name: "Last Name"
        },

        {
            id: "address",
            name: "Address"
        },

        {
            id: "city",
            name: "City"
        },

        {
            id: "postalCode",
            name: "Postal Code"
        },

        {
            id: "phone",
            name: "Phone"
        }

    ];


    for (const field of requiredFields) {

        const element =
            document.getElementById(
                field.id
            );


        if (!element.value.trim()) {

            element.focus();

            alert(
                `${field.name} is required.`
            );

            return false;

        }

    }


    const email =
        document.getElementById(
            "email"
        ).value.trim();


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        document
            .getElementById("email")
            .focus();

        alert(
            "Please enter a valid email address."
        );

        return false;

    }


    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return false;

    }


    return true;

}


/* =========================
   PLACE ORDER
========================= */

placeOrder.addEventListener(
    "click",
    () => {

        if (!validateForm()) {
            return;
        }


        placeOrder.disabled = true;

        placeOrder.innerHTML =
            "Processing Order...";


        setTimeout(() => {

            const orderNumber =
                Math.floor(
                    100000 +
                    Math.random() * 900000
                );


            document
                .getElementById(
                    "orderNumber"
                )
                .textContent =
                orderNumber;


            successOverlay.classList.add(
                "active"
            );


            localStorage.removeItem(
                "nexacart_cart"
            );


        }, 1200);

    }
);


/* =========================
   HOME
========================= */

function goHome() {

    window.location.href =
        "dashboard.html";

}


/* =========================
   CURSOR
========================= */

const cursorDot =
    document.querySelector(
        ".cursor-dot"
    );

const cursorRing =
    document.querySelector(
        ".cursor-ring"
    );


let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;


document.addEventListener(
    "mousemove",
    event => {

        mouseX =
            event.clientX;

        mouseY =
            event.clientY;


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
    .querySelectorAll(
        "button, input, .brand"
    )
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
   CHECKOUT NAVIGATION
========================= */

const checkoutBtn = document.getElementById("checkoutButton");

if (checkoutBtn) {

    checkoutBtn.addEventListener("click", function () {

        // Read the latest cart directly from localStorage
        const savedCart =
            JSON.parse(localStorage.getItem("nexacart_cart")) || [];

        console.log("Checkout clicked");
        console.log("Cart:", savedCart);

        // Empty cart
        if (savedCart.length === 0) {

            if (typeof showToast === "function") {

                showToast(
                    "Cart is Empty",
                    "Add a product before checkout."
                );

            } else {

                alert("Your cart is empty.");

            }

            return;
        }

        // Go to checkout
        window.location.href = "checkout.html";

    });

} else {

    console.error(
        "Checkout button not found: #checkoutButton"
    );

}