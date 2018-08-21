<template>
  <main data-layout="home">
    <h1 class="site-title">
      <b>OddBird</b> Talks
    </h1>
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
@import '~/assets/scss/_vuefinder.scss';

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
