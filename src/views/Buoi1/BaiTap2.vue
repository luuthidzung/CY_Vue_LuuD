<!--Bài 2: Tạo một ứng dụng Vue.js với một input 
để người dùng nhập vào chiều dài cạnh của 
một hình vuông. Sử dụng thuộc tính computed 
để tính và hiển thị diện tích của hình vuông.-->

<template>
    <div class="container">
      <h2>Tinh dien tich hinh vuong</h2>
      <div class="input-group">
        <label for="sideLength">Nhap chieu dai canh hinh vuong (cm):</label>
        <input 
          type="number" 
          v-model.number="sideLength" 
          id="sideLength" 
          placeholder="Enter canh hinh vuong" 
        />
      </div>
      <p v-if="sideLength"> Dien tich hinh vuong la: <strong>{{ area }} cm²</strong></p>
    </div>
  </template>

<script setup>
import{ref,computed} from 'vue';
const sideLength= ref(0);
const area = computed(()=> sideLength.value * sideLength.value);
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
  font-family: Arial, sans-serif;
}

.input-group {
  margin: 20px 20px;
}

input {
  padding: 8px;
  width: 100%;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 20px;
}

p {
  font-size: 18px;
  margin-top: 20px;
  color: #333;
}
</style>
