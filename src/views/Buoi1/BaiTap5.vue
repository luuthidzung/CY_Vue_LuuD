<!--Bài 5: Tạo một ứng dụng Vue.js với một input kiểm tra (checkbox).
 Nếu checkbox được chọn, đoạn văn bản sẽ có màu xanh và chữ đậm; 
 nếu không, đoạn văn bản sẽ có màu đỏ và chữ bình thường.
-->
<template>
    <div :style="textStyle">
        Đoạn văn bản
    </div>
    <label>
        <input type="checkbox" v-model="isChecked" />
        Check
    </label>
</template>

<script setup>
import { ref, watch } from 'vue';
const isChecked = ref(false);
const textStyle = ref({ color: 'red', fontWeight: 'normal' });
watch(isChecked, (newValue) => {
    if (newValue) {
        textStyle.value = { color: 'blue', fontWeight: 'bold' };
    } else {
        textStyle.value = { color: 'red', fontWeight: 'normal' };
    }
});
</script>
