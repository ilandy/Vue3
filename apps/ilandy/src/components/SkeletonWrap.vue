<script setup>
import { apiIsLoading } from '@/composables/useWebFetch.js';
defineProps({
  transitionName: {
    type: String,
    default: 'fade'
  }
})
</script>

<template>
  <div v-show="apiIsLoading">
    <slot name="loading" class="SkeletonWrap--loading"></slot>
  </div>
  <div v-show="!apiIsLoading">
    <slot name="loadingFinish"></slot>
  </div>
</template>

<style scoped lang="scss">
</style>