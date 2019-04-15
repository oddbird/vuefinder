<template>
  <nuxt/>
</template>

<style lang="scss">
  @import '~accoutrement/sass/init';
  @include import-webfonts;

  html {
    @include font-family('code');
    font-size: calc(16px + 0.5vw);
    --gutter: 1em;
    --small: 0.75em;
  }
</style>
