<template>
  <div class="container">
    <!-- Sidebar -->
    <div class="sidebar">
      <div class="menu">
        <h1>Menu</h1>
        <input type="text" placeholder="Search" class="search-input" />
      </div>

      <!-- Tasks Section -->
      <div class="main-menu">
        <div class="section-task" style="margin-bottom: 50px">
          <h3>TASKS</h3>
          <ul>
            <router-link to="/todo" class="task-item active">
              <span class="task-indicator">≡</span>
              <span>Upcoming</span>
              <span class="task-count"></span>
            </router-link>
            <router-link to="/tablepage" class="task-item active">
              <span class="task-indicator">≡</span>
              <span>Today</span>
              <span class="task-count">5</span>
            </router-link>
            <router-link to="/calendarpage" class="task-item active">
              <span class="task-indicator">📅</span>
              <span>Calendar</span>
              <span class="task-count"></span>
            </router-link>
            <li class="task-item active">
              <span class="task-indicator">📌</span>
              <span>Sticky Wall</span>
              <span class="task-count"></span>
            </li>
          </ul>
        </div>
        <div class="section-task">
          <h3>STATUS TASK</h3>
          <ul>
            <li class="task-item">
              <span class="task-indicator">»</span>
              <span>To do</span>
              <span class="task-count">12</span>
            </li>
            <li class="task-item active">
              <span class="task-indicator">≡</span>
              <span>Inprogress</span>
              <span class="task-count">5</span>
            </li>

            <li class="task-item">
              <span class="task-indicator">✔️</span>
              <span>Done</span>
              <span class="task-count"></span>
            </li>

            <li class="task-item">
              <span class="task-indicator">⚠️</span>
              <span>Rejected</span>
              <span class="task-count"></span>
            </li>
          </ul>
        </div>
        <!-- Lists Section -->
      </div>

      <!-- Bottom Actions -->
      <div class="bottom-actions">
        <button class="action-btn">⚙️ Settings</button>
        <button class="action-btn" @click="handleSignOut">↪️ Sign out</button>
      </div>
    </div>
    <!-- Main Content -->
    <div class="main-content">
      <div class="top">
        <div class="header">
          <h1>Welcome to TaskMaster!</h1>
        </div>

        <div>
          <input
            v-model="newTask.name"
            class="add-task-btn"
            @click.prevent="addTask"
            type="button"
            placeholder=" + Add New Task"
            value="Add New Task"
          />
        </div>

        <div class="task-list">
          <div class="task-item" v-for="(task, index) in tasks" :key="index">
            <input
              type="checkbox"
              class="custom-checkbox"
              :id="'checkbox' + index"
            />
            <label :for="'checkbox' + index" class="checkbox-label"></label>
            <div>
              <h3 class="task-title">{{ task.name }}</h3>
            </div>
            <button class="edit-btn">›</button>
          </div>
        </div>
      </div>

      <div class="bottom" style="display: flex; margin-top: auto">
        <div class="bottom-left">
          <div class="header">
            <h3 style="font-weight: bold; text-align: center">Tomorow</h3>
          </div>
          <button class="add-task-btn">+ Add New Task</button>
          <div class="task-bottom">
            <div
              class="task-thisweek"
              style="
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
              "
            >
              <input type="checkbox" id="checkbox1" />
              <div>
                <h5 class="task-title">hehehehehehehehehe</h5>
              </div>
              <button class="edit-btn"></button>
            </div>
            <div
              class="task-thisweek"
              style="display: flex; justify-content: space-between"
            >
              <input type="checkbox" id="checkbox1" />
              <div>
                <h5 class="task-title">hehehehehehehehehehe</h5>
              </div>
              <button class="edit-btn"></button>
            </div>
            <div
              class="task-thisweek"
              style="display: flex; justify-content: space-between"
            >
              <input type="checkbox" id="checkbox1" />
              <div>
                <h5 class="task-title">hehehehehehehehehehey</h5>
              </div>
              <button class="edit-btn"></button>
            </div>
            <div
              class="task-thisweek"
              style="display: flex; justify-content: space-between"
            >
              <input type="checkbox" id="checkbox1" />
              <div>
                <h5 class="task-title">hehehehehehehehehehe</h5>
              </div>
              <button class="edit-btn"></button>
            </div>
            <div
              class="task-thisweek"
              style="display: flex; justify-content: space-between"
            >
              <input type="checkbox" id="checkbox1" />
              <div>
                <h5 class="task-title">hehehehehehehehehehe</h5>
              </div>
              <button class="edit-btn"></button>
            </div>
          </div>
        </div>
        <div class="bottom-right">
          <div class="header">
            <h3 style="font-weight: bold">This week</h3>
          </div>
          <button class="add-task-btn">+ Add New</button>
          <div class="task-bottom">
            <div
              class="task-thisweek"
              style="
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
              "
            >
              <input type="checkbox" id="checkbox1" />
              <div>
                <h5 class="task-title">Monday</h5>
              </div>
              <button class="edit-btn"></button>
            </div>
            <div
              class="task-thisweek"
              style="display: flex; justify-content: space-between"
            >
              <input type="checkbox" id="checkbox1" />
              <div>
                <h5 class="task-title">Tueday</h5>
              </div>
              <button class="edit-btn"></button>
            </div>
            <div
              class="task-thisweek"
              style="display: flex; justify-content: space-between"
            >
              <input type="checkbox" id="checkbox1" />
              <div>
                <h5 class="task-title">Wednesday</h5>
              </div>
              <button class="edit-btn"></button>
            </div>
            <div
              class="task-thisweek"
              style="display: flex; justify-content: space-between"
            >
              <input type="checkbox" id="checkbox1" />
              <div>
                <h5 class="task-title">Thusday</h5>
              </div>
              <button class="edit-btn"></button>
            </div>
            <div
              class="task-thisweek"
              style="display: flex; justify-content: space-between"
            >
              <input type="checkbox" id="checkbox1" />
              <div>
                <h5 class="task-title">Friday</h5>
              </div>
              <button class="edit-btn"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const newTask = ref({ name: '' })
    const tasks = ref([])

    const addTask = () => {
      if (newTask.value.name.trim()) {
        tasks.value.push({ name: newTask.value.name })
        newTask.value.name = ''
      } else {
        console.log('Task name cannot be empty')
      }
    }

    const handleSignOut = () => {
      console.log('User signed out')
      router.push('/')
    }

    return {
      newTask,
      tasks,
      addTask,
      handleSignOut,
    }
  },
}
</script>

<style scoped>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #ffffff;
}

.container {
  display: flex;
  width: 1200px;
  padding: 20px;
  background-color: #b3ddc3;
}

.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px;
  width: 30%;
  background-color: #b3ddc3;
}

.bottom-actions {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: transparent;
  border-top: 1px solid #ccc;
}

.bottom {
  display: flex;
  justify-content: space-between;
}

.bottom-left,
.bottom-right {
  flex: 1;
}
.bottom-right {
  flex: 1;
  margin-left: 30px;
}

.section {
  border: #000000;
}
.section-task ul {
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
  unicode-bidi: isolate;
  padding: 0 10px;
}
.section-task h3 {
  font-weight: bold;
  font-family: monospace;
}
.section-list h3 {
  font-weight: bold;
  font-family: monospace;
}
.header h1 {
  font-family: monospace;
}
.task-item active {
  font-weight: bold;
}
.menu {
  margin-bottom: 10px;
  padding: 20px;
}

.menu h1 {
  font-size: 2rem;
  font-family: monospace;
  font-weight: bold;
  margin-bottom: 8px;
}

.search-input {
  width: 100%;
  padding: 15px;
  border-radius: 20px;
  border: 3px solid #f2efea;
}
.main-menu {
  padding: 10px;
}
.section {
  margin-bottom: 24px;
  padding: 5px;
}

.section h2 {
  font-size: 0.875rem;
  font-weight: 600;
  color: #4b5563;
  margin-bottom: 8px;
}

.task-item,
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  font-size: 16px;
}

.task-item img {
  width: 25px;
}

.task-indicator {
  margin-right: 8px;
}

.task-count,
.list-count {
  background-color: #e5e7eb;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 0.875rem;
}

.custom-checkbox {
  display: none;
}

.checkbox-label {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  vertical-align: middle;
  margin-right: 10px;
}

.custom-checkbox:checked + .checkbox-label {
  background-color: #4caf50;
  border-color: #4caf50;
}

.custom-checkbox:checked + .checkbox-label::after {
  content: '';
  position: absolute;
  left: 4px;
  top: 1px;
  width: 6px;
  height: 12px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.active {
  background-color: #f3f4f6;
}

.add-list-btn,
.add-tag-btn,
.action-btn {
  display: flex;
  align-items: center;
  color: #4b5563;
  padding: 8px;
  cursor: pointer;
}

.add-list-btn:hover,
.add-tag-btn:hover,
.action-btn:hover {
  background-color: #f3f4f6;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 4px 8px;
  border-radius: 9999px;
  color: #000000;
  font-size: 0.875rem;
}

.action-btn {
  background-color: transparent;
  color: rgb(69, 68, 68);
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 16px;
  font-family: monospace;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
}
.action-btn:hover {
  background-color: #d2e0ef;
  transform: scale(1.05);
}

.action-btn:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
}

.main-content {
  flex: 1;
  padding: 60px;
  width: 70%;
  height: 100%;
  background-color: white;
  border: 3px solid #ffffff;
  border-radius: 0px 20px 20px 0px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.header h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.add-task-btn {
  width: 100%;
  text-align: left;
  padding: 10px;
  border: 2px dashed #ede7de;
  /* border: 2px dashed #ede7de;
  box-shadow:
    -10px 6px 10px rgba(0, 0, 0, 0.3),
    inset 0px 1px 2px rgba(0, 0, 0, 0.3); */
  border-radius: 20px;
  background-color: #ffffff;
  margin-bottom: 6px;
  cursor: pointer;
}

.add-task-btn:hover {
  background-color: #eceaea;
  border: 2px dashed #ede7de;
  box-shadow:
    -10px 6px 10px rgba(0, 0, 0, 0.3),
    inset 0px 1px 2px rgba(0, 0, 0, 0.3);
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 30px;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 5px;
  background-color: #ffffff;
  border-radius: 8px;

  /* box-shadow:
    -10px 6px 10px rgba(0, 0, 0, 0.3),
    inset 0px 1px 2px rgba(0, 0, 0, 0.3); */
  transition: box-shadow 0.2s;
}

.task-item:hover {
  scale: 1.1;
  scale: 1.1;
  box-shadow:
    -10px 6px 10px rgba(0, 0, 0, 0.3),
    inset 0px 1px 2px rgba(0, 0, 0, 0.3);
  border: 1px solid #f2efea;
}

.task-title {
  font-weight: 500;
}
.task-thisweek {
  display: flex;
  border: 1px dashed #f2efea;
  padding: 5px;
  border-radius: 5px;
}
.task-thisweek:hover {
  scale: 1.1;
  box-shadow:
    -10px 6px 10px rgba(0, 0, 0, 0.3),
    inset 0px 1px 2px rgba(0, 0, 0, 0.3);
  border: 1px solid #f2efea;
}

.task-thisweek .edit-btn {
  background-color: white;
  border-color: white;
  box-shadow: none;
}

.edit-btn {
  background-color: white;
  border-color: white;
  box-shadow: none;
  cursor: pointer;
}

.edit-btn:hover {
  color: #6b7280;
}

.task-date,
.task-subtasks {
  font-size: 0.875rem;
  color: #6b7280;
}

.task-list-tag {
  padding: 2px 4px;
  border-radius: 4px;
  color: #ffffff;
}
</style>
