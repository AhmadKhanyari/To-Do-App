<script setup>                         //Composition API(Vue3+Vite)
import { ref, onMounted } from 'vue'
import { getTodos, createTodo, updateTodo, deleteTodo } 
from './api.js'

const name = ref('To-Do')
const newTask = ref('')
const tasks = ref([])

// READ
onMounted(async () => {
  try {
    const response = await getTodos()
    tasks.value = response.data.todos
  } catch (error) {
    console.error('Error fetching todos:', error)
  }
})

// CREATE
const createTask = async () => {
  if (!newTask.value.trim()) return

  try {
    const response = await createTodo({
      todo: newTask.value,
      completed: false,
      userId: 1
    })

    tasks.value.push(response.data)
    newTask.value = ''
  } catch (error) {
    console.error('Create failed:', error)
  }
}

// UPDATE
const updateTask = async (task) => {
  try {
    await updateTodo(task.id, {
      todo: task.todo,
      completed: task.completed
    })
  } catch (error) {
    console.error('Update failed:', error)
  }
}

// DELETE
const deleteTask = async (taskId) => {
  //  const originalTasks = [...tasks.value]

  try {
    tasks.value = tasks.value.filter(task => task.id !== taskId)
    await deleteTodo(taskId)
  } catch (error) {
    console.error('Delete failed:', error)
    //  tasks.value = originalTasks // rollback
  }
}

</script>

<template>
  <div class="min-h-screen bg-gray-100 flex justify-center items-start p-6">
    <div class="w-full max-w-md bg-white rounded-xl shadow-md p-6">

      <!-- Header -->
      <h1 class="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-6">
  {{ name }}
</h1>

      <!-- Logic For Task Management -->
      <form @submit.prevent="createTask" class="flex gap-2 mb-6">
        <input
          v-model="newTask"
          type="text"
          placeholder="Add a new task..."
          class="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add
        </button>
      </form>

      <!-- Task List -->
      <ul class="space-y-3">
        <li
          v-for="task in tasks"
          :key="task.id"
          class="flex items-center gap-3 border border-gray-200 rounded-lg p-3"
        >
          <!-- Logic For Checkbox Implementation-->
         <input
          type="checkbox"
            v-model="task.completed"
              @change="updateTask(task)"
                 class="w-4 h-4"
                 />

          <!-- Task Title -->
          <span
   class="flex-1"
   :class="[
    task.completed ? 'line-through text-gray-400' : '',
    task.priority ? 'text-red-500 font-semibold': '',
      ]"
>
     {{ task.todo }}
          </span>

          <!-- Priority -->
          <select
            v-model="task.priority"
            class="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option :value="1">Priority </option>
          </select>

          <!-- Logic For Deletion Of Task -->
          <button
            @click="deleteTask(task.id)"
            class="text-red-500 font-bold text-lg hover:text-red-700"
          >
            ×
          </button>
        </li>
      </ul>

    </div>
  </div>
</template>





