<!--Bài 3: Tạo một ứng dụng Vue.js với một input cho phép 
người dùng nhập vào kích thước chữ. Sử dụng v-bind để cập nhật 
kích thước chữ của một đoạn văn bản dựa trên giá trị người dùng nhập vào.-->

<template>
    <div>
        <label for="fontSize">Nhập kích thước chữ (px): </label>
        <input type="number" id="fontSize" v-model="fontSize" />
        <div :style="{ fontSize: fontSize + 'px',marginTop: '20px' }">
            Tạo một ứng dụng Vue.js với một input cho phép 
            người dùng nhập vào kích thước chữ. Sử dụng v-bind để cập nhật 
            kích thước chữ của một đoạn văn bản dựa trên giá trị người dùng nhập vào.
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const fontSize = ref(16); 
</script>
<style>

</style>
