<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
const pageDescription = {
  'jobSearch': [
    '搜尋欄：依照搜尋的調整進行篩選',
    '顯示：API 回傳以及搜尋欄篩選後顯示資料',
    '需能彈性抽換顯示模組',
    '需能彈性抽換 API'
  ],
  'about': [
    'Vue3 + Vite + Vue Router',
    'Composition API',
    'SCSS',
    'Skelton Screen',
  ]
}

const router = useRoute()
</script>

<template>
  <header class="header">
    <div class="header__wrap">
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
  
      <div class="wrapper">
        <HelloWorld msg="You did it!" :descriptions="pageDescription[router.name] || []"/>
        <nav>
          <RouterLink to="/">JobSearch</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
    </div>
  </header>
  <div class="content">
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
.header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 16px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 991px) {
  .header {
    display: flex;
    place-items: center;
    position: sticky;
    top: 0;
    padding-right: calc(var(--section-gap) / 2);
    padding-left: calc(var(--section-gap) / 2);
    align-items: center;
    justify-content: center;

    &__wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      flex-direction: column;
    }
  }

  .logo {
    margin: 2rem;
  }

  header .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  nav {
    text-align: center;
    margin-left: -1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }

  .content {
    min-height: 100vh;
  }
}

@media (min-width: 1280px) {
  .header {
    &__wrap {
      flex-direction: row;
    }
    .wrapper {
        justify-content: flex-start;
    }
  }
  nav {
    text-align: left;
  }
}
</style>
