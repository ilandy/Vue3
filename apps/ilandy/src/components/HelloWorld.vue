<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  },
  descriptions: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <p v-for="description in descriptions" :key="description">{{description}}</p>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

.greetings {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings,
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
  
}
</style>
