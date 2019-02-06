<template>
  <section data-root="css-linegraph">
    <div class="line-controls">
      <button-style @click="makeData" >
        Generate Data
      </button-style>
    </div>

    <table class="line-graph">
      <thead class="line-head">
        <tr class="line-labels">
          <th data-head="index">index</th>
          <th data-head="value">value</th>
        </tr>
      </thead>
      <tbody class="line-data"
        :style="dataStyle()">
        <tr v-for="(item, index) in getData"
          :key="index"
          :style="{'--value': item}"
          :data-item="index" >
          <td data-val="index">{{ index }}</td>
          <td data-val="value">{{ item }}</td>
        </tr>
      </tbody>
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
      return {
        x: 15,
        y: 100,
        plot: [],
      }
    },
    computed: {
      getData() {
        if (!this.plot.length) {
          this.makeData();
        }

        return this.plot;
      },
    },
    methods: {
      randomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      },
      makeData() {
        this.plot = [...Array(this.x)].map(() => this.randomInt(this.y));
      },
      dataStyle() {
        const style = {};
        this.plot.forEach((e, i) => style[`--i-${i}`] = e);
        return style;
      },
    },
  }
</script>

<style lang="scss" scoped>
[data-root='css-linegraph'] {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
}

.line-controls {
  background: lightgray;
  border-bottom: pattern('border');
  display: flex;
  justify-content: flex-end;
  padding: size('half-shim') size('gutter');
  text-align: right;
}

// Chart
// -----

.line-graph {
  @include font-family('code');
  display: grid;
  font-size: size('code');
  grid-template: 'y data' 1fr
                 '. x' size('gutter');
  grid-template-columns: size('gutter') 1fr;
  padding: size('shim') 0 size('shim') size('gutter');
}

.line-head,
.line-labels {
  display: grid;
  grid-area: 1 / 1 / -1 / -1;
  grid-template: inherit;
}

[data-head] {
  align-self: center;
  justify-self: center;
}

[data-head='index'] {
  grid-area: x;
}

[data-head='value'] {
  display: block;
  grid-area: y;
  writing-mode: vertical-rl;
}

$x: 15;
$one: percentage(1 / $x);
$clip: ((0 100%),);
$gradients: ();

@for $i from 0 to $x {
  $h: percentage($i / $x);
  $point: ($h calc(100% - var(--i-#{$i}, 50) * 1%));
  $clip: append($clip, $point);
  $grad: radial-gradient(
    circle at $point,
    black 3px,
    transparent 3px
  );
  $gradients: append($gradients, $grad, 'comma');
}

$clip: append($clip, (100% - $one 100%));

.line-data {
  display: grid;
  grid-area: data;
  grid-template-columns: repeat($x, minmax(0, 1fr));
  grid-template-rows: auto size('gutter');
  position: relative;

  @include before('') {
    background-image:
      $gradients,
      linear-gradient(to top, pink, lightsteelblue)
    ;
    clip-path: polygon($clip);
    grid-area: 1 / 1 / span 1 / -1;
    transition: all 300ms ease;
  }
}

[data-item] {
  grid-row: 2;
}

@for $i from 0 to $x {
  [data-item='#{$i}'] {
    grid-column: $i + 1;
  }
}

[data-val='index'] {
  transform: translateX(-50%);
}

[data-val='value'] {
  @include is-hidden;
}
</style>
