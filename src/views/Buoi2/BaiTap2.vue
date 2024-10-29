<!--
●Mô tả: Tạo ứng dụng Todo List đơn giản.
●Yêu cầu:
oTạo một danh sách công việc và cho phép thêm công việc mới.
oCho phép đánh dấu hoàn thành công việc hoặc xóa công việc.
●Mục tiêu học: Hiểu cách sử dụng v-model, v-for, và v-bind:key.-->

<template>
  <div class="container">
    <div class="task">
      <div class="title">
        <h1>Todo list</h1>
      </div>
      <div class="form">
        <input type="text" v-model="newTask" placeholder="New Task" />
        <button @click="addTask">+</button>
      </div>
      <div class="taskItems">
        <ul>
          <li v-for="(task, index) in tasks" :key="task.id">
            <!-- Checkbox để đánh dấu hoàn thành -->
            <input type="checkbox" v-model="task.completed" />
            <!-- Áp dụng CSS gạch ngang nếu đã hoàn thành -->
            <span :class="{ completed: task.completed }">{{ task.name }}</span>
            <button @click="deleteTask(index)"><i class="far fa-trash-alt"></i></button>
          </li>
        </ul>
      </div>
      <div class="clearBtns">
        <button @click="clearCompleted">Clear completed</button>
        <button @click="clearAll">Clear all</button>
      </div>
      <div class="pendingTasks">
        <span>Pending Tasks: {{ pendingTasks }}</span>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref,computed } from "vue";
const newTask = ref("");
const tasks = ref([]);

function addTask() {
  if (newTask.value.trim()) {
    tasks.value.push({ name: newTask.value, completed: false });
    newTask.value = "";
  }
}

// function toggleTask(task) {
//   task.completed = !task.completed;
// }

function deleteTask(index) {
  tasks.value.splice(index, 1);
}

function clearCompleted() {
  tasks.value = tasks.value.filter((task) => !task.completed);
}

function clearAll() {
  tasks.value = [];
}

const pendingTasks = computed(() => {
  return tasks.value.filter((task) => !task.completed).length;
});
</script>
<style scoped>
body {
  font: 15px/1.4 "Poppins", sans-serif;
 
}

#app {
  padding: 60px 0;
  
}

.container {
  padding: 20px;
  max-width: 1500px;
  width: 200%;
  background-color: rgb(248, 210, 210);}

input[type="text"] {
  width: 100%;
  height: 50px;
  font: 15px/1.4 "Poppins", sans-serif;
  padding: 15px;
  background: #f3f3f3;
  color: #333;
  border: 1px solid transparent;
  border-radius: 10px;
  transition: border 0.3s linear;
}

input[type="text"]:focus {
  outline: none;
  border: 1px solid #c54e72;
}

button {
  cursor: pointer;
  font: 15px/1.4 "Poppins", sans-serif;
  color: #555;
  transition: all 0.3s linear;
}

button:focus {
  outline: none;
}

h1 {
  font-size: 22px;
  font-weight: bold;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.task {
  background: #fff;
  border-radius: 25px;
  padding: 30px;
  box-shadow: 0px 0px 40px 0px rgba(0,0,0,0.1);
}

.title {
  text-align: center;
  margin: 0 0 20px;
}

.form {
  position: relative;
  margin: 0 0 30px;
}

.form button {
  background-color: #c54e72;
  color: #fff;
  font-weight: bold;
  font-size: 24px;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}


.clearBtns {
  display: flex;
  justify-content: space-between;
  margin: 0 0 20px;
}

.clearBtns button {
  width: 100%;
  background: #c54e72;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px;
  margin: 0 5px;
}

.clearBtns button:hover {
  background: #333;
}

.pendingTasks {
  padding: 0 6px;
}

.taskItems {
  padding: 0 10px;
}

.taskItems li {
  display: flex;
  justify-content: space-between;
  margin: 0 0 20px;
}

.taskItems button {
  background: none;
  border: none;
}

.taskItems button:hover {
  color: #c54e72;
}

.taskItems .toggle i {
  margin: 0 10px 0 0;
  font-size: 14px;
}

.taskItems .toggle.toggle-completed {
  text-decoration:line-through;
}
.completed {
  text-decoration: line-through;
  color: #bd2d2d;
}

</style>