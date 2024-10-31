<template>
  <div class="container">
    <div>
      <header class="navbar">
        <div class="logo">
          <img src="/image/logo.svg" alt="Logo" class="logo-img" />
        </div>
        <nav class="nav-links">
          <a href="#" class="nav-link">Home</a>
          <a href="#" class="nav-link">About Us</a>
          <a href="#" class="nav-link">Service</a>
        </nav>
        <div class="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            class="search-input"
          />
        </div>
        <div class="user-icons">
          <div class="icon">
            <img src="/image/user.svg" alt="User Icon" class="icon-image" />
          </div>
          <div class="icon cart-icon" @click="toggleCart">
            <img src="/image/cart.png" alt="Cart Icon" class="icon-image" />
            <span class="cart-count" v-if="cart.length > 0">{{
              cart.length
            }}</span>
          </div>
        </div>
      </header>

      <div class="greeting">
        <h1 class="section-title">Welcome to LuuzD</h1>
        <p class="content">
          Are you looking for classic handbags to pair with your office attire,
          elegant crossbody bags that can accompany you from morning to night,
          chic clutches that add charm to a date night, or practical backpacks
          as your new companion? Browse through our bag designs to find the
          stylish companion you'll carry with you time and time again.
        </p>
      </div>
      <div class="picture">
        <img
          src="https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dwd9810a04/images/hi-res/2024-L2-CK2-20782328-K5-2.jpg?sw=756&sh=1008"
          alt="//"
        />
        <img
          src="https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dwb7545037/images/hi-res/2024-L2-CK2-50782311-09-2.jpg?sw=756&sh=1008"
          alt="//"
        />
        <img
          src="https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dw5846d5fd/images/hi-res/2024-L2-CK2-41220016-1-J8-2.jpg?sw=756&sh=1008"
          alt="//"
        />
      </div>
    </div>

    <main>
      <div class="product-cost">
        <div class="title">
          <p>Danh sách sản phẩm</p>
        </div>

        <div class="product-list">
          <div
            v-for="product in products"
            :key="product.id"
            class="product-card"
          >
            <div v-if="product.hot" class="hot-label">Hot Product</div>
            <img
              :src="product.currentImage || product.image"
              :alt="product.name"
              class="product-image"
            />

            <div class="product-info">
              <div class="product-item">
                <div class="product-info-left">
                  <h3 class="product-name">{{ product.name }}</h3>
                  <p class="product-date">
                    Ngày phát hành: {{ product.publicDate }}
                  </p>
                  <p class="product-brand">Nhãn hiệu: {{ product.brand }}</p>
                  <div class="detail">
                    <button class="detail-btn" @click="viewDetails(product)">
                      Detail Product
                    </button>
                  </div>
                </div>

                <div class="product-info-right">
                  <p class="product-price">${{ product.price }}</p>

                  <div class="product-colors">
                    <div
                      v-for="color in product.colors"
                      :key="color.name"
                      class="color-swatch"
                      :class="{ 'out-of-stock': color.quantity === 0 }"
                      :style="{
                        backgroundColor: color.code,
                        opacity: color.quantity === 0 ? 0.5 : 1,
                      }"
                      :title="`${color.name} - Còn ${color.quantity} sản phẩm`"
                      @mouseover="handleColorHover(product, color)"
                      @mouseleave="handleColorLeave(product)"
                    ></div>
                  </div>

                  <div class="cart-section">
                    <img
                      src="/image/cartadd.png"
                      alt="Cart Icon"
                      class="cartadd-image"
                      :class="{ disabled: isProductOutOfStock(product) }"
                      @click="addToCart(product)"
                      :style="{
                        opacity: isProductOutOfStock(product) ? 0.5 : 1,
                      }"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal for Product Details -->
      <div v-if="selectedProduct" class="modal">
        <div class="modal-content">
          <span class="close" @click="closeModal">&times;</span>
          <h2>{{ selectedProduct.name }}</h2>
          <img
            :src="selectedProduct.image"
            alt="Product Image"
            class="product-image"
          />
          <p>Price: ${{ selectedProduct.price }}</p>
          <p>Release Date: {{ selectedProduct.publicDate }}</p>
          <p>Brand: {{ selectedProduct.brand }}</p>
          <p>Description: {{ selectedProduct.description }}</p>
        </div>
      </div>
    </main>
    <CartPage
      v-if="showCart"
      :is-cart-open="showCart"
      :cart-items="cart"
      @update:cart-items="updateCart"
      @close="toggleCart"
    />
  </div>
</template>

<script setup>
import CartPage from './CartPage.vue'
import { ref } from 'vue'

const products = ref([
  {
    id: 1,
    name: 'Apfra Quilted Chain-Handle',
    price: 120,
    publicDate: '05-05-2021',
    image:
      'https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dw40624812/images/hi-res/2023-L3-CK2-80781893-2-01-1.jpg?sw=756&sh=1008',

    currentImage: null,
    hot: false,
    brand: 'C&K',
    description: 'A stylish quilted bag with a chain handle.',
    quantity: 1,
    colors: [
      {
        name: 'black',
        code: '#000000',
        image:
          'https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dw40624812/images/hi-res/2023-L3-CK2-80781893-2-01-1.jpg?sw=756&sh=1008',

        quantity: 0,
      },
      {
        name: 'florawhite',
        code: '#FFFAF0',
        image:
          'https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dw4f15eb25/images/hi-res/2024-L7-CK2-30271420-01-1.jpg?sw=504&sh=672',

        quantity: 5,
      },
      {
        name: 'gray',
        code: '#CFCFCF',
        image:
          'https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dw8587f7b3/images/hi-res/2023-L7-CK2-80160156-29-1.jpg?sw=1152&sh=1536',

        quantity: 3,
      },
    ],
  },
  {
    id: 1,
    name: 'Apfra Quilted Chain-Handle',
    price: 120,
    publicDate: '05-05-2021',
    image:
      'https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dw4f15eb25/images/hi-res/2024-L7-CK2-30271420-01-1.jpg?sw=504&sh=672',
    currentImage: null,
    hot: false,
    brand: 'C&K',
    description: 'A stylish quilted bag with a chain handle.',
    quantity: 1,
    colors: [
      {
        name: 'black',
        code: '#000000',
        image:
          'https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dw40624812/images/hi-res/2023-L3-CK2-80781893-2-01-1.jpg?sw=756&sh=1008',
      },
      {
        name: 'florawhite',
        code: '#FFFAF0',
        image:
          'https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dw4f15eb25/images/hi-res/2024-L7-CK2-30271420-01-1.jpg?sw=504&sh=672',
      },
      {
        name: 'gray',
        code: '#CFCFCF',
        image:
          'https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dw8587f7b3/images/hi-res/2023-L7-CK2-80160156-29-1.jpg?sw=1152&sh=1536',
      },
    ],
  },
  {
    id: 1,
    name: 'Apfra Quilted Chain-Handle',
    price: 120,
    publicDate: '05-05-2021',
    image:
      'https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dw4f15eb25/images/hi-res/2024-L7-CK2-30271420-01-1.jpg?sw=504&sh=672',
    currentImage: null,
    hot: false,
    brand: 'C&K',
    description: 'A stylish quilted bag with a chain handle.',
    quantity: 1,
    colors: [
      {
        name: 'black',
        code: '#000000',
        image:
          'https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dw40624812/images/hi-res/2023-L3-CK2-80781893-2-01-1.jpg?sw=756&sh=1008',
      },
      {
        name: 'florawhite',
        code: '#FFFAF0',
        image:
          'https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dw4f15eb25/images/hi-res/2024-L7-CK2-30271420-01-1.jpg?sw=504&sh=672',
      },
      {
        name: 'gray',
        code: '#CFCFCF',
        image:
          'https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dw8587f7b3/images/hi-res/2023-L7-CK2-80160156-29-1.jpg?sw=1152&sh=1536',
      },
    ],
  },
  {
    id: 1,
    name: 'Apfra Quilted Chain-Handle',
    price: 120,
    publicDate: '05-05-2021',
    image:
      'https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dw4f15eb25/images/hi-res/2024-L7-CK2-30271420-01-1.jpg?sw=504&sh=672',
    currentImage: null,
    hot: false,
    brand: 'C&K',
    description: 'A stylish quilted bag with a chain handle.',
    quantity: 1,
    colors: [
      {
        name: 'black',
        code: '#000000',
        image:
          'https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dw40624812/images/hi-res/2023-L3-CK2-80781893-2-01-1.jpg?sw=756&sh=1008',
      },
      {
        name: 'florawhite',
        code: '#FFFAF0',
        image:
          'https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dw4f15eb25/images/hi-res/2024-L7-CK2-30271420-01-1.jpg?sw=504&sh=672',
      },
      {
        name: 'gray',
        code: '#CFCFCF',
        image:
          'https://www.charleskeith.vn/dw/image/v2/BCWJ_PRD/on/demandware.static/-/Sites-vn-products/default/dw8587f7b3/images/hi-res/2023-L7-CK2-80160156-29-1.jpg?sw=1152&sh=1536',
      },
    ],
  },
])

const handleColorHover = (product, color) => {
  if (color.image) {
    product.currentImage = color.image
  }
}

const handleColorLeave = product => {
  product.currentImage = product.image
}

const selectedProduct = ref(null)
const showCart = ref(false)
const cart = ref([])

const viewDetails = product => {
  selectedProduct.value = product
}

const closeModal = () => {
  selectedProduct.value = null
}

const isProductOutOfStock = product => {
  return product.colors.every(color => color.quantity === 0)
}

const addToCart = product => {
  if (isProductOutOfStock(product)) {
    alert('Sản phẩm hiện đang hết hàng!')
    return
  }

  const existingProduct = cart.value.find(item => item.id === product.id)
  if (existingProduct) {
    const hasAvailableStock = product.colors.some(color => color.quantity > 0)
    if (!hasAvailableStock) {
      alert('Sản phẩm đã hết hàng!')
      return
    }
    existingProduct.quantity += 1
  } else {
    cart.value.push({
      ...product,
      quantity: 1,
      inStock: !isProductOutOfStock(product),
      discount: 0,
    })
  }
  alert(`Đã thêm ${product.name} vào giỏ hàng!`)
}
const toggleCart = () => {
  showCart.value = !showCart.value
}

const updateCart = newItems => {
  cart.value = newItems
}

//Phần thanh toán ở file CartPage
</script>
<style scoped>
.container {
  padding: 20px;
  max-width: 1500px;
  background-color: white;
}
/*header--------------------------------*/
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  color: white;
  width: 1100px;
  padding-bottom: 50px;
  padding-right: 20px;
}
.h2 {
  font-weight: bold;
}
.logo-img {
  width: 50px;
}
.logo h1 {
  margin: 0;
}
.nav-links {
  display: flex;
  margin-left: 40px;
  gap: 20px;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-size: 16px;
  font-weight: bold;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #f0f0f0;
}

.search-bar {
  flex: 1;
  display: flex;
  margin-left: 100px;
}

.search-input {
  width: 300px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  font-size: 14px;
  height: 50px;
}

.user-icons {
  display: flex;
  gap: 50px;
}
.icon {
  cursor: pointer;
  width: 30px;
  height: 30px;
  position: relative;
}
.icon-image {
  width: 20px;
  height: 20px;
}
.greeting {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
}
.section-title {
  font-family: fangsong;
  font-size: 5em;
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
  animation: fadeUp 1s ease;
}

.content {
  max-width: 50%;
  text-align: center;
  margin-top: 15px;
  color: #555;
  animation: fadeUp 1s ease 0.3s;
}

/* Fade-up animation */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.picture {
  display: flex;
  gap: 20px;
  max-width: 1500px;
  padding: 30px;
  animation: slideInFromLeft 1s ease-out;
}

@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.picture img {
  max-width: 330px;
}
/*----------------------------------------------------------------*/
.product-cost {
  max-width: 1500px;
  background-color: hsl(0, 0%, 100%);
  padding: 20px 20px;
}
.hot-product {
  max-width: 1500px;
  background-color: #fff;
  padding: 40px 20px;
  margin-top: 50px;
  border-radius: 10px;
}

.cartadd-image {
  width: 30px;
  cursor: pointer;
}
.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 4px 8px;
  font-size: 10px;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.title {
  padding-bottom: 20px;
  text-align: center;
}
.title p {
  font-weight: bold;
  font-size: 2em;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  align-items: center;
}

.product-napri {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.product-name {
  font-size: 14px;
  font-weight: bold;
  margin: 0;
  flex: 1;
}
.product-price {
  font-size: 1.1em;
  font-weight: bold;
  color: #cc1414;
}

.product-card {
  border: 1px solid #fffefe;
  border-radius: px;
  width: 250px;
  padding: 15px;
  background-color: #fff;
  position: relative;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding-top: 30px;
}
.detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
}

.hot-label {
  position: absolute;
  top: 15px;
  right: 5px;
  background-color: #ff6666;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 10px;
  z-index: 1;
  box-shadow: 0 4px 8px rgba(39, 1, 1, 0.509);
  transition:
    transform 0.3s ease,
    background-color 0.3s ease;
  animation: pop-in 0.6s ease forwards;
}

.hot-label:hover {
  transform: scale(1.1);
  background-color: #ff4444;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

@keyframes pop-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.product-image {
  width: 100%;
  height: auto;
  max-height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
}

.product-info {
  text-align: left;
}

.product-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.product-info-left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
}

.product-info-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
  margin-left: 10px;
}

.product-colors {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.cartadd-image.disabled {
  cursor: not-allowed;
}

.color-swatch.out-of-stock {
  cursor: not-allowed;
  border: 1px dashed #ccc;
}

.color-swatch.out-of-stock:hover {
  transform: none;
}

.color-swatch {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  transition:
    transform 0.2s,
    border-color 0.2s;
}

.color-swatch:hover {
  transform: scale(1.11);
  border-color: #565656c2;
}

.cart-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.detail {
  margin-top: 10px;
  text-align: center;
}
.product-date,
.product-brand {
  font-size: 12px;
  color: #666;
  margin-bottom: 5px;
}

.detail-btn {
  display: block;
  width: 100%;
  background-color: #4caf50;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 14px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition:
    transform 0.3s ease,
    background-color 0.3s ease;
}

.detail-btn:hover {
  background-color: #2a782e;
}

.cart-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  gap: 10px;
}

.qty-input {
  width: 35px;
  padding: 5px;
  border: 1px solid #efefef;
  border-radius: 4px;
  text-align: center;
}
.modal {
  position: fixed;
  z-index: 1;
  left: 33%;
  top: 10%;
  background-color: rgba(0, 0, 0, 0.2);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 10px;
  width: 80%;
  height: auto;
}
.modal-content img {
  object-fit: cover;
  width: 80%;
  height: 100%;
  margin-left: 10%;
}
.modal-content h2 {
  font-weight: bold;
}
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
