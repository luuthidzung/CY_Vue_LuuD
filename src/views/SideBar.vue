<template>
  <div class="sidebar">
    <div class="menu">
      <h1>Menu</h1>
      <input type="text" placeholder="Search" class="search-input" />
    </div>
    <div class="main-menu">
      <div class="section-task">
        <h3>TASKS</h3>
        <ul>
          <li class="task-item">
            <span class="task-indicator">»</span>
            <span>Upcoming</span>
            <span class="task-count">12</span>
          </li>
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
    </div>
    <div class="bottom-actions">
      <button class="action-btn">⚙️ Settings</button>
      <button class="action-btn">↪️ Sign out</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebBar',
}
</script>

<style scoped>
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
</style>
