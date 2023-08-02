<script setup>
import { ref } from 'vue'
import SearchPanel from '@/components/SearchPanel.vue'
import SearchResult from './SearchResult.vue';
import ListView from './ListView.vue';
import CardView from './CardView.vue';

const keyword = ref('')
const updateKeyword = (value) => {
  keyword.value = value
}
const displayComponent = {
  cardView: {
    labelKey: 'id',
    component: CardView
  },
  listView: {
    labelKey: 'id',
    component: ListView
  }
}

</script>

<template>
  <div class="JobSearch">
    <SearchPanel
      :keyword="keyword"
      @updateKeyword="updateKeyword"
    ></SearchPanel>
    <SearchResult
      :keyword="keyword"
      :UIComponent="displayComponent.cardView"  
    >
    </SearchResult>
  </div>
</template>

<style scoped lang="scss">
$green: hsla(160, 100%, 37%, 1);
.JobSearch {
  position: relative;
  display: flex;
  flex-direction: column;
}

@media (min-width: 1024px) {
}
</style>
