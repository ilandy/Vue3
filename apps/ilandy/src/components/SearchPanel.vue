<script setup>
import { computed } from 'vue'
import { fieldsConfig, fieldsMaps } from '@/services/job.service.js'

const props = defineProps({
  keyword: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['updateKeyword'])
const searchKeyword = computed({
  get() {
    return props.keyword
  },
  set(value) {
    emits('updateKeyword', value)
  }
})

</script>

<template>
  <section class="SearchPanel">
    <input v-model.lazy="searchKeyword" class="SearchPanel__input" type="text" placeholder="搜尋欄位關鍵字">
    <p>可搜尋欄位: 
      <span class="SearchPanel__inputField" v-for="item in fieldsConfig" :key="item">
        {{ fieldsMaps[item.field].text }}
      </span>，按 Enter 進行搜尋
    </p>
  </section>
</template>
<style scoped lang="scss">
$green: hsla(160, 100%, 37%, 1);
.SearchPanel {
  flex: 152px 0 0;
  padding: 32px 16px 0;

  &__input {
    width: 100%;
    font-size: 32px;
    background-color: rgb(39, 38, 38);
    border: none;
    border-radius: 4px;
    box-shadow: 0 0 0 1px inset $green;
    transition: all .3s ease-in;
    padding: 16px 32px;
    margin-bottom: 8px;
    color: #fff;

    &:focus,
    &:hover {
      outline: none;
      box-shadow: 0 0 0 2px $green inset;
    }                                                                                                                                                                                               
  }

  &__inputField:not(:last-child):after {
    content: '、';
  }
}
</style>