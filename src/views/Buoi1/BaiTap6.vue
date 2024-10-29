<!--Bài 6 : Tạo một ứng dụng Vue.js với một danh sách 
sản phẩm, mỗi sản phẩm có giá và số lượng. Sử dụng 
computed để tính tổng giá trị của tất cả các sản phẩm
 trong giỏ hàng.-->

 <template>
  <div class="cart-container">
    <div class="product-card" v-for="(product, index) in products" :key="index">
      <div class="product-image">
        <img :src="product.image" :alt="product.name" />
      </div>
      <div class="product-details">
        <div class="product-name" :style="{ color: product.inStock ? 'green' : 'red' }">
          {{ product.name }}
        </div>
        <div :class="productClassObject(product.inStock)">{{ product.inStock ? 'In Stock' : 'Out of Stock' }}</div>
        <div class="product-price">{{ formatPrice(product.price * (1 - product.discount)) }}</div>
        <div class="product-cart">
          <div class="cart-icon">🛒</div>
          <input type="number" v-model.number="product.quantity" min="0" class="quantity-input" />
        </div>
      </div>
    </div>
    <div class="total">-> Total Price: {{ formatPrice(totalPrice) }}$</div>
    <button class="checkout-button" @click="checkout">Proceed to checkout</button>
   
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  setup() {
    const products = ref([
      {
        name: 'SteelSeries Apex Pro TKL',
        price: 166,
        quantity: 1,
        inStock: false,
        discount: 0.1,
        image: '/image/pr1.png',
      },
      {
        name: 'ASUS ROG Spatha X',
        price: 129,
        quantity: 1,
        inStock: true,
        discount: 0.05,
        image: '/image/pr2.png',
      },
      {
        name: 'Acer Nitro 23.8',
        price: 110,
        quantity: 1,
        inStock: true,
        discount: 0.2,
        image: '/image/pr3.png',
      },
    ]);

    const totalPrice = computed(() => {
      return products.value.reduce((total, product) => {
        return total + (product.inStock ? product.price * (1 - product.discount) * product.quantity : 0);
      }, 0);
    });

    const checkout = () => {
      alert(`Total price is: ${formatPrice(totalPrice.value)}`);
    };

    const formatPrice = (price) => {
      return price.toFixed(2);
    };

    const productClassObject = (inStock) => {
      return {
        'product-stock': true,
        'in-stock': inStock,
        'out-stock': !inStock,
      };
    };

    return {
      products,
      totalPrice,
      checkout,
      formatPrice,
      productClassObject,
    };
  },
};
</script>


<style scoped>
.cart-container {
  width: 200%;
  margin: 0 auto;
  border: 1px solid rgb(251, 196, 196);
  padding: 10px;
}

.product-card {
  display: flex;
  border: 1px solid rgb(251, 196, 196);
  margin: 10px 0;
  padding: 10px;
  gap: 10px;
}

.product-image {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover; 
}

.product-details {
  display: grid;
  grid-template-areas:
    "name stock"
    "price cart";
  grid-template-columns: 1fr auto;
  gap: 10px;
  flex: 1;
}

.product-name {
  grid-area: name;
  font-weight: bold;
  font-size: large;
  margin-left: 20px;
  padding: 5px;
}

.product-stock {
  grid-area: stock;
  color: red;
  border: 1px solid #c3c3c3;
  border-radius: 20px;
  padding: 5px;
}

.product-price {
  grid-area: price;
  color: rgb(140, 5, 5);
  padding: 5px;
  margin-left: 20px;
}

.product-cart {
  grid-area: cart;
  display: flex;
  gap: 5px;
}

.cart-icon {
  padding: 5px;
}

.quantity-input {
  width: 30px;
  height: 30px;
  text-align: center;
}

.checkout-button {
  width: 100%;
  padding: 15px;
  background-color: rgb(248, 210, 210);
  font-size: 25px;
  font-weight: bold;
  border: 1px solid rgb(251, 196, 196);
  cursor: pointer;
  margin-top: 20px;
}

.checkout-button:hover {
  background-color: rgb(232, 115, 115);
  color: white;
}
.total{
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: 20px;
}
</style>

