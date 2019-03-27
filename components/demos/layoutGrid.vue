<template>
  <section class="layout">
    <div class="inner h1">header</div>
    <div class="inner nav">nav</div>
    <div class="inner main">
      <strong>main</strong>
      <p>with some content...</p>
    </div>
    <div class="inner footer">footer</div>
  </section>
</template>

<style lang="scss" scoped>
.layout {
  display: grid;
  grid-gap: 0.5em;
  grid-template: 'header'
                  'nav'
                  'main'
                  'footer'
                / 1fr;
  padding: size('gutter');

  @media (min-width: 45em) {
    grid-template:
        'header header' auto
        'nav main' 1fr
        'nav footer' auto
      / minmax(10em, auto) minmax(0, 1fr);
  }
}

.inner {
  background: color('callout');
  padding: size('half-shim');
}

.h1 { grid-area: header; }
.nav { grid-area: nav; }
.main { grid-area: main; }
.footer { grid-area: footer; }
</style>
