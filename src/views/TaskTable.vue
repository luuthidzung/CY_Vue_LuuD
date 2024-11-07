<template>
  <table border="1" class="task-table">
    <thead>
      <tr>
        <th style="width: 50px">
          <input
            type="checkbox"
            class="custom-checkbox"
            @click="toggleAllCheckboxes"
          />
        </th>
        <th class="ID column-id" style="font-weight: bold">ID</th>
        <th class="task-name column-task-name" style="font-weight: bold">
          Task Name
        </th>
        <th class="task-status column-task-status" style="font-weight: bold">
          Status
        </th>
        <th class="column-date" style="font-weight: bold">Date</th>
        <th class="column-action" style="font-weight: bold">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(task, index) in tasks" :key="task.id">
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
</template>

<script>
export default {
  props: {
    tasks: Array,
    updateTaskStatus: Function,
    editTask: Function,
    deleteTask: Function,
    toggleAllCheckboxes: Function,
    getStatusStyle: Function,
  },
}
</script>

<style scoped></style>
