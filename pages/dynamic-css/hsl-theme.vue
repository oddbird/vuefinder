<template>
  <div class="hsl-wrap"
    :style="style" >
    <div class="hsl-controls">
      <code class="hue">
        --hue: {{ hue }}
      </code>
      <input v-model="hue"
        data-do="hue"
        type="range"
        min="0"
        max="360" >
      <code class="sat">
        --saturation: {{ saturation }}
      </code>
      <input v-model="saturation"
        data-do="sat"
        type="range"
        min="0"
        max="100" >
      <code class="light">
        --lightness: {{ lightness }}
      </code>
      <input v-model="lightness"
        data-do="light"
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
        hue: 180,
        saturation: 50,
        lightness: 50,
      }
    },
    computed: {
      style() {
        return {
          '--hue': this.hue,
          '--saturation': this.saturation,
          '--lightness': this.lightness,
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
* {
  --h: var(--hue);
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
  --threshold: 55;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  min-height: 100vh;
}

.hsl-controls {
  align-content: center;
  background: var(--hsl);
  border: size('shim') solid var(--border);
  color: var(--hsl-contrast);
  display: grid;
  grid-column-gap: size('shim');
  grid-template: 'do-hue hue' auto
                 'do-sat sat' auto
                 'do-light light' auto /
                  minmax(0, auto) auto;
  justify-content: center;
  padding: size('shim');

  @include above('page') {
    grid-template: 'do-hue do-sat do-light' auto
                   'hue sat light' auto /
                   minmax(0, auto) minmax(0, auto) minmax(0, auto);
  }
}

code {
  text-align: center;
}

[data-do] {
  width: 100%;
}

[data-do='hue'] {
  grid-area: do-hue;
}

.hue {
  grid-area: hue;
}

[data-do='sat'] {
  grid-area: do-sat;
}

.sat {
  grid-area: sat;
}

[data-do='light'] {
  grid-area: do-light;
}

.light {
  grid-area: light;
}

.hsl-comp {
  --h: calc(var(--hue) + 60);
  align-content: center;
  background: var(--hsl);
  border: size('shim') solid var(--border);
  color: var(--hsl-contrast);
  display: grid;
  justify-content: center;
}
</style>
