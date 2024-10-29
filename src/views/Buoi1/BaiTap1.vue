<template>
    <div class="container">
      <div :class="classObject" class="product-card">
        <div class="image-wrapper">
          <img :src="image" :alt="imageAlt" class="product-image" />
          <span class="discount-badge">-20%</span>
        </div>
        <div class="product-info">
          <div class="header">
            <h2 :style="{ color: inStock ? '#16a34a' : '#dc2626' }" class="product-name">
              {{ product }}
            </h2>
            <span :class="['stock-badge', inStock ? 'in-stock' : 'out-stock']">
              {{ inStock ? 'In Stock' : 'Out of Stock' }}
            </span>
          </div>

          <div class="price-container">
            <div class="price-wrapper">
              <span class="current-price">${{ formattedPrice }}</span>
              <span class="original-price">${{ price }}</span>
            </div>
            <div class="quantity">
              <span class="quantity-label">Available:</span>
              <span class="quantity-value">{{ quantity }} units</span>
            </div>
          </div>

          <a :href="productLink" class="product-link">
            Detail
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              class="arrow-icon">
              
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </template>
  <!----------------------------------------------------------------------------------------------->

  <script setup>
  import { ref, computed, watch } from 'vue';
  
  const image = ref(
    'https://cdn.vjshop.vn/hightech/may-choi-game/ps5/sony-ps-5-1.jpg',
  );
  const imageAlt = ref('ps5 alt');
  const product = ref('ps5');
  const productLink = ref(
    'https://bachtungps.com.vn/may-sony-playstation-5-ps5-1',
  );
  const quantity = ref(10);
  const price = ref(10000);
  const discount = ref(0.2);
  const inStock = ref(true);
  const classObject = {
    'bg-green': true,
    'bg-blue': false,
  };
  
  const formattedPrice = computed(() => {
    return price.value - price.value * discount.value;
  });

  watch(inStock, (newValue) => {
  if (!newValue) {
    quantity.value = 0;
  } else {
    quantity.value = 10;
  }
}, { immediate: true }); 


  </script>
  <!------------------------------------------------------------------------------------------------>

  <style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .container {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f8fafc;
    padding: 1rem;
  }
  
  .product-card {
    width: 100%;
    max-width: 380px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    background-color: white;
    transition: all 0.3s ease;
  }
  
  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  }
  
  .image-wrapper {
    position: relative;
    width: 100%;
  
  }
  
  .product-image {
    object-fit: cover;
   
  }
  .product-image {
  max-width: 400px;
  height: auto;
  object-fit: cover;
}

  
  .discount-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background-color: #dc2626;
    color: white;
    padding: 4px 12px;
    border-radius: 9999px;
    font-weight: 600;
    font-size: 0.875rem;
  }
  
  .product-info {
    padding: 1.5rem;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .product-name {
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
  }
  
  .stock-badge {
    padding: 4px 12px;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;
  }
  
  .in-stock {
    background-color: #35a75d;
    color: #fbfbfb;
  }
  
  .out-stock {
    background-color: #fee2e2;
    color: #dc2626;
  }
  
  .price-container {
    margin-bottom: 1.5rem;
  }
  
  .price-wrapper {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
  }
  
  .current-price {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
  }
  
  .original-price {
    color: #64748b;
    text-decoration: line-through;
  }
  
  .quantity {
    display: flex;
    gap: 0.5rem;
    color: #64748b;
  }
  
  .quantity-label {
    font-weight: 500;
  }
  
  .product-link {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.75rem;
    background-color: #0ea5e9;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 500;
    transition: background-color 0.2s ease;
  }
  
  .product-link:hover {
    background-color: #0284c7;
  }
  
  .arrow-icon {
    width: 1rem;
    height: 1rem;
    stroke-width: 2;
  }
  
  
  .bg-green {
    background-color: rgb(222, 222, 222);
  }
  
  .bg-blue {
    background-color: rgb(143, 143, 247);
  }
  
  @media (max-width: 640px) {
    .container {
      padding: 1rem;
    }
    
    .product-card {
      max-width: 100%;
    }
  }
  </style>