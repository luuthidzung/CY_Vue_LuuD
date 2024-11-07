<template>
  <div class="container">
    <div class="sidebar">
      <div class="menu">
        <h1>Menu</h1>
        <input type="text" placeholder="Search" class="search-input" />
      </div>

      <!-- Tasks Section -->
      <div class="main-menu">
        <div class="section-task">
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
              <span>In progress</span>
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
        <button class="action-btn">↪️ Sign out</button>
      </div>
    </div>

    <div class="main-content">
      <div>
        <h1
          style="
            font-size: 2.5rem;
            font-family: monospace;
            font-weight: bold;
            margin-bottom: 8px;
          "
        >
          Today's Tasks
        </h1>
        <div class="edit">
          <div>
            <input
              class="add-task-btn"
              @click="addTask"
              type="text"
              v-model="newTask.name"
              placeholder=" + Add New Task"
            />
          </div>
          <button class="submit-btn" @click="submitTask">Submit</button>
          <button
            @click="exportSelectedTasks"
            style="
              width: 15%;
              text-align: center;
              padding: 10px;
              border: 2px dashed #ede7de;
              border-radius: 20px;
              background-color: #fd7575;
              margin-bottom: 16px;
              margin-top: 20px;
              cursor: pointer;
              font-size: 15px;
              color: #fffdfd;
            "
          >
            Export
          </button>
          <button
            @click="deleteSelectedTasks"
            style="
              width: 15%;
              text-align: center;
              padding: 10px;
              border: 2px dashed #ede7de;
              border-radius: 20px;
              background-color: #fd7575;
              margin-bottom: 16px;
              margin-top: 20px;
              cursor: pointer;
              font-size: 15px;
              color: #fffdfd;
            "
          >
            Delete Selected
          </button>
        </div>
      </div>
      <table border="1" class="task-table">
        <thead>
          <tr>
            <th style="width: 50px">
              <input
                type="checkbox"
                class="custom-checkbox"
                v-model="checkAll"
                @change="toggleAllCheckboxes"
              />
            </th>
            <th class="ID column-id" style="font-weight: bold">ID</th>
            <th class="task-name column-task-name" style="font-weight: bold">
              Task Name
            </th>
            <th
              class="task-status column-task-status"
              style="font-weight: bold"
            >
              Status
            </th>
            <th class="column-date" style="font-weight: bold">Date</th>
            <th class="column-action" style="font-weight: bold">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(task, index) in taskStore.tasks" :key="task.id">
            <td><input type="checkbox" v-model="task.checked" /></td>
            <td>{{ index + 1 }}</td>
            <td :class="{ strikethrough: task.status === 'done' }">
              {{ task.name }}
            </td>
            <td>
              <div :style="getStatusStyle(task.status)">
                <select
                  v-model="task.status"
                  @change="updateTaskStatus(task.id, task.status)"
                >
                  <option value="inprogress">In progress</option>
                  <option value="done">Done</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </td>
            <td>{{ task.date }}</td>
            <td>
              <img
                src="../views/image/edit.svg"
                alt="Edit"
                @click="editTask(task.id)"
                class="action-icon"
              />
              <img
                src="../views/image/delete.svg"
                alt="Delete"
                @click="deleteTask(task.id)"
                class="action-icon"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="isEditing" class="overlay">
      <div class="edit-overlay">
        <h2>Edit Task</h2>
        <input
          v-model="selectedTask.name"
          type="text"
          placeholder="Task Name"
        />
        <select v-model="selectedTask.status">
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="rejected">Rejected</option>
        </select>
        <div class="edit">
          <button @click="saveTaskEdit">Save</button>
          <button @click="closeEditOverlay">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useTaskStore } from '../stores/taskStore.js'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const taskStore = useTaskStore()
    const router = useRouter()
    return { taskStore, router }
  },

  data() {
    return {
      newTask: {
        name: '',
        status: 'inprogress',
        date: new Date().toISOString().split('T')[0],
        checked: false,
      },
      checkAll: false,
      selectedTask: null,
      isEditing: false,
    }
  },

  methods: {
    submitTask() {
      if (this.newTask.name.trim() !== '') {
        this.taskStore.addTask({ ...this.newTask })
        this.newTask.name = ''
        this.newTask.checked = false
      }
    },

    toggleAllCheckboxes() {
      this.taskStore.tasks.forEach(task => (task.checked = this.checkAll))
    },

    importCheckedTasks() {
      const checkedTasks = this.taskStore.tasks.filter(task => task.checked)
      if (checkedTasks.length > 0) {
        this.router.push({
          name: 'todo',
          query: { tasks: JSON.stringify(checkedTasks) },
        })
      } else {
        alert('Please select at least one task to import.')
      }
    },

    updateTaskStatus(taskId, newStatus) {
      this.taskStore.updateTask(taskId, { status: newStatus })
    },

    deleteTask(taskId) {
      this.taskStore.deleteTask(taskId)
    },

    getStatusStyle(status) {
      return {
        backgroundColor: this.taskStore.getColorByStatus(status),
        padding: '10px',
        borderRadius: '5px',
      }
    },

    editTask(taskId) {
      const task = this.taskStore.tasks.find(t => t.id === taskId)
      if (task) {
        this.selectedTask = { ...task } // Sao chép task vào selectedTask
        this.isEditing = true // Hiển thị overlay chỉnh sửa
      }
    },

    saveTaskEdit() {
      if (this.selectedTask) {
        this.taskStore.updateTask(this.selectedTask.id, this.selectedTask)
        this.isEditing = false // Ẩn overlay sau khi lưu
        this.selectedTask = null // Xóa selectedTask sau khi lưu
      }
    },

    closeEditOverlay() {
      this.isEditing = false
      this.selectedTask = null
    },
    deleteSelectedTasks() {
      const tasksToDelete = this.taskStore.tasks.filter(task => task.checked)
      if (tasksToDelete.length > 0) {
        tasksToDelete.forEach(task => {
          this.taskStore.deleteTask(task.id)
        })
      } else {
        alert('Please select at least one task to delete.')
      }
    },
  },

  watch: {
    'taskStore.tasks': {
      handler(newTasks) {
        this.checkAll = newTasks.every(task => task.checked)
      },
      deep: true,
    },
  },
}
</script>

<style scoped>
.container {
  display: flex;
  width: 1200px;
}
.task-item:hover {
  scale: 1.1;
}
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px;
  width: 30%;
  background-color: #b3ddc3;
  border: 2px dashed #ffffff;
}

.bottom-actions {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: transparent;
  border-top: 1px solid #ccc;
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
  margin-bottom: 50px;
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

.menu {
  margin-bottom: 6px;
  padding: 20px;
}

.menu h1 {
  font-size: rem;
  font-family: monospace;
  font-weight: bold;
  margin-bottom: 8px;
}

.search-input {
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid #ffffff;
  /* box-shadow:
    -10px 6px 10px rgba(0, 0, 0, 0.3),
    inset 0px 1px 2px rgba(0, 0, 0, 0.3); */
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
  padding: 8px 0;
  font-size: 16px;
  border-radius: 10px;
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
.main-content {
  flex: 1;
  padding: 60px;
  width: 70%;
  border-radius: 0px 20px 20px 0px;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #ffffff;
  /* border-radius: 8px;
  border: 3px solid #f2efea;
  box-shadow:
    -10px 6px 10px rgba(0, 0, 0, 0.3),
    inset 0px 1px 2px rgba(0, 0, 0, 0.3); */
  transition: box-shadow 0.2s;
}
.edit {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.submit-btn {
  width: 25%;
  text-align: center;
  padding: 10px;
  border: 2px dashed #ede7de;
  border-radius: 20px;
  background-color: #fd7575;
  margin-bottom: 16px;
  margin-top: 20px;
  cursor: pointer;
  font-size: 20px;
  color: #fffdfd;
}
import-btn {
  width: 25%;
  text-align: center;
  padding: 10px;
  border: 2px dashed #ede7de;
  border-radius: 20px;
  background-color: #fd7575;
  margin-bottom: 16px;
  margin-top: 20px;
  cursor: pointer;
  font-size: 20px;
  color: #fffdfd;
}
.add-task-btn {
  color: #c4c2c2;
  font-size: 16px;
  width: 200%;
  text-align: left;
  padding: 20px;
  border: 2px dashed #ede7de;
  /* border: 2px dashed #ede7de;
  box-shadow:
    -10px 6px 10px rgba(0, 0, 0, 0.3),
    inset 0px 1px 2px rgba(0, 0, 0, 0.3); */
  border-radius: 20px;
  background-color: #ffffff;
  margin-bottom: 16px;
  margin-top: 20px;
  cursor: pointer;
}
.task-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
  border-color: rgb(242, 238, 238);
  border-radius: 20px;
}

.task-table th,
.task-table td {
  padding: 10px;
  text-align: center;
}
.task-table th {
  background-color: #eceaea;
}
.column-id {
  width: 50px;
}
.column-task-name {
  width: 200px;
}
.column-task-status {
  width: 150px;
}
.column-date {
  width: 100px;
}
.column-action {
  width: 100px;
}
.strikethrough {
  text-decoration: line-through;
}
td img.action-icon {
  cursor: pointer;
  width: 15px;
  height: auto;
  margin: 0 10px;
}

td img.action-icon:hover {
  opacity: 1.1;
  scale: 1.2;
}
select {
  width: 100%;
  border: 1px solid transparent;
  border-radius: 20px;
  background-color: transparent;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

select:focus {
  border-color: none;
  outline: none;
}

option {
  padding: 10px;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .edit-overlay {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .edit-overlay input,
  .edit-overlay select {
    margin-bottom: 10px;
    padding: 10px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  .edit-overlay button {
    display: flex;
    padding: 10px 20px;
    margin-top: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .edit-overlay button:hover {
    background-color: #45a049;
  }
}
</style>
