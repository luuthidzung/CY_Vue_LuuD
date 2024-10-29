<!--
- Tạo một ứng dụng Vue.js với một form đăng ký gồm các trường: 
  họ tên, email, số điện thoại, password, re-password.
- Nếu người dùng nhập ít hơn 8 ký tự, nút “Đăng ký” sẽ bị vô hiệu hóa và có màu xám. 
- Nếu mật khẩu đủ điều kiện, nút sẽ có màu xanh và có thể bấm được. 
- Sử dụng computed để kiểm tra độ dài mật khẩu và v-bind:class cho trạng thái nút. 
- Sử dụng watch để theo dõi từng thay đổi của các trường này. 
- Nếu tất cả các trường đều đã được điền, một thông báo “Form đã hoàn tất” sẽ xuất hiện sau khi click “Đăng ký”. -->

<template>
  <div class="register-form">
    <h2>Đăng Ký</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Họ tên:</label>
        <input type="text" v-model="formData.name" required />
      </div>

      <div class="form-group">
        <label>Email:</label>
        <input type="email" v-model="formData.email" required />
      </div>

      <div class="form-group">
        <label>Số Điện Thoại:</label>
        <input type="tel" v-model="formData.phone" required />
      </div>

      <div class="form-group">
        <label>Password:</label>
        <input type="password" v-model="formData.password" required />
      </div>

      <div class="form-group">
        <label>Re-Password:</label>
        <input type="password" v-model="formData.rePassword" required />
      </div>

      <button
        type="submit"
        :disabled="!isFormValid"
        :class="{ 'btn-enabled': isFormValid, 'btn-disabled': !isFormValid }"
      >
        Đăng Ký
      </button>
    </form>

    <p v-if="isFormComplete" class="completion-message">Done</p>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
export default {
  setup() {
    const formData = ref({
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    });

    const isFormComplete = ref(false);
    const isPasswordValid = computed(() => formData.value.password.length >= 8);
    const isRePasswordValid = computed(() => formData.value.rePassword === formData.value.password);
    const isFormValid = computed(() => {
      return (
        formData.value.name &&
        formData.value.email &&
        formData.value.phone &&
        isPasswordValid.value &&
        isRePasswordValid.value
      );
    });

    watch(
      () => formData.value,
      (newValue) => {
        console.log("Form data changed:", newValue);
      },
      { deep: true }
    );

    const handleSubmit = () => {
      if (isFormValid.value) {
        isFormComplete.value = true;
        alert("Done");
      }
    };

    return {
      formData,
      isFormComplete,
      isPasswordValid,
      isRePasswordValid,
      isFormValid,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
.register-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
}

.btn-enabled {
  background-color: green;
  color: white;
}

.btn-disabled {
  background-color: rgb(202, 201, 201);
  color: white;
  cursor: not-allowed;
}

.completion-message {
  margin-top: 15px;
  color: rgb(117, 209, 117);
  font-weight: bold;
  text-align: center;
}
</style>
