<template>
  <div class="css-chart">
    <!-- Expanding on https://css-tricks.com/making-a-bar-chart-with-css-grid/ -->

    <!-- Set "--scale" based on the data: in this case 100% -->
    <!-- Set "--value" values calculated as: "<scale> + 1 - <valueorrects-->
    <!-- (the +1 corrects for 1-index of grid-lines) -->

    <dl class="chart" style="--scale: 100;">

      <dt class="date">2000</dt>
      <dd class="bar" style="--value: 45;">
        <span class="value">45%</span>
      </dd>

      <dt class="date">2001</dt>
      <dd class="bar" style="--value: 100;">
        <span class="value">100%</span>
      </dd>

      <dt class="date">2002</dt>
      <dd class="bar" style="--value: 63;">
        <span class="value">63%</span>
      </dd>

      <dt class="date">2003</dt>
      <dd class="bar" style="--value: 11;">
        <span class="value">11%</span>
      </dd>

      <dt class="date">2004</dt>
      <dd class="bar" style="--value: 46;">
        <span class="value">46%</span>
      </dd>

      <dt class="date">2005</dt>
      <dd class="bar" style="--value: 88;">
        <span class="value">88%</span>
      </dd>

      <dt class="date">2006</dt>
      <dd class="bar" style="--value: 35;">
        <span class="value">35%</span>
      </dd>

      <dt class="date">2007</dt>
      <dd class="bar" style="--value: 5;">
        <span class="value">5%</span>
      </dd>

      <dt class="date">2008</dt>
      <dd class="bar" style="--value: 78;">
        <span class="value">78%</span>
      </dd>

      <dt class="date">2009</dt>
      <dd class="bar" style="--value: 91;">
        <span class="value">91%</span>
      </dd>

      <dt class="date">2010</dt>
      <dd class="bar" style="--value: 55;">
        <span class="value">55%</span>
      </dd>

      <dt class="date">2011</dt>
      <dd class="bar" style="--value: 16;">
        <span class="value">16%</span>
      </dd>

    </dl>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
.css-chart {
  display: grid;
}

.chart {
  /* Setup the grid */
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-rows: repeat(var(--scale, 100), minmax(0, 1fr)) 1.4rem;
  grid-column-gap: 5px;

  /* Generate background guides */
  /* (sub-pixel rounding errors make this imperfect) */
  --line-every: 10;
  background-image: linear-gradient(to bottom, #ccc 1px, transparent 1px);
  background-size: 100% calc((100% - 1.4rem) / var(--scale) * var(--line-every));

  /* other styles… */
  margin: 2em 0 1em;
  padding: 0 1em;
  position: relative;
}

.chart::after {
  background: #fff;
  bottom: 0;
  content: ' ';
  height: 1.4rem;
  left: 0;
  position: absolute;
  right: 0;
}


/* Dates… */
/* ------ */

.date {
  align-items: center;
  display: flex;
  font-weight: bold;
  grid-row: -2 / span 1;
  justify-content: center;
  position: relative;
  text-align: center;
  z-index: 2;
}


/* Each bar on the graph… */
/* ---------------------- */

.bar {
  --start: calc(var(--scale) + 1 - var(--value));
  grid-row: var(--start) / -2;

  /* Background-Color */
  --position: calc(var(--start) / var(--scale) * 100%);
  background-image: linear-gradient(to right, green, yellow, orange, red);
  background-size: 1600% 100%;
  background-position: var(--position) 0;

  /* Other styles… */
  border-radius: 5px 5px 0 0;
  color: #000;
  list-style: none;
  position: relative;
}

.value {
  background: #fff;
  bottom: 100%;
  display: inline-block;
  left: 50%;
  padding: 0 0.4em;
  position: absolute;
  transform: translate(-50%, -1px);
}


/* Global helpers… */
/* --------------- */

.css-chart {
  @include font-family('code');
  font-size: size('code');
}
</style>
