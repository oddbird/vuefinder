<template>
  <main data-layout="home">
    <h1 class="site-title">
      <b>Vue</b>Finder
    </h1>
    <p class="tagline">
      Another way to manage slide decks with markdown…
    </p>
    <nav-list />
  </main>
</template>

<script>
  import NavList from '~/components/utility/NavList.vue';

  export default {
     components: {
      NavList,
    },
 }
</script>

<style lang="scss">
@import '~assets/scss/config/manifest';

[data-layout='home'] {
  margin: 0 auto;
  max-width: size('page');
  padding: size('gutter');
}

.site-title {
  font-size: size('xlarge');

  b {
    color: color('accent');
  }
}
</style>
