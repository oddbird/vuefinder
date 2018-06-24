<template>
  <div data-layout="home">
    <h1>
      nuxt-slides
    </h1>
    <nav-list v-for="key in keys" :key="key" :list-key="key"/>
  </div>
</template>

<script>
  import NavList from '~/components/NavList.vue'

  export default {
    components: {
      'nav-list': NavList
    },
    asyncData ({ app }) {
      return {
        keys: Object.keys(app.context.env)
      }
    },
  }
</script>
