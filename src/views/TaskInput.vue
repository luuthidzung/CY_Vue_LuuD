<template>
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
    </div>
  </div>
</template>

<script>
export default {
  props: {
    newTask: Object,
    submitTask: Function,
  },
}
</script>

<style scoped></style>
