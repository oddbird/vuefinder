<template>
  <section>
    <div class="layout">
      <div class="inner h1">header</div>
      <div class="inner nav">nav</div>
      <div class="inner main">main</div>
      <div class="inner footer">footer</div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.layout {
  display: grid;
  grid-gap: 0.5em;
  grid-template:
      'header header' auto
      'nav main' 1fr
      'footer footer' auto
    / minmax(10em, auto) minmax(0, 1fr);
  padding: size('gutter');

  @media (max-width: 50em) {
    grid-template: 'header'
                   'nav'
                   'main'
                   'footer'
                  / 1fr;
  }
}

.inner {
  background: color('callout');
  padding: size('shim');
}

.h1 { grid-area: header; }
.nav { grid-area: nav; }
.main { grid-area: main; }
.footer { grid-area: footer; }
</style>
