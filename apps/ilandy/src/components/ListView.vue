<script setup>
import { computed } from 'vue';
import { fieldsDisplayOrder } from '@/services/job.service.js';
import SkeletonWrap from '@/components/SkeletonWrap.vue';


const props = defineProps({
  jobs: {
    type: Array,
    required: true
  },
  cardLabel: {
    type: String,
    default: ''
  },
  fields: {
    type: Object,
    default: () => {}
  }
})

const filterFields = computed(()=> {
  return fieldsDisplayOrder(props.fields, props.cardLabel)
})

const isJobEmpty = computed(()=> {
  return props.jobs.length === 0
})
</script>

<template>
  <div class="ListView">
    <SkeletonWrap transition-name="fade">
      <template #loading>
        <div class="ListView__skeleton">
          <article class="ListView__skeletonRow background-loading" v-for="n in 10" :key="n">
            <mark class="ListView__skeletonLabel background-loading" v-if="cardLabel"></mark>
            <template v-for="field in filterFields" :key="field.order">
              <p class="ListView__skeletonField background-loading"></p>
            </template>
          </article>
        </div>
      </template>

      <template #loadingFinish>
        <div class="ListView__empty" v-show="isJobEmpty">
          沒有符合的資料
        </div>
        <div class="ListView__content" v-show="!isJobEmpty">
          <article class="ListView__row" v-for="job in jobs" :key="job.id">
            <mark class="ListView__label" v-if="cardLabel">{{ fields[cardLabel].text }}: {{ job[cardLabel] }}</mark>
            <template v-for="field in filterFields" :key="field.order">
              <p>{{field.text}}：{{ job[field.key] }}</p>
            </template>
          </article>
        </div>
      </template>
    </SkeletonWrap>
  </div>
</template>

<style scoped lang="scss">
$green: hsla(160, 100%, 37%, 1);
.ListView {

  &__row {
    border: 1px solid $green;
    border-radius: 4px;
    margin-bottom: 32px;
    padding: 16px;
    position: relative;
  }

  &__label {
    position: absolute;
    display: inline-block;
    background-color: $green;
    color: #fff;
    padding: 4px 16px;
    line-height: 1;
    font-size: 10px;
    border-radius: 20px;
    margin-right: 8px;
    top: -10px;
  }

  &__skeletonRow {
    border-radius: 4px;
    margin-bottom: 32px;
    padding: 32px 16px 16px;
    position: relative;
  }

  &__skeletonLabel {
    position: absolute;
    background-color: #333;
    display: inline-block;
    padding: 4px 16px;
    line-height: 1;
    font-size: 10px;
    border-radius: 20px;
    margin-right: 8px;
    top: -10px;
    height: 20px;
    width: 57px;
  }

  &__skeletonField {
    height: 12px;
    width: 75%;
    border-radius: 10px;
    margin-bottom: 12px;
    &:not(:last-child) {
      width: 100%;
    }
  }
}
</style>