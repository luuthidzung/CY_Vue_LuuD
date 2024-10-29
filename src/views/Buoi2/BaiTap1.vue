<!--●Yêu cầu 1: Đổ danh sách sản phẩm sử dụng v-for
●Yêu cầu 2: Sử dụng v-for kèm computed để đổ ra danh sách sản phẩm hot
●Yêu cầu 3: Sử dụng v-if, v-else để hiển thị sản phẩm đắt rẻ
●Yêu cầu 4: Tạo event thêm giỏ hàng
●Yêu cầu 5: Đổ ra phương thức thanh toán và set giá trị ban đầu là “Banking”
●Yêu cầu 6: Thông báo khi thay đổi phương thức thanh toán-->

<template>
    <div class="container">
    <header class="navbar">
      <div class="logo">
        <img src="/image/logo.svg" alt="Logo" class="logo-img" />
      </div>
      <div class="search-bar">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Tìm kiếm sản phẩm..."
          @input="onSearch"
        />
      </div>
      <div class="user-icons">
        <div class="icon">
          <img src="/image/logo.svg" alt="User Icon" class="icon-image" />
        </div>
        <div class="icon cart-icon" @click="toggleCart">
          <img src="/image/cart.png" alt="Cart Icon" class="icon-image" />
          <span class="cart-count" v-if="cart.length > 0">{{ cart.length }}</span>
        </div>
      </div>
    </header>

    <div class="product-cost">
      <h2>Danh sách sản phẩm</h2>
      <h3>Tất cả sản phẩm</h3>
      <div class="product-list">
        <div class="product-card" v-for="product in products" :key="product.id">
          <img :src="product.image" :alt="product.name" class="product-image" />
          <h3>{{ product.name }}</h3>
          <p>Giá: ${{ product.price }}</p>
          <div v-if="product.price > 5000">
            <p class="expensive">Sản phẩm đắt tiền</p>
          </div>
          <div v-else>
            <p class="affordable">Sản phẩm giá rẻ</p>
          </div>
          <button @click="addToCart(product)" class="add-to-cart-btn">
            Add to cart
          </button>
        </div>
      </div>
    </div>

    <div class="hot-product">
      <h2>Sản phẩm hot</h2>
      <div class="product-list">
        <div class="product-card" v-for="product in hotProducts" :key="product.id">
          <img :src="product.image" :alt="product.name" class="product-image" />
          <h3>{{ product.name }}</h3>
          <p>Giá: ${{ product.price }}</p>
          <button @click="addToCart(product)" class="add-to-cart-btn">
        Add to cart
          </button>
        </div>
      </div>
    </div>

    <div class="payment-section">
      <h2>Phương thức thanh toán</h2>
      <select 
        v-model="selectedPayment"
        @change="onPaymentMethodChange">
        <option
          v-for="method in paymentMethods"
          :key="method.value"
          :value="method.value"
        >
          {{ method.text }}
        </option>
      </select>
    </div>
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
import { ref, computed } from 'vue';
const products = ref([
  {
    id: 1,
    name: 'PS5',
    price: 5555,
    publicDate: '05-05-2021',
    image: 'https://cdn.vjshop.vn/hightech/may-choi-game/ps5/sony-ps-5-1.jpg',
    hot: true,
  },
  {
    id: 2,
    name: 'PS4',
    price: 4444,
    publicDate: '04-04-2021',
    image: 'https://gmedia.playstation.com/is/image/SIEPDC/ps4-slim-image-block-01-en-24jul20?$native--t$',
    hot: true,
  },
  {
    id: 3,
    name: 'PS3',
    price: 3333,
    publicDate: '03-03-2021',
    image: 'https://haloshop.vn/image/catalog/blogs/ps3-co-con-dang-mua/ps3-co-con-dang-mua-21.jpg',
    hot: false,
  },
  {
    id: 4,
    name: 'PS3 Super slim',
    price: 5555,
    publicDate: '05-05-2021',
    image: 'https://haloshop.vn/image/cache/catalog/products/may-game/sony-playstation/ps3-super-slim-45-700x700.jpg',
    hot: true,
  },
]);

const paymentMethods = ref([
  { text: 'COD', value: 1 },
  { text: 'Banking', value: 2 },
  { text: 'Ứng dụng bên thứ 3', value: 3 },
]);
const selectedPayment = ref(2);
const hotProducts = computed(() => {
  return products.value.filter((product) => product.hot);
});

const showCart = ref(false);
const cart = ref([]);

const addToCart = (product) => {
  const existingProduct = cart.value.find(item => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.value.push({
      ...product,
      quantity: 1,
      inStock: true,
      discount: 0
    });
  }
  alert(`Đã thêm ${product.name} vào giỏ hàng!`);
};

const toggleCart = () => {
  showCart.value = !showCart.value;
};
const updateCart = (newItems) => {
  cart.value = newItems;
};

const onPaymentMethodChange = () => {
  const selectedMethod = paymentMethods.value.find(
    method => method.value === selectedPayment.value
  );
  alert(`Đã chọn phương thức thanh toán: ${selectedMethod.text}`);
};
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 1500px;
  background-color: rgb(248, 210, 210);
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: rgb(248, 210, 210);
  color: white;
  width: 1100px;
  padding-bottom: 50px;
}

.h2 {
  font-weight: bold;
}

.logo-img {
  width: 80px;
}

.product-cost {
  max-width: 1500px;
  background-color: #dcdada;
  padding: 40px 20px;
  border-radius: 10px;
}

.hot-product {
  max-width: 1500px;
  background-color: #fff;
  padding: 40px 20px;
  margin-top: 50px;
  border-radius: 10px;

}

.logo h1 {
  margin: 0;
}

.search-bar input {
  padding: 0.5rem;
  border: none;
  border-radius: 10px;
  width: 200%;
  height: 50px;
}

.user-icons {
  display: flex;
  gap: 100px;
}

.icon {
  cursor: pointer;
  width: 50px;
  height: 50px;
  position: relative;
}

.icon-image {
  width: 50px;
  height: 50px;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 4px 8px;
  font-size: 12px;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.product-card {
  border: 1px rgb(248, 210, 210);
  padding: 10px;
  border-radius: 5px;
  width: 250px;
  text-align: center;
  background-color: #fff;
}

.product-image {
  width: 100%;
  height: auto;
}

.expensive {
  color: red;
}

.affordable {
  color: green;
}

.add-to-cart-btn {
  background-color: #4CAF50;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.add-to-cart-btn:hover {
  background-color: #45a049;
}

.payment-section {
text-align: center;
  margin-top: 50px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  
}

select {
  padding: 8px;
  border-radius: 4px;
  border: 1px rgb(248, 210, 210);
  width: 200px;
}
</style>