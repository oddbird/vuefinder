<template>
  <div class="css-chart">
    <div class="chart-controls">
      <button-style @click="changeData" >
        Generate Data
      </button-style>
    </div>

    <table
      class="chart"
      :style="{'--scale': scale, '--count': plot.length}">
      <tr
        v-for="(bar, i) in plot"
        :key="bar.year"
        :style="{'--value': bar.value}">
        <th>{{ bar.year }}</th>
        <td>
          <input
            type="number"
            v-model="plot[i].value"
            min="1"
            :max='scale'>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import ButtonStyle from '~/components/utility/ButtonStyle.vue';
export default {
  components: {
    ButtonStyle,
  },
  data() {
    const start = 2000;
    const scale = 100;

    const plot = [...Array(10)].map((e, i) => {
      return {
        year: start + i,
        value: this.randomInt(scale),
      };
    });

    return { start, scale, plot }
  },
  methods: {
    randomInt(max) {
      return Math.floor(Math.random() * Math.floor(max - 1) + 1);
    },
    changeData() {
      this.plot.forEach((e, i) => {
        this.plot[i].value = this.randomInt(this.scale);
      });
    },
  },
}
</script>


<style lang="scss" scoped>
.css-chart {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
}

.chart-controls {
  border-bottom: pattern('border');
  display: flex;
  justify-content: flex-end;
  padding: size('quarter-shim');
  text-align: right;
}

.chart {
  /* Setup the grid */
  display: grid;
  grid-template-columns: repeat(var(--count), minmax(0, 1fr));

  /* other styles… */
  margin: 2em 0 1em;
  overflow: hidden;
  padding: 0 1em;
}

tr {
  display: grid;
  grid-template-rows: repeat(var(--scale), minmax(0, 1fr)) auto;

  &::before {
    content: '';
    grid-column: 1;
    grid-row: 1 / -2;

    /* Generate background guides */
    /* (sub-pixel rounding errors make this imperfect) */
    --line-every: 10;
    background-image: linear-gradient(to top, #ccc 1px, transparent 1px);
    background-size: 100% calc(100% / var(--scale) * var(--line-every));
    border-top: 1px solid #ccc;
  }
}

/* Dates… */
/* ------ */

th {
  align-items: center;
  display: flex;
  font-weight: bold;
  grid-column: 1;
  grid-row: -2 / span 1;
  justify-content: center;
  text-align: center;
}

/* Each bar on the graph… */
/* ---------------------- */

td {
  --start: calc(var(--scale) + 1 - var(--value));
  grid-column: 1;
  grid-row: var(--start) / -2;

  /* Background-Color */
  --position: calc(var(--start) / var(--scale) * 100%);
  background-image: linear-gradient(to right, green, yellow, orange, red);
  background-size: 1600% 100%;
  background-position: var(--position) 0;

  /* Other styles… */
  align-content: center;
  align-items: center;
  border: 1px solid;
  border-radius: 5px 5px 0 0;
  color: #000;
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0 0.25em;
  opacity: 0.75;
  position: relative;
}

input {
  max-width: 3em;
  position: absolute;
  padding: 0 0.4em;

  &:focus {
    background: rgba(white, 0.8);
  }
}


/* Global helpers… */
/* --------------- */

.css-chart {
  @include font-family('code');
  font-size: size('code');
}
</style>
