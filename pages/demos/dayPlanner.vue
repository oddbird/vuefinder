<template>
  <main
    data-grid="day"
    :style="{
      '--day-start': start,
      '--day-end': end,
      '--resolution': resolution,
    }"
  >
    <header class="about">
      <h1>Monday, April 15</h1>
      <p>Denver, CO</p>
    </header>

    <day-temps :start="start" :end="end" />
    <day-events :start="start" :end="end" />
  </main>
</template>

<style lang="scss">
// base styles…
@import '~accoutrement/sass/init';
@include import-webfonts;

html {
  @include font-family('code');

  --small: 0.75em;
  --gutter: 1em;

  font-size: calc(16px + 0.5vw);
  padding: var(--gutter);
}

// page layout
[data-grid="day"] {
  display: grid;
  background: linear-gradient(
    to right,
    hsla(0, 0%, 50%, 0.25) 1px,
    transparent 1px 100%,
  );
  background-size: calc(100% / var(--day-hours));
  grid: auto 1fr auto / auto;
  min-height: calc(100vh - (var(--gutter) * 2));
  row-gap: var(--gutter);

  // for our sub-grids to use…
  --day-hours: calc(var(--day-end) - var(--day-start));
  --col-count: calc(var(--day-hours) * var(--resolution));
  --col-size: minmax(0, 1fr);
  --day-columns: repeat(var(--col-count), var(--col-size));
}

p,
time {
  font-size: var(--small);
}
</style>

<script>
  import dayTemps from '~/components/dayplanner/dayTemps.vue';
  import dayEvents from '~/components/dayplanner/dayEvents.vue';

  export default {
    layout: 'demo',
    components: {
      dayTemps,
      dayEvents,
    },
    data() {
      return {
        start: 6,
        end: 22,
        resolution: 4,
      }
    },
    computed: {
      high() {
        return Math.max(...Object.values(this.data.temps));
      },
      low() {
        return Math.min(...Object.values(this.data.temps));
      },
    },
  }
</script>
