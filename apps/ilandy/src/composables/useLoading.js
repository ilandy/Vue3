import { computed, ref } from 'vue'

/**
 * A custom hook to manage a loading queue and provide a computed isLoading state
 * along with functions to add, remove, and clear loading items.
 * @returns {Object} - An object containing isLoading state and loading management functions.
 */
export const useLoading = () => {
  /**
   * The loading queue.
   * @type {Set<string>}
   */
  const loadingQueue = ref(new Set())

  /**
   * Computed property to determine if the loading queue is empty or not.
   * @type {boolean}
   */
  const isLoading = computed(() => loadingQueue.value.size > 0)

  /**
   * Add a loading item to the queue.
   * @param {string} uuid - The uuid of the loading item.
   */
  const add = (uuid) => {
      if (uuid && !loadingQueue.value.has(uuid)) {
        loadingQueue.value.add(uuid);
        return true;
      }
      return false;
    }

  /**
   * Remove a loading item from the queue.
   * @param {string} uuid - The uuid of the loading item.
   */
  const remove = (uuid) => {
    if (uuid && loadingQueue.value.has(uuid)) {
      loadingQueue.value.delete(uuid)
    }
  }

  /**
   * Clear all loading items from the queue.
   */
  const clear = () => {
    loadingQueue.value.clear()
  }

  return {
    isLoading,
    add,
    remove,
    clear,
  }
}