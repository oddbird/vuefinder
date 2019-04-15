<template>
  <table
    class="temps"
    :style="{
      '--high-temp': Math.max(...temps),
      '--low-temp': Math.min(...temps),
    }"
  >
    <tr data-row="hours">
      <th
        v-for="(temp, index) in temps"
        :key="index"
        data-cell="hour"
      >
        {{ time(index + start) }}
      </th>
    </tr>
    <tr
      data-row="temps"
      style="--ease: var(--out-back);"
    >
      <td
        v-for="(temp, index) in temps"
        :key="index"
        data-cell="temp"
        :style="{
          '--temp': temp,
          '--index': index,
        }"
      >
        <span class="temp">{{ temp }}°</span>
      </td>
    </tr>
  </table>
</template>

<style lang="scss">
.temps {
  display: grid;
  grid: auto 1fr / 1fr;
}

[data-row] {
  display: grid;
  grid-template-columns: var(--day-columns);
}

[data-cell] {
  grid-column-end: span var(--resolution);
}

[data-cell='hour'] {
  padding-bottom: var(--gutter);
}

[data-cell='temp'] {
  --pad: 5;
  --min: 32;
  --min-calc: calc(var(--low-temp) - var(--pad));
  --range: calc(var(--high-temp) - var(--min));
  display: grid;
  grid-template-rows: repeat(var(--range), minmax(0, 1fr));

  &::before {
    content: '';
    --temp-hue: calc(var(--temp) / var(--high-temp) * -360);
    --delay: calc(var(--index) * 0.1s);
    animation: grow-y var(--speed, 500ms) var(--delay, 0s) var(--ease, ease-in-out) both;
    background: hsl(var(--temp-hue), 75%, 50%);
    grid-row: calc(var(--high-temp) + 1 - var(--temp)) / -1;
    margin: 0 1px;
    transform-origin: 50% 100%;
  }
}

.temp {
  grid-row: -1;
  text-align: center;
}

@keyframes grow-y {
  from {
    transform: scaleY(0);
  }

  to {
    transform: scaleY(1);
  }
}

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

<script>
  export default {
    props: {
      start: {
        type: Number,
        default: 6,
      },
      end: {
        type: Number,
        default: 22,
      },
    },
    data() {
      return {
        dayTemps: [
          49, 48, 47, 46, 45, 45, 45, 46, 49, 53, 59, 63,
          66, 69, 71, 71, 72, 71, 70, 68, 65, 62, 59, 57,
        ],
      }
    },
    computed: {
      temps() {
        return this.dayTemps.slice(this.start, this.end);
      }
    },
    methods: {
      time(hour) {
        return hour > 12
          ? `${hour - 12}pm`
          : `${hour}am`;
      },
    },
  }
</script>
