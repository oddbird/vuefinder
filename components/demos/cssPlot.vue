<template>
  <section data-root="css-plot">
    <div class="plot-controls">
      <button-style @click="changeData" >
        Generate Data
      </button-style>
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
      <transition-group name="plot-data"
        tag="tbody"
        class="plot-body" >
        <tr v-for="(item, index) in plot"
          :key="index"
          :style="{
            '--x': item.x,
            '--y': item.y,
            '--z': item.z,
            '--index': z + 1 - item.z,
          }"
          class="plot-item" >
          <td data-val="name">{{ item.name }}</td>
          <td data-val="x">{{ item.x }}</td>
          <td data-val="y">{{ item.y }}</td>
          <td data-val="z">{{ item.z }}</td>
        </tr>
      </transition-group>
    </table>
  </section>
</template>

<script>
  import ButtonStyle from '~/components/utility/ButtonStyle.vue';

  export default {
    components: {
      ButtonStyle,
    },
    data() {
      const x = 100;
      const y = 100;
      const z = 25;
      const plot = [...Array(20)].map((i) => {
        return {
          name: `item-${i}`,
          x: this.randomInt(x),
          y: this.randomInt(y),
          z: this.randomInt(z),
        };
      });

      return { x, y, z, plot }
    },
    methods: {
      randomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      },
      changeData() {
        this.plot.forEach((e, i) => {
          this.plot[i].x = this.randomInt(this.x);
          this.plot[i].y = this.randomInt(this.y);
          this.plot[i].z = this.randomInt(this.z);
        });
      },
    },
  }
</script>

<style lang="scss" scoped>
[data-root='css-plot'] {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
}

.plot-controls {
  border-bottom: pattern('border');
  display: flex;
  justify-content: flex-end;
  padding: size('quarter-shim');
  text-align: right;
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
  --size: calc(5px + (var(--z) + 1) * var(--grow, 0.25em));
  --h: calc(330 / var(--x-scale) * var(--x));
  --s: calc(85 / var(--y-scale) * var(--y) * 1% + 15%);
  --l: calc(75 / var(--z-scale) * var(--z) * 1%);
  grid-area: calc(var(--y) * -1) / var(--x);
  height: 1px;
  opacity: var(--a, 0.5);
  position: relative;
  transition: all 200ms ease;
  transform: translate3d(-50%, -50%, 0);
  white-space: nowrap;
  width: 1px;
  z-index: var(--index);

  #{$focus} {
    --a: 1;
  }

  @include before('') {
    background-color: hsl(var(--h), var(--s), var(--l));
    background-image: radial-gradient(
      circle at 50%,
      black 2px,
      transparent 2px
    );
    border-radius: 50%;
    display: block;
    height: var(--size);
    position: absolute;
    transition: all 200ms ease;
    transform: translate3d(-50%, -50%, 0);
    width: var(--size);
  }
}

[data-val] {
  @include is-hidden;
}
</style>
