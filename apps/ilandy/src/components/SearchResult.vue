<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useKeywordFilter } from '@/composables/useKeywordFilter.js'
import { fieldsConfig, fieldsMaps, JobApiService } from '@/services/job.service.js'
import CardView from '@/components/CardView.vue'

const props = defineProps({
  keyword: {
    type: String,
    default: ''
  },
  componentLabelKey: {
    type: String,
    default: ''
  },
  UIComponent: {
    type: Object,
    default: () => {
      return {
        labelKey: 'id',
        component: CardView
      }
    }
  }
})
const jobs = ref([])
const { handleFilter } = useKeywordFilter()

const filterJobs = computed(() => {
  return handleFilter({
    rawData: jobs.value,
    conditions: {
      keyword: props.keyword,
      fields: fieldsConfig
    }
  })
})

const { getJobs } = JobApiService()
onMounted(async () => {
  jobs.value = await getJobs()
})

watch(() => props.keyword, async () => {
  jobs.value = await getJobs()
})

</script>

<template>
  <section class="SearchResult">
    <component :is="UIComponent.component" 
      :jobs="filterJobs"
      :fields="fieldsMaps"
      :card-label="UIComponent.labelKey"
    ></component>
  </section>
</template>

<style>
.SearchResult {
  flex: auto 0 0;
  margin-top: 32px;
  padding: 0 16px;
  line-height: 28px;
}
</style>