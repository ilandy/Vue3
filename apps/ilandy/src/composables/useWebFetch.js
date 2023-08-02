import { useLoading } from '@/composables/useLoading.js'
import { computed } from 'vue'

const apiLoading = useLoading()
export const apiIsLoading = computed(() => apiLoading.isLoading.value)

/**
 * @function handleFetchData - handle fetch data 
 * @param {Object} param.data
 * @param {Object} param.error
 * @param {Function} param.handleFn
 * @returns 
 */
export const handleFetchData = ({data, error, handleFn}) => {
  if (error) throw error
  
  if (!data) {
    console.error('data is not defined')
    return
  }
  
  if (!handleFn) {
    console.error('handleFn is not defined')
    return
  }
  
  return handleFn(data)
}

/**
 * @function useWebFetch - fetch data from web
 * @param {string} url
 * @param {Object} options
 * @returns {Object}
 * 
 */
export const useWebFetch = (url, options = {}) => {
  let fetchOptions = {...options}
  let fetchUuid = url + `${new Date().getTime().toString()}`
  
  apiLoading.add(fetchUuid)

  return fetch(url, fetchOptions)
    .then(res => {
      return {
        fetchUuid,
        status: res.status,
        data: res.json(),
        error: res.ok ? null : new Error('Fetch failed', {
          cause: {
            status: res.status
          }
        })
      }
    })
    .catch(error => {
      apiLoading.clear()
      return {
        fetchUuid,
        status: null,
        data: null,
        error: error
      }
    })
    .finally(() => {
      setTimeout(() => {
        apiLoading.remove(fetchUuid)
      }, 800)
    })
}