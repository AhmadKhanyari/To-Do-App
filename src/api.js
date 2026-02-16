import axios from 'axios'

const apiURL= 'https://dummyjson.com/todos'

// READ
export const getTodos = async () => {
  return await axios.get(apiURL)
}

// CREATE
export const createTodo = async (todoData) => {
  return await axios.post(`${apiURL}/add`, todoData)
}

// UPDATE
export const updateTodo = async (id, updatedData) => {
  return await axios.put(`${apiURL}/${id}`, updatedData)
}
 
// DELETE
export const deleteTodo = async (id) => {
  return await axios.delete(`${apiURL}/${id}`)
}