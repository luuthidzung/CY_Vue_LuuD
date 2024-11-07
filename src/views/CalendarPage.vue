<!-- Calendar.vue -->
<template>
  <div class="calendar-container">
    <!-- Left Sidebar -->
    <div class="sidebar">
      <div class="menu">
        <h1>Menu</h1>
        <input type="text" placeholder="Search" class="search-input" />
      </div>

      <!-- Tasks Section -->
      <div class="main-menu">
        <div class="section-task" style="margin-bottom: 10px">
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

    <!-- Main Calendar Area -->
    <div class="main-content">
      <div class="calendar-header">
        <div class="month-navigation">
          <h1>{{ currentMonthYear }}</h1>
        </div>
        <button class="add-event">Add Event</button>
      </div>

      <div class="calendar-grid">
        <div class="option">
          <div class="view-options">
            <button
              v-for="view in views"
              :key="view"
              :class="{ active: currentView === view }"
              @click="currentView = view"
            >
              {{ view }}
            </button>
          </div>
          <div class="nav-buttons">
            <button @click="previousMonth">&lt;</button>
            <button @click="nextMonth">&gt;</button>
          </div>
        </div>
        <div class="weekdays">
          <div v-for="day in weekDays" :key="day">{{ day }}</div>
        </div>
        <div class="days">
          <div
            v-for="date in calendarDays"
            :key="date.fullDate"
            :class="[
              'day-cell',
              { 'current-month': date.currentMonth },
              { today: isToday(date.fullDate) },
            ]"
          >
            <div class="date-number">{{ date.day }}</div>
            <div class="events">
              <div
                v-for="(event, index) in getEventsForDate(date.fullDate)"
                :key="index"
                :class="['event', event.type]"
                :style="{ backgroundColor: event.color }"
              >
                {{ event.title }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useTaskStore } from '../stores/taskStore.js'
export default {
  name: 'CalendarPage',
  setup() {
    const taskStore = useTaskStore()
    return { taskStore }
  },

  data() {
    return {
      currentDate: new Date(),
      currentView: 'Month',
      views: ['Day', 'Week', 'Month'],
      weekDays: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
    }
  },
  computed: {
    currentMonthYear() {
      return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        year: 'numeric',
      }).format(this.currentDate)
    },
    calendarDays() {
      const year = this.currentDate.getFullYear()
      const month = this.currentDate.getMonth()

      const firstDayOfMonth = new Date(year, month, 1)
      const lastDayOfMonth = new Date(year, month + 1, 0)

      const start = new Date(firstDayOfMonth)
      start.setDate(start.getDate() - (start.getDay() || 7) + 1)

      const days = []
      const current = new Date(start)

      while (current <= lastDayOfMonth || days.length % 7 !== 0) {
        days.push({
          day: current.getDate(),
          fullDate: current.toISOString().split('T')[0],
          currentMonth: current.getMonth() === month,
        })
        current.setDate(current.getDate() + 1)
      }
      return days
    },
    calendarEvents() {
      return this.taskStore.tasks.map(task => ({
        date: task.date,
        title: task.name,
        type: task.type,
        color: task.color,
      }))
    },
  },

  methods: {
    previousMonth() {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() - 1,
        1,
      )
    },
    nextMonth() {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1,
        1,
      )
    },
    isToday(date) {
      const today = new Date().toISOString().split('T')[0]
      return date === today
    },
    getEventsForDate(date) {
      return this.calendarEvents.filter(event => event.date === date)
    },
  },
}
</script>

<style scoped>
.calendar-container {
  width: 1300px;
  display: flex;
  min-height: 100vh;
  background-color: #ffffff;
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
.option {
  display: flex;
  justify-content: space-between;
}
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px;
  width: 30%;
  border-radius: 0px;
  background-color: #b3ddc3;
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
  border: 3px solid #f2efea; /* Biên của ô tìm kiếm */
}

.main-menu {
  padding: 10px;
}

.section-task {
  margin-bottom: 24px;
  padding: 5px;
}

.section-task ul {
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
  padding: 0 10px;
}

.section-task h3 {
  font-weight: bold;
  font-family: monospace;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  margin-bottom: 10px;
}

.task-indicator {
  margin-right: 8px;
}

.task-count {
  background-color: #e5e7eb;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 0.875rem;
}

.bottom-actions {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: transparent;
  border-top: 1px solid #ccc;
}

.main-content {
  flex: 1;
  padding: 20px;
  width: 70%;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.month-navigation {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-buttons {
  display: flex;
  gap: 10px;
}

.nav-buttons button {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 15px;
}

.view-options {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.view-options button {
  padding: 8px 16px;
  border: 1px solid #dee2e6;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
}

.view-options button.active {
  background-color: #e9ecef;
}

.add-event {
  padding: 8px 16px;
  background-color: #228be6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.calendar-grid {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 50px;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: #f8f9fa;
  padding: 10px;
}

.weekdays div {
  text-align: left;
  font-weight: 500;
  color: #495057;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.day-cell {
  min-height: 120px;
  padding: 8px;
  border: 1px solid #e9ecef;
  background-color: #f8f9fa;
}

.day-cell.current-month {
  background-color: white;
}

.day-cell.today {
  background-color: #f8f9fa;
}

.date-number {
  font-weight: 500;
  margin-bottom: 8px;
}

.events {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.event {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
