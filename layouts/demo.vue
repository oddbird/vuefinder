<template>
  <nuxt/>
</template>

<style lang="scss">
  @include import-webfonts;

  html {
    @include font-family('code');
    font-size: calc(100% + 0.5vw);
    font-size: calc(1em + 0.5vw);
  }
</style>
