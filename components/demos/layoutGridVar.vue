<template>
  <section class="demo">
    <div class="controls">
      <label for="layout">
        <span>layout:</span>
        <input @keydown.stop="" id="layout" type="text" v-model="layout">
      </label>
      <label for="start">
        <span>start:</span>
        <input @keydown.stop="" id="start" type="text" v-model="start">
      </label>
      <label for="duration">
        <span>duration:</span>
        <input @keydown.stop="" id="duration" type="text" v-model="duration">
      </label>
    </div>
    <div
      class="layout"
      :style="{'--layout': layout}">
      <div v-for="i in count"
        :key="i"
        :data-inner="i"
        :style="{'--start': start, '--duration': duration}">
        {{ i }}
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        count: [...Array(10)].map((e, i) => i + 1),
        layout: 'repeat(auto-fit, minmax(2em, 1fr))',
        start: 2,
        duration: 2,
      }
    },
  }
</script>

<style lang="scss" scoped>
.demo {
  display: grid;
  grid-template-rows: auto 1fr;
}

.controls {
  border-bottom: pattern('border');
  display: flex;
}

.layout {
  --layout: repeat(10, 1fr);
  display: grid;
  grid-auto-rows: 1fr;
  grid-auto-flow: dense;
  grid-template-columns: var(--layout);

  // the rest is just detatils
  grid-auto-rows: 1fr;
  grid-gap: 0.5em;
}

[data-inner] {
  align-items: center;
  background: hsl(0, 0%, 90%);
  display: flex;
  justify-content: center;
}

[data-inner='1'] {
  background: hsl(0, 50%, 90%);
  grid-column: var(--start) / span var(--duration);
}

label {
  @include font-family('code');
  display: flex;
  font-size: size('code');
  flex: 1 1 auto;
}

[for='layout'] {
  flex: 6 1 auto;
}

span {
  color: color('accent');
  font-style: italic;
}

span,
input {
  padding: size('quarter-shim');
}

[id] {
  width: 3em;
}

[id='layout'] {
  flex: 1 1 auto;
}

</style>
