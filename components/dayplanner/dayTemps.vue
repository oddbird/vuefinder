<template>
  <table class="temps"
    :style="{
      '--high-temp': high,
      '--low-temp': low,
    }" >

    <!-- Hours -->
    <tr data-row="hours">
      <th
        data-cell="hour-title"
        v-for="(temp, time) in temps" :key="time" >
        {{ time }}
      </th>
    </tr>

    <!-- Temps -->
    <!--  -->
    <tr data-row="temps" :style="{'--ease': ease}">

      <!-- Temp -->
      <!-- (temp, time, index) -->
      <!-- '--index': index, -->
      <td
        data-cell="temp-value"
        :style="{
          '--temp': temp,
          '--index': index,
        }"
        v-for="(temp, time, index) in temps" :key="time" >
        <span class="temp-value">
          {{ temp }}°
        </span>
      </td>

    </tr>

  </table>
</template>

<style lang="scss">
// Grid Alignment
// --------------

.temps {
  display: grid;
  grid: auto 1fr / 1fr;
}

[data-row] { // table header & data rows
  display: grid;
  grid-template-columns: var(--day-template);
}

[data-cell] { // header and data cells
  grid-column-end: span var(--columns-per-hour);
}


// Title Orientation
// -----------------

[data-cell='hour-title'] {
  writing-mode: vertical-lr;
}


// Value Visualization
// -------------------

[data-cell='temp-value'] {
  --range: calc(var(--high-temp) - var(--low-temp));
  display: grid;
  grid-template-rows: repeat(var(--range), minmax(1px, 1fr));

  &::before {
    content: '';
    background: hsl(0, 75%, 50%);
    grid-row: calc(var(--high-temp) + 1 - var(--temp)) / -1;
    margin: 0 1px;
  }
}

.temp-value {
  grid-row: -1;
}


// Change the Scale
// ----------------

[data-cell='temp-value'] {
  --range: calc(var(--high-temp) - var(--min-temp, var(--low-temp, 32)));
  --min-temp: calc(var(--low-temp) - var(--pad, 2));
  --pad: 2;
}


// Add Colors
// ----------

[data-cell='temp-value'] {
  &::before {
    --temp-fraction: calc(var(--temp) / var(--range));
    --hue-range: 180;
    --temp-hue: calc(
      var(--temp-fraction) * var(--hue-range)
    );
    background: hsl(var(--temp-hue, 0), 75%, 50%);
  }
}


// Improved Colors
// ---------------

[data-cell='temp-value'] {
  &::before {
    --hue-direction: -1;
    --hue-offset: 90;
    --temp-hue: calc(
      var(--temp-fraction)
      * var(--hue-range)
      * var(--hue-direction)
      + var(--hue-offset)
    );
  }
}


// Graph Animation
// ---------------

@keyframes grow-y {
  from {
    transform: scaleY(0);
  }

  to {
    transform: scaleY(1);
  }
}

[data-cell='temp-value'] {
  &::before {
    animation: grow-y
      var(--speed, 2s)
      var(--delay, 0s)
      var(--ease, ease-in-out)
      both;
  }
}


// Animation Origin
// ================

[data-cell='temp-value'] {
  &::before {
    transform-origin: 50% 100%;
  }
}


// Animation Index Delay
// =====================
// - counter() is only valid in content property
// - :nth-child() selectors would have to be explicit

[data-cell='temp-value'] {
  --delay: calc(var(--index) * 50ms);
}


// Animation Easing Presets
// ------------------------

[style*='--ease'] {
  --in-quad: cubic-bezier(0.55, 0.085, 0.68, 0.53);
  --in-cubic: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  --in-quart: cubic-bezier(0.895, 0.03, 0.685, 0.22);
  --in-quint: cubic-bezier(0.755, 0.05, 0.855, 0.06);
  --in-sine: cubic-bezier(0.47, 0, 0.745, 0.715);
  --in-expo: cubic-bezier(0.95, 0.05, 0.795, 0.035);
  --in-circ: cubic-bezier(0.6, 0.04, 0.98, 0.335);
  --in-back: cubic-bezier(0.6, -0.28, 0.735, 0.045);
  --out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);
  --out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);
  --out-quint: cubic-bezier(0.23, 1, 0.32, 1);
  --out-sine: cubic-bezier(0.39, 0.575, 0.565, 1);
  --out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  --out-circ: cubic-bezier(0.075, 0.82, 0.165, 1);
  --out-back: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --in-out-quad: cubic-bezier(0.455, 0.03, 0.515, 0.955);
  --in-out-cubic: cubic-bezier(0.645, 0.045, 0.355, 1);
  --in-out-quart: cubic-bezier(0.77, 0, 0.175, 1);
  --in-out-quint: cubic-bezier(0.86, 0, 0.07, 1);
  --in-out-sine: cubic-bezier(0.445, 0.05, 0.55, 0.95);
  --in-out-expo: cubic-bezier(1, 0, 0, 1);
  --in-out-circ: cubic-bezier(0.785, 0.135, 0.15, 0.86);
  --in-out-back: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
</style>


<style data-note="style cleanup...">
.temps {
  font-size: var(--small);
}

[data-cell='hour-title'] {
  padding-bottom: var(--gutter);
  text-align: left;
}

[data-cell='temp-value'] {
  text-align: center;
}
</style>

<script>
  export default {
    props: {
      allTemps: {
        type: Array,
        required: true,
      },
      start: {
        type: Number,
        required: true,
      },
      end: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        ease: 'var(--out-back)'
      }
    },
    computed: {
      temps() {
        return this.makeTemps();
      },
      high() {
        return Math.max(...this.allTemps);
      },
      low() {
        return Math.min(...this.allTemps);
      },
    },
    watch: {
      start() {
        this.temps = this.makeTemps();
      },
      end() {
        this.temps = this.makeTemps();
      }
    },
    methods: {
      makeTemps() {
        const slice = this.allTemps.slice(this.start, this.end);
        const times = {};

        slice.forEach((temp, i) => {
          const time = this.time(i + this.start);
          times[time] = temp;
        });

        return times;
      },
      time(hour) {
        return (hour < 12)
          ? `${hour || 12}am`
          : `${hour - 12 || hour}pm`;
      },
    },
  }
</script>
