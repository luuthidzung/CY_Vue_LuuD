<template>
    <div class="container">
      <div class="calculator">
        <h4>Calculator</h4>
        <div>
          <div>
            <label>
              <input
                type="number"
                v-model.number="num1"
                class="num-1"
                placeholder="Số 1"
              />
            </label><br />
            <label>
              <input
                type="number"
                v-model.number="num2"
                class="num-2"
                placeholder="Số 2"
              />
            </label>
          </div>

          <div class="ketqua">
            <div class="arrow">→</div>
            <span id="result">{{ result }}</span>
          </div>
        </div>
  
        <div class="buttons">
          <button class="operator" @click="clear">AC</button>
          <button class="operator" @click="deleteLast">DEL</button>
          <button class="operator" @click="setOperation('%')">%</button>
          <button class="operator" @click="setOperation('/')">/</button>
          <button @click="setNumber(7)">7</button>
          <button @click="setNumber(8)">8</button>
          <button @click="setNumber(9)">9</button>
          <button class="operator" @click="setOperation('*')">*</button>
          <button @click="setNumber(4)">4</button>
          <button @click="setNumber(5)">5</button>
          <button @click="setNumber(6)">6</button>
          <button class="operator" @click="setOperation('-')">-</button>
          <button @click="setNumber(1)">1</button>
          <button @click="setNumber(2)">2</button>
          <button @click="setNumber(3)">3</button>
          <button class="operator" @click="setOperation('+')">+</button>
          <button @click="setNumber(0)">0</button>
          <button @click="setNumber(0)">00</button>
          <button @click="setDecimal">.</button>
          <button class="operator" @click="calculate">=</button>
        </div>
      </div>
    </div>
  </template>

  
  <script setup>
  import { ref, computed } from 'vue';
  const num1 = ref(0);
  const num2 = ref(0);
  const operation = ref(null);
  const result = computed(() => {
    switch (operation.value) {
      case '+':
        return num1.value + num2.value;
      case '-':
        return num1.value - num2.value;
      case '*':
        return num1.value * num2.value;
      case '/':
        return num2.value !== 0 ? (num1.value / num2.value).toFixed(2) : 'Infinity';
      case '%':
        return (num1.value % num2.value).toFixed(2);
      default:
        return '';
    }
  });
  
  
  const setNumber = (value) => {
    if (operation.value) {
      num2.value = value;
    } else {
      num1.value = value;
    }
  };
  
  const setOperation = (op) => {
    operation.value = op;
  };
  
  const calculate = () => {
    if (operation.value) {
      num1.value = result.value;
      operation.value = null;
      num2.value = 0; 
    }
  };
  
  const clear = () => {
    num1.value = 0;
    num2.value = 0;
    operation.value = null;
  };
  
  const deleteLast = () => {
    if (operation.value) {
      num2.value = Math.floor(num2.value / 10); 
    } else {
      num1.value = Math.floor(num1.value / 10); 
    }
  };
  
  const setDecimal = () => {
    if (operation.value) {
      num2.value = parseFloat(num2.value.toString() + '.');
    } else {
      num1.value = parseFloat(num1.value.toString() + '.');
    }
  };
  </script>
  
  <style scoped>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fefefe2f;
   
  }
  
  .container {
   
    max-width: 300px;
    width: 100%;
    max-height: 800px;
    border-radius: 12px;
    padding: 10px 10px ;
    background: pink;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  }
  
  .calculator {
    max-width: 300px;
    max-height: 700px;
    background-color: white;
    border-radius: 10px;
    padding: 20px;
  }
  
  h4 {
    text-align: center;
    color: #333;
    font-family: Poppins;
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  
  label {
    display: block;
  }
  
  input[type="number"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 20px;
    box-sizing: border-box;
    background-color: #e4bac42f;
    font-family: Poppins;
  }
  
  .ketqua {
    display: flex;
  }
  
  .arrow {
    margin-right: 10%;
    margin-left: 10%;
    font-size: 2rem;
    margin-top: 4%;
    color: #ff678a;
  }
  
  #result {
    width: 70%;
    margin-bottom: 20px;
    height: 50px;
    background-color: #ff59802f;
    border-radius: 20px;
    display: block;
    margin-top: 10px;
    font-weight: bold;
    font-size: 1.2em;
    text-align: center;
    color: #333;
    font-family: Poppins;
    padding: 5px;
  }
  
  .buttons {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(4, 1fr);
  }
  
  .buttons button {
    padding: 10px;
    border-radius: 6px;
    border: none;
    font-size: 20px;
    cursor: pointer;
    background-color: #ff184e2f;
  }
  
  .buttons button:active {
    transform: scale(0.99);
  }
  
  .operator {
    color: #FF184E;
  }
  </style>
  