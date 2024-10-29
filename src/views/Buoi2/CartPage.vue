<!-- CartPage.vue -->
<template>
    <div class="cart-page" v-if="isCartOpen">
      <div class="cart-container">
        <div class="product-card" v-for="(product, index) in cartItems" :key="index">
          <div class="product-image">
            <img :src="product.image" :alt="product.name" />
          </div>
          <div class="product-details">
            <div class="product-name" :style="{ color: product.inStock ? 'green' : 'red' }">
              {{ product.name }}
            </div>
            <div :class="productClassObject(product.inStock)">
              {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
            </div>
            <div class="product-price">{{ formatPrice(product.price * (1 - (product.discount || 0))) }}</div>
            <div class="product-cart">
              <div class="cart-icon">🛒</div>
              <input 
                type="number" 
                v-model.number="product.quantity" 
                min="0" 
                class="quantity-input"
                @input="updateQuantity(index, $event)" 
              />
            </div>
          </div>
        </div>
        <div class="total">-> Total Price: {{ formatPrice(totalPrice) }}$</div>
        <button class="checkout-button" @click="checkout">Proceed to checkout</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    isCartOpen: Boolean,
    cartItems: Array,
  });
  
  const emit = defineEmits(['update:cartItems', 'close']);
  
  const totalPrice = computed(() => {
    return props.cartItems.reduce((total, product) => {
      const discount = product.discount || 0;
      return total + (product.inStock ? product.price * (1 - discount) * product.quantity : 0);
    }, 0);
  });
  
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
  
  const updateQuantity = (index, event) => {
    const newItems = [...props.cartItems];
    newItems[index].quantity = parseInt(event.target.value) || 0;
    emit('update:cartItems', newItems);
  };
  
  const checkout = () => {
    alert(`Total price is: ${formatPrice(totalPrice.value)}`);
  };
  </script>
  
  <style scoped>
  .cart-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .cart-container {
    width: 80%;
    max-width: 800px;
    margin: 0 auto;
    border: 1px solid rgb(251, 196, 196);
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    max-height: 80vh;
    overflow-y: auto;
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
  
  .in-stock {
    color: green;
  }
  
  .out-stock {
    color: red;
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
    border: 1px solid rgb(248, 210, 210);
    cursor: pointer;
    margin-top: 20px;
  }
  
  .checkout-button:hover {
    background-color: rgb(232, 115, 115);
    color: white;
  }
  
  .total {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 20px;
    font-weight: bold;
    font-size: 1.2em;
  }
  </style>