import { defineStore } from 'pinia'
import { useWebFetch, handleFetchData } from '../composables/useWebFetch.js'

export const useJobStore = defineStore('jobStore', () => {
  const GET_JOBS = async () => {
    const { data, error } = await useWebFetch('https://jsonplaceholder.typicode.com/todos')
    return handleFetchData({ data, error, handleFn: () => data })
  }

  return {
    GET_JOBS
  }
})