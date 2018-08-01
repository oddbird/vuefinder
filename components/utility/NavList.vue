<template>
  <nav data-nav="pagelist">
    <div v-for="(list, group) in pages" :key='group'>
      <h2 class="pagelist-title">{{ group }}:</h2>
      <ul class="pagelist-group">
        <li v-for="(name, path) in list"
          :key="path"
          class="pagelist-page" >
          <nuxt-link :to="path">{{ name }}</nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    data() {
      return {
        pages: {
          talks: {
            'design-systems': 'Agile Design Systems',
          },
        }
      };
    },
  }
</script>

<style lang="scss">
@import '~assets/scss/config/manifest';

.pagelist-title {
  text-transform: capitalize;
}

.pagelist-group {
  list-style: disc;
  margin: size('halfline') 0;
}
</style>
