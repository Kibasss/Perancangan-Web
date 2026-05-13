// Data produk: daftar sparepart yang dipakai oleh halaman beranda dan produk
const products = [
  {
    name: "V-Belt Vario 125 Gen 3",
    category: "CVT",
    price: "Rp 135.000",
    image: "assets/product-vbelt.svg"
  },
  {
    name: "Kampas Rem Depan",
    category: "Rem",
    price: "Rp 42.000",
    image: "assets/product-brake.svg"
  },
  {
    name: "Busi Motor Iridium",
    category: "Mesin",
    price: "Rp 58.000",
    image: "assets/product-sparkplug.svg"
  },
  {
    name: "Oli Mesin Matic",
    category: "Mesin",
    price: "Rp 49.000",
    image: "assets/product-oil.svg"
  },
  {
    name: "Roller Matic 12 Gram",
    category: "CVT",
    price: "Rp 36.000",
    image: "assets/product-roller.svg"
  },
  {
    name: "Spion Motor Universal",
    category: "Aksesoris",
    price: "Rp 65.000",
    image: "assets/product-mirror.svg"
  }
];

const productGrid = document.getElementById("productGrid");
const featuredGrid = document.getElementById("featuredGrid");
const resultInfo = document.getElementById("resultInfo");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

// Fungsi untuk membaca kata pencarian dari alamat halaman
function getQueryValue(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key) || "";
}

// Fungsi untuk membuat satu kartu produk
function createProductCard(product) {
  const productCard = document.createElement("article");
  productCard.className = "product-card";

  productCard.innerHTML = `
    <div class="product-image">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="product-info">
      <p class="product-category">${product.category}</p>
      <h3>${product.name}</h3>
      <p class="price">${product.price}</p>
      <button class="buy-button" type="button">Beli</button>
    </div>
  `;

  return productCard;
}

// Fungsi untuk menampilkan daftar produk ke dalam grid
function displayProducts(targetElement, productList) {
  targetElement.innerHTML = "";

  if (productList.length === 0) {
    targetElement.innerHTML = "<p>Produk tidak ditemukan.</p>";
    return;
  }

  productList.forEach(function (product) {
    targetElement.appendChild(createProductCard(product));
  });
}

// Menampilkan produk pilihan di halaman beranda
if (featuredGrid) {
  displayProducts(featuredGrid, products.slice(0, 4));
}

// Menampilkan produk lengkap di halaman produk
if (productGrid) {
  const keyword = getQueryValue("q").toLowerCase();
  const category = getQueryValue("kategori");

  const filteredProducts = products.filter(function (product) {
    const matchKeyword = product.name.toLowerCase().includes(keyword);
    const matchCategory = category === "" || product.category === category;
    return matchKeyword && matchCategory;
  });

  displayProducts(productGrid, filteredProducts);

  if (resultInfo && keyword !== "") {
    resultInfo.textContent = "Hasil pencarian untuk: " + keyword;
  }

  if (resultInfo && category !== "") {
    resultInfo.textContent = "Kategori: " + category;
  }
}

// Saat form pencarian dikirim, buka halaman produk dengan kata kunci pencarian
if (searchForm) {
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const keyword = searchInput.value.trim();
    window.location.href = "produk.html?q=" + encodeURIComponent(keyword);
  });
}
