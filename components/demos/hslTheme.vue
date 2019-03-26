<template>
  <div class="hsl-wrap"
    :style="style" >
    <div class="hsl-controls">
      <label for="hue">
        --hue: {{ hue }}
      </label>
      <input v-model="hue"
        id="do-hue"
        type="range"
        min="0"
        max="360" >
      <label for="sat">
        --saturation: {{ saturation }}
      </label>
      <input v-model="saturation"
        id="do-sat"
        type="range"
        min="0"
        max="100" >
      <label for="light">
        --lightness: {{ lightness }}
      </label>
      <input v-model="lightness"
        id="do-light"
        type="range"
        min="0"
        max="100" >
      <label for="switch">
        --threshold: {{ threshold }}
      </label>
      <input v-model="threshold"
        id="do-switch"
        type="range"
        min="0"
        max="100" >
    </div>

    <div class="hsl-comp">
      <h1>Complement</h1>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        hue: 330,
        saturation: 100,
        lightness: 34,
        threshold: 55,
      }
    },
    computed: {
      style() {
        return {
          '--hue': this.hue,
          '--saturation': this.saturation,
          '--lightness': this.lightness,
          '--threshold': this.threshold,
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
* {
  --s: calc(var(--saturation) * 1%);
  --l: calc(var(--lightness) * 1%);
  --contrast: calc((var(--lightness) - var(--threshold)) * -100%);
  --hsl: hsl(var(--h), var(--s), var(--l));
  --hsl-contrast: hsl(var(--h), var(--s), var(--contrast));
  --dark: calc(var(--l) - 20%);
  --dark-a: calc((var(--lightness) - var(--threshold)) * -10);
  --hsl-dark: hsla(var(--h), var(--s), var(--dark), var(--dark-a));
  --light: calc(var(--l) + 20%);
  --light-a: calc((var(--lightness) - var(--threshold) + 1) * 10);
  --hsl-light: hsla(var(--h), var(--s), var(--light), var(--light-a));
  --border: hsl(var(--h), var(--s), var(--dark));
  text-shadow: 0 1px 0 var(--hsl-dark), 0 1px 0 var(--hsl-light);
}

.hsl-wrap {
  display: grid;
  grid-template-rows: repeat(2, 1fr);
}

[for] {
  @include font-family('code');
  font-size: size('code');
}

.hsl-controls {
  --h: var(--hue);
  align-content: center;
  background: var(--hsl);
  border: size('shim') solid var(--border);
  color: var(--hsl-contrast);
  display: grid;
  grid-auto-flow: row reverse;
  grid-column-gap: size('shim');
  grid-template-columns: minmax(0, auto) auto;
  justify-content: center;
  padding: size('shim');
  text-align: left;
}

[id] {
  width: 100%;
}

.hsl-comp {
  --h: calc(var(--hue) - 180);
  align-content: center;
  background: var(--hsl);
  border: size('shim') solid var(--border);
  color: var(--hsl-contrast);
  display: grid;
  justify-content: center;
}
</style>
