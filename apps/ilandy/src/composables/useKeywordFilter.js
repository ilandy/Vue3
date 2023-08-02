import { } from 'vue'
export const useKeywordFilter = () => {

  /**
   * @function checkMatch - check if the keyword matches the data
   * @param {string} keyword
   * @param {Array} fields
   * @param {Object} data
   * @returns {boolean}
   * */
  const checkMatch = (keyword, fields, data) => {
    return fields.find(item => {
      if (!item.matchRule) {
        console.error('matchRule is not defined')
        return true
      }

      return item.matchRule({ keyword, value: data[item.field] })
    })
  }

  /**
   * @function handleFilter - filter the data based on the keyword
   * @param {Object} conditions
   * @param {string} conditions.keyword
   * @param {Array} conditions.fields
   * @param {Array} rawData
   * @returns {Array}
   * */
  const handleFilter = ({ conditions = {}, rawData = [] }) => {
    const { keyword, fields } = conditions
    if (!fields) {
      console.error('fields is not defined')
      return rawData
    }

    return rawData.filter(data => {
      return checkMatch(keyword, fields, data)
    })
  }

  return {
    handleFilter
  }
}