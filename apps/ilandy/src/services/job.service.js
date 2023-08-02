import {useJobStore} from '@/stores/job.js'

/**
 * @typedef {Object} FieldMap
 * @property {number} order - order
 * @property {string} text - text
 * */
const fieldsMaps = {
  id: {
    order: 1,
    text: 'ID'
  },
  title: {
    order: 2,
    text: '職缺標題'
  },
  completed: {
    order: 3,
    text: '是否完成'
  },
  userId: {
    order: 0,
    text: 'USER_ID'
  }
}

/**
 * @typedef {Object} FieldConfig
 * @property {string} field - field name
 * @property {Function} matchRule - match rule
 * */
const fieldsConfig = [
  { 
    field: 'title',
    matchRule: ({value, keyword}) => {
      return value.includes(keyword)
    }
  },
  { 
    field: 'completed',
    matchRule: ({value, keyword}) => {
      return value.toString().includes(keyword)
    }
  }
]

/**
 * @function fieldsDisplayOrder - sort by order and return array of object include key and text
 * @param {Object} fields
 * @param {string} cardLabel
 * @returns {Array}
 * */
const fieldsDisplayOrder = (fields, cardLabel) => {
  // sort by order and return array of object include key and text
  return Object.entries(fields).sort((a, b) => {
    return a[1].order - b[1].order
  })
    .map(item => {
      const [ key, value ] = item
      return {
        key,
        text: value.text
      }
    })
    .filter(item => item.key !== cardLabel)
}

/**
 * @function JobApiService - job api service
 * @returns {Object}
 * */
const JobApiService = () => {
  const jobStore = useJobStore()

  /**
   * @function getJobs - get jobs
   * @returns {Array}
   * */
  const getJobs = async () => {
    return await jobStore.GET_JOBS()
  }

  return {
    getJobs
  }
}

export {
  fieldsConfig,
  fieldsMaps,
  fieldsDisplayOrder,
  JobApiService
}