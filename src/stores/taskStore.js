import { defineStore } from 'pinia'
export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [
      {
        id: 1,
        name: 'hehehehe',
        status: 'inprogress',
        date: '2024-11-03',
        checked: false,
        type: 'work',
        color: '#ffecb3'
      },
      {
        id: 2,
        name: 'heloooo',
        status: 'done',
        date: '2024-11-04',
        checked: false,
        type: 'personal',
        color: '#c8e6c9'
      }
    ]
  }),

  actions: {
    addTask(task) {
      const newId = this.tasks.length > 0 
        ? Math.max(...this.tasks.map(t => t.id)) + 1 
        : 1;
        
      const newTask = {
        ...task,
        id: newId,
        type: 'work', 
        color: this.getColorByStatus(task.status)
      }
      
      this.tasks.push(newTask)
    },

    deleteTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId)
    },

    updateTask(taskId, updates) {
      const index = this.tasks.findIndex(task => task.id === taskId)
      if (index !== -1) {
        this.tasks[index] = {
          ...this.tasks[index],
          ...updates,
          color: this.getColorByStatus(updates.status || this.tasks[index].status)
        }
      }
    },

    getColorByStatus(status) {
      switch (status) {
        case 'done':
          return '#c8e6c9'
        case 'inprogress':
          return '#ffecb3'
        case 'rejected':
          return '#ffcdd2'
        default:
          return '#ffffff'
      }
    }
  }
})