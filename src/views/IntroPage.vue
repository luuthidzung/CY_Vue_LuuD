<template>
  <div class="intro-page">
    <div class="intro-picture">
      <img src="../views/image/intro.png" alt="Intro Image" />
    </div>

    <!-- Right side for the form -->
    <div class="form-container">
      <h1
        style="
          font-family: cursive;
          font-size: 3rem;
          font-weight: bold;
          text-align: center;
        "
      >
        Welcome
      </h1>
      <h2
        style="
          font-family: cursive;
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 50px;
          margin-top: 5px;
          text-align: center;
        "
      >
        Task Master
      </h2>
      <form @submit.prevent="handleSubmit">
        <!-- Input for login/registration -->

        <div class="form-group">
          <label for="username"></label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Enter your username"
            required
          />
        </div>
        <div class="form-group">
          <label for="password"></label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <div class="form-actions">
          <button type="submit">Login</button>
          <button type="button" @click="handleRegister">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    handleSubmit() {
      if (this.username && this.password) {
        this.$router.push('/todo')
      } else {
        alert('Please fill in all fields.')
      }
    },
    handleRegister() {
      alert(`Registering with username: ${this.username}`)
    },
  },
}
</script>

<style scoped>
.intro-page {
  display: flex;
  width: 1000px;
  height: auto;
}

.intro-picture {
  flex: 3;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
}

.intro-picture img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}
.form-container {
  flex: 2;
  padding: 2rem;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffff;
}

h2 {
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 1.5rem;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 20px;
  border: 2px solid #ede7de;
  box-shadow:
    -10px 6px 10px rgba(0, 0, 0, 0.3),
    inset 0px 1px 2px rgba(0, 0, 0, 0.3);
}

.form-actions {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  gap: 30px;
}

button {
  width: 40%;
  padding: 0.75rem;
  background-color: #75df9d;
  color: rgb(106, 103, 103);
  border: none;
  border-radius: 2rem;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  border: 2px solid #ede7de;
  box-shadow:
    -10px 6px 10px rgba(0, 0, 0, 0.3),
    inset 0px 1px 2px rgba(0, 0, 0, 0.3);
}

button:hover {
  background-color: #0a9a52;
  color: white;
  box-shadow:
    -10px 6px 10px rgba(0, 0, 0, 0.3),
    inset 0px 1px 2px rgba(0, 0, 0, 0.3);
}
</style>
