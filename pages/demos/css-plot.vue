<template>
  <section data-root="css-plot">
    <div class="plot-controls">
      <button @click="setData">
        Generate Data
      </button>
    </div>

    <table class="plot-graph"
      :style="{
        '--x-scale': x,
        '--y-scale': y,
        '--z-scale': z,
      }" >
      <thead class="plot-head">
        <tr class="plot-labels">
          <th data-head="name">name</th>
          <th data-head="x">x value</th>
          <th data-head="y">y value</th>
          <th data-head="z">size == z value</th>
        </tr>
      </thead>
      <tbody class="plot-body">
        <tr v-for="(item, index) in getPlot"
          :key="index"
          :style="{
            '--x': item.x,
            '--y': item.y,
            '--z': item.z,
          }"
          :data-summary="`${item.name}: (x${item.x}, y${item.y}, z${item.z})`"
          :data-flip-x="(item.x > (x / 2))"
          :data-flip-y="(item.y > (y / 2))"
          class="plot-item" >
          <td data-val="name">{{ item.name }}</td>
          <td data-val="x">{{ item.x }}</td>
          <td data-val="y">{{ item.y }}</td>
          <td data-val="z">{{ item.z }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        x: 100,
        y: 100,
        z: 25,
        plot: [],
      }
    },
    computed: {
      getPlot() {
        if (this.plot.length < 1) {
          this.setData();
        }

        return this.plot;
      }
    },
    methods: {
      randomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      },
      makeData(count) {
        const plot = [];

        for (
          let index = 1;
          index <= count;
          index++
        ) {
          plot.push({
            name: `item-${index}`,
            x: this.randomInt(this.x),
            y: this.randomInt(this.y),
            z: this.randomInt(this.z),
          });
        }

        return plot;
      },
      setData() {
        this.plot = this.makeData(20);
      }
    },
  }
</script>

<style lang="scss">
@import '~/assets/scss/base/_manifest.scss';

// Page
// ----

[data-root='css-plot'] {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  height: 100vh;
}

.plot-controls {
  background: lightgray;
  border-bottom: pattern('border');
  padding: size('half-shim') size('gutter');
  text-align: right;
}

button {
  @include contrasted('action');
  border: pattern('border-action');
  border-radius: size('corner');
  font-size: size('xsmall');
  padding: 0 size('shim');

  #{$focus} {
    @include contrasted('action-hover');
  }
}

// Chart
// -----

.plot-graph {
  @include font-family('code');
  display: grid;
  font-size: size('code');
  grid-template: '. z' size('gutter')
                 'y plot' 1fr
                 '. x' size('gutter');
  grid-template-columns: size('gutter') 1fr;
  padding: size('gutter');
}

.plot-head,
.plot-labels {
  display: grid;
  grid-area: 1 / 1 / -1 / -1;
  grid-template: inherit;
}

[data-head] {
  align-self: center;
  justify-self: center;
}

[data-head='name'] {
  @include is-hidden;
}

[data-head='x'] {
  grid-area: x;
}

[data-head='y'] {
  display: block;
  grid-area: y;
  writing-mode: vertical-rl;
}

[data-head='z'] {
  grid-area: z;
}

.plot-body {
  --x-max: calc(var(--x-scale) + 1);
  --y-max: calc(var(--y-scale) + 1);
  --z-max: calc(var(--z-scale) + 1);
  align-items: start;
  background-image:
    repeating-linear-gradient(
      to right,
      color('shadow', ('rgba': 0.25)),
      color('shadow', ('rgba': 0.25)) 1px,
      transparent 1px,
      transparent
    ), repeating-linear-gradient(
      to top,
      color('shadow', ('rgba': 0.25)),
      color('shadow', ('rgba': 0.25)) 1px,
      transparent 1px,
      transparent
    );
  background-size: 5% 5%;
  background-position: bottom left;
  display: grid;
  grid-area: plot;
  grid-template: repeat(var(--y-max), minmax(1px, 1fr))
               / repeat(var(--x-max), minmax(1px, 1fr));
  justify-items: start;
  overflow: hidden;
}

.plot-item {
  --size: calc((var(--z) + 1) * 1vmin);
  --h: calc(330 / var(--x-scale) * var(--x));
  --s: calc(85 / var(--y-scale) * var(--y) * 1% + 15%);
  --l: calc(75 / var(--z-scale) * var(--z) * 1%);
  background: hsl(var(--h), var(--s), var(--l));
  border: pattern('border-base') var(--border, transparent);
  border-radius: 50%;
  box-shadow: 0 0 size('half-shim') var(--border, transparent);
  grid-area: calc(var(--y) * -1) / var(--x);
  height: var(--size);
  position: relative;
  width: var(--size);
  opacity: var(--a, 0.5);
  transform: translate3d(-50%, -50%, 0);
  transition: opacity 200ms ease;

  #{$focus} {
    --a: 1;
    --border: currentColor;
    z-index: 2;
  }

  @include after(attr(data-summary)) {
    background: white;
    bottom: var(--bottom, auto);
    border: inherit;
    border-radius: size('corner');
    box-shadow: inherit;
    display: block;
    font-size: size('xsmaller');
    left: var(--left, 50%);
    opacity: var(--a, 0);
    pointer-events: none;
    padding: 0 size('half-shim');
    position: absolute;
    right: var(--right, auto);
    top: var(--top, 50%);
    transition: inherit;
    white-space: nowrap;
    z-index: 2;
  }
}

[data-flip-x] {
  --left: auto;
  --right: 50%;
}

[data-flip-y] {
  --bottom: 50%;
  --top: auto;
}

[data-val] {
  @include is-hidden;
}
</style>
