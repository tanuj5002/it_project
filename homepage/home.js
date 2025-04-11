document.addEventListener("DOMContentLoaded", function () {
  // Set animation order for category cards
  document.querySelectorAll(".category-card").forEach((card, index) => {
    card.style.setProperty("--animation-order", index + 1);
  });
  // Set animation order for product cards
  document.querySelectorAll(".product-card").forEach((card, index) => {
    card.style.setProperty("--animation-order", index + 1);
  });
  // Sort functionality
  const sortSelect = document.querySelector("select");
  sortSelect.addEventListener("change", function () {
    const productGrid = document.querySelector(
      ".grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4"
    );
    const products = Array.from(productGrid.children);
    products.sort((a, b) => {
      switch (this.value) {
        case "newest":
          return (
            new Date(b.querySelector(".text-gray-500").textContent) -
            new Date(a.querySelector(".text-gray-500").textContent)
          );
        case "price_asc":
          return (
            parseFloat(
              a.querySelector(".text-primary").textContent.replace("₹", "")
            ) -
            parseFloat(
              b.querySelector(".text-primary").textContent.replace("₹", "")
            )
          );
        case "price_desc":
          return (
            parseFloat(
              b.querySelector(".text-primary").textContent.replace("₹", "")
            ) -
            parseFloat(
              a.querySelector(".text-primary").textContent.replace("₹", "")
            )
          );
        case "popular":
          return (
            parseInt(
              b.querySelector(".text-gray-500").textContent.match(/\d+/)[0]
            ) -
            parseInt(
              a.querySelector(".text-gray-500").textContent.match(/\d+/)[0]
            )
          );
        default:
          return 0;
      }
    });
    products.forEach((product) => productGrid.appendChild(product));
  });
  // Wishlist button animation
  const wishlistButtons = document.querySelectorAll(".product-card button");
  wishlistButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const icon = this.querySelector("i");
      if (icon.classList.contains("ri-heart-line")) {
        icon.classList.remove("ri-heart-line");
        icon.classList.add("ri-heart-fill");
        icon.classList.add("text-red-500");
        icon.style.transform = "scale(1.2)";
        setTimeout(() => {
          icon.style.transform = "scale(1)";
        }, 200);
      } else {
        icon.classList.add("ri-heart-line");
        icon.classList.remove("ri-heart-fill");
        icon.classList.remove("text-red-500");
      }
    });
  });
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const categoryCards = document.querySelectorAll(".category-card");
  const mainPage = document.querySelector("main");
  const electronicsPage = document.getElementById("electronics-page");
  const productDetailPage = document.getElementById("product-detail-page");
  categoryCards.forEach((card) => {
    card.addEventListener("click", function () {
      const category = this.querySelector("h3").textContent.trim();
      if (category === "Electronics") {
        mainPage.style.display = "none";
        electronicsPage.style.display = "block";
        productDetailPage.style.display = "none";
        window.scrollTo(0, 0);
      }
    });
  });
  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach((card) => {
    card.addEventListener("click", function () {
      mainPage.style.display = "none";
      electronicsPage.style.display = "none";
      productDetailPage.style.display = "block";
      window.scrollTo(0, 0);
      const productData = {
        title: this.querySelector("h3").textContent,
        price: this.querySelector(".text-primary").textContent,
        condition: this.querySelector(".text-green-600, .text-yellow-600")
          .textContent,
        category: this.querySelector(".text-gray-500").textContent,
        description: this.querySelector("p").textContent,
        image: this.querySelector("img").src,
        postedTime: this.querySelector(".text-gray-500:last-child").textContent,
      };
      document.getElementById("product-title").textContent = productData.title;
      document.getElementById("product-price").textContent = productData.price;
      document.getElementById("product-condition").textContent =
        productData.condition;
      document.getElementById("product-category").textContent =
        productData.category;
      document.getElementById("product-description").textContent =
        productData.description;
      document.getElementById("product-image").src = productData.image;
      document.getElementById("posted-time").textContent =
        productData.postedTime;
    });
  });
  const loadMoreBtn = document.querySelector(".bg-primary.text-white");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function () {
      this.innerHTML =
        '<i class="ri-loader-4-line animate-spin"></i> Loading...';
      setTimeout(() => {
        this.innerHTML = "Load More";
      }, 1500);
    });
  }
  const priceFilterBtns = document.querySelectorAll(".rounded-full");
  priceFilterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      priceFilterBtns.forEach((b) =>
        b.classList.remove("bg-primary", "text-white")
      );
      this.classList.add("bg-primary", "text-white");
    });
  });
  function showProductDetail() {
    const modal = document.getElementById("productDetailModal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";
  }
  function closeProductDetail() {
    const modal = document.getElementById("productDetailModal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "auto";
  }
  const thumbnails = document.querySelectorAll(".grid-cols-4 img");
  const mainImage = document.querySelector(".h-96 img");
  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", function () {
      mainImage.src = this.src;
      thumbnails.forEach((t) => t.parentElement.classList.remove("ring-2"));
      this.parentElement.classList.add("ring-2");
    });
  });
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeProductDetail();
    }
  });
});

function showMainPage() {
  document.querySelector("main").style.display = "block";
  document.getElementById("electronics-page").style.display = "none";
  document.getElementById("product-detail-page").style.display = "none";
  window.scrollTo(0, 0);
}
function showElectronicsPage() {
  document.querySelector("main").style.display = "none";
  document.getElementById("electronics-page").style.display = "block";
  document.getElementById("product-detail-page").style.display = "none";
  window.scrollTo(0, 0);
}
