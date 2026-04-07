document.addEventListener("DOMContentLoaded", () => {
  const products = [
    {
      name: "Beard Grooming Kit",
      price: 799,
      image: "images/BeardKit.png"
    },
    {
      name: "Charcoal Face Wash",
      price: 349,
      image: "images/CharcoalFacewash.jpg"
    },
    {
      name: "Matte Hair Wax",
      price: 299,
      image: "images/NishmanHairStylingWax.jpg"
    },
    {
      name: "Aloe After-Shave Balm",
      price: 399,
      image: "images/AloeAfterBalm.png"
    },
    {
      name: "Pocket Comb & Pouch Combo",
      price: 199,
      image: "images/CombCombo.png"
    },
    {
      name: "Premium Beard Trimmer",
      price: 1299,
      image: "images/Trimmer.png"
    }
  ];

  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  function addToCart(productIndex) {
    const product = products[productIndex];
    cartItems.push(product);
    localStorage.setItem("cart", JSON.stringify(cartItems));
    updateCartCount();
    alert(`${product.name} added to cart!`);
  }

  function renderProducts() {
    const container = document.getElementById("product-list");
    if (!container) return;

    container.innerHTML = "";
    products.forEach((product, index) => {
      const card = document.createElement("div");
      card.className = "col-md-4 mb-4";
      card.innerHTML = `
        <div class="card h-100">
          <img src="${product.image}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text text-muted">₹${product.price}</p>
            <button class="btn btn-primary" onclick="addToCart(${index})">Add to Cart</button>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  function updateCartCount() {
    const countSpan = document.getElementById("cart-count");
    if (countSpan) {
      countSpan.textContent = cartItems.length;
    }
  }

  function checkout() {
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0) * 100;
    if (totalAmount === 0) return alert("Cart is empty!");

    const options = {
      key: "rzp_test_YourTestKeyHere", // Replace with your actual Razorpay key
      amount: totalAmount,
      currency: "INR",
      name: "AuraGroom",
      description: "Order Payment",
      image: "https://yourwebsite.com/logo.png",
      handler: function (response) {
        alert("Payment successful! 🎉");
        cartItems = [];
        localStorage.setItem("cart", JSON.stringify(cartItems));
        updateCartCount();
      },
      prefill: {
        name: "AuraGroom Customer",
        email: "customer@example.com"
      },
      theme: {
        color: "#198754"
      }
    };
    const rzp = new Razorpay(options);
    rzp.open();
  }

  // Scroll to Top Logic
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if (scrollToTopBtn) {
    window.onscroll = function () {
      scrollToTopBtn.style.display =
        document.body.scrollTop > 300 || document.documentElement.scrollTop > 300 ? "block" : "none";
    };

    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // Expose globally
  window.addToCart = addToCart;
  window.checkout = checkout;

  // Init
  renderProducts();
  updateCartCount();
});
