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
  <div class="CardView">
    <SkeletonWrap transition-name="fade">
      <template #loading>
        <div class="CardView__skeleton">
          <article class="CardView__skeletonCard background-loading" v-for="n in 10" :key="n">
            <div class="CardView__skeletonLabel background-loading" v-if="cardLabel"></div>
            <div class="CardView__skeletonField background-loading" v-for="field in filterFields" :key="field.order"></div>
          </article>
        </div>
      </template>

      <template #loadingFinish>
        <div class="CardView__empty" v-show="isJobEmpty">
          沒有符合的資料
        </div>
        <div class="CardView__content" v-show="!isJobEmpty">
          <article class="CardView__card" v-for="job in jobs" :key="job.id">
            <mark class="CardView__label" v-if="cardLabel">{{ fields[cardLabel].text }}: {{ job[cardLabel] }}</mark>
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
.CardView {
  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  &__card {
    border: 1px solid $green;
    border-radius: 4px;
    margin-bottom: 32px;
    padding: 16px;
    position: relative;
    background-color: rgb(24, 24, 24);
    box-shadow: 0 40px 30px -50px hsla(160, 100%, 37%, .4);
    border-color: hsla(160, 100%, 37%, .6);
    transition: all .3s ease-in;
    cursor: pointer;
    &:hover {
      transform: scale(1.02);
      box-shadow: 0 50px 40px -40px hsla(160, 100%, 37%, .4);
      border-color: hsla(160, 100%, 37%, 1);
    }
  }

  &__label {
    background-color: $green;
    color: #fff;
    padding: 4px 16px;
    line-height: 1;
    font-size: 10px;
    border-radius: 20px;
    margin-right: 8px;
    top: -10px;
  }

  &__skeleton {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  &__skeletonCard {
    border-radius: 4px;
    margin-bottom: 32px;
    padding: 16px;
    position: relative;
    box-shadow: 0 40px 30px -50px #222;
    border-color: hsla(160, 100%, 37%, .6);
    transition: all .3s ease-in;
    cursor: pointer;
    filter: saturate(0.1) grayscale(0);
  }

  &__skeletonLabel {
    width: 5em;
    height: 20px;
    background-color: #77777755;
    color: #fff;
    padding: 4px 16px;
    line-height: 1;
    font-size: 10px;
    border-radius: 20px;
    margin-right: 8px;
    margin-bottom: 16px;
    top: -10px;
  }

  &__skeletonField {
    height: 12px;
    width: 75%;
    border-radius: 10px;
    margin-bottom: 12px;
    background: #77777755;
    &:not(:last-child) {
      width: 100%;
    }
  }
}

</style>