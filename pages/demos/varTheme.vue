<template>
  <main
    :data-theme="user.theme"
    :style="getStyle()"
    data-colors
    >
    <h1>Custom Property Color Palettes</h1>

    <menu
      type="toolbar"
      data-menu="theme"
      role="complementary">
      <div class="color-btns">
        <button
          data-toggle="colors"
          data-btn="small"
          type="button"
          @click="toggleMode()">
          invert
        </button>

        <button
          data-btn="small"
          type="button"
          @click="reset()"
        >
          reset
        </button>
      </div>

      <label data-field for="theme-select">
        <span data-label>theme:</span>
        <select
          v-model="user.theme"
          id="theme-select"
          name="theme-select"
        >
          <option
            v-for="theme in themes"
            :key="theme"
            :value="theme"
            :selected="(theme === user.theme)"
          >
            {{ theme }}
          </option>
        </select>
      </label>
      <label data-field for="hue-select">
        <span data-label>hue:</span>
        <input
          v-model="user.hue"
          value="330"
          id="hue-select"
          type="range"
          min="0"
          max="360"
        >
      </label>
      <label data-field for="sat-select">
        <span data-label>saturation:</span>
        <input
          v-model="user.sat"
          value="80"
          id="sat-select"
          type="range"
          min="0"
          max="100"
        >
      </label>
      <label data-field for="light-select">
        <span data-label>lightness:</span>
        <input
          v-model="user.light"
          value="50"
          id="light-select"
          type="range"
          min="25"
          max="75"
        >
      </label>
      <label data-field for="contrast-select">
        <span data-label>contrast:</span>
        <input
          v-model="user.contrast"
          value="45"
          id="contrast-select"
          type="range"
          min="25"
          max="150"
        >
      </label>
    </menu>

    <p>
      Initial Light/Dark Based on User-OS (Firefox/Safari).
      Each theme comes with different levels of customization.
      Sass is only used to simplify the range-selector prefixes,
      and JS is only used to set custom properties.
      This is <a href="#">what a link looks like</a>.
    </p>

    <section data-colors="invert">
      <code>data-colors='invert'</code>
      and now
      <a href="#">a link looks like this</a>.
    </section>

    <div class="palette" role="presentation">
      <h2 data-colors="invert">prime</h2>
      <div style="--show: var(--prime-palette)"></div>
    </div>

    <div class="palette" role="presentation">
      <h2 data-colors="invert">accent</h2>
      <div style="--show: var(--accent-palette)"></div>
    </div>

    <div class="palette" role="presentation">
      <h2 data-colors="invert">neutrals</h2>
      <div style="--show: var(--gray-palette)"></div>
    </div>
  </main>
</template>

<script>
  import path from 'path';

  export default {
    layout: 'demo',
    data() {
      const themes = [
        "pink-to-blue",
        "blue-to-pink",
        "complement",
        "adjacent",
        "triad",
        "monochrome",
        "black"
      ];

      const userStart = {
        theme: themes[0],
        hue: null,
        sat: null,
        light: null,
        contrast: null,
        mode: null,
      }

      const user = {};

      Object.keys(userStart).forEach(key => {
        user[key] = userStart[key];
      })

      // properties
      const props = {
        hue: '--h-user',
        sat: '--s-user',
        light: '--l-user',
        contrast: '--user-contrast',
        mode: '--user-mode',
      };

      return {
        themes,
        props,
        userStart,
        user
      }
    },
    methods: {
      reset() {
        Object.keys(this.user).forEach(key => {
          this.user[key] = this.userStart[key];
        });
      },
      toggleMode() {
        let mode = this.user.mode;

        if (!mode) {
          const root = document.querySelector('main');
          mode = Number(
            getComputedStyle(root)
            .getPropertyValue('--mode')
            .trim(),
          );
        }

        this.user.mode = mode * -1;
      },
      getStyle() {
        const style={};

        Object.keys(this.props).forEach(prop => {
          const name = this.props[prop];
          const val = this.user[prop];

          if (val) {
            style[name] = val;
          }
        });

        return style;
      }
    },
    head() {
      const title = 'CSS Variable Themes';
      const fullRoute = this.$route.path.endsWith('/')
        ? this.$route.path
        : this.$route.path + '/';

      const meta = [
        {
          hid: 'og_title', property: 'og:title',
          content: title,
        },
        {
          hid: 'og_url', property: 'og:url',
          content: path.join(process.env.httpUrl, fullRoute),
        },
      ];

      return {
        title: `${title} | OddTalks`,
        meta: meta,
      }
    }
  }
</script>

<style lang="scss">
html {
  --os-mode: 1;

  @media (prefers-color-scheme: dark) {
    --os-mode: -1;
    background: #222;
    color: #ddd;
  }

  @media (prefers-color-scheme: light) {
    --os-mode: 1;
    background: #222;
    color: #ddd;
  }
}

[data-theme] {
  // optionally set `--h-user-*` values with JS
  --h-prime: var(--h-user, 330);
  --h-accent: var(--h-user-accent, 195);

  // initial lightness and saturation values
  --l-user-p: calc(var(--l-user) * 1%);
  --l: var(--l-user-p, 50%);
  --s-user-p: calc(var(--s-user) * 1%);
  --s: var(--s-user-p, 80%);

  // offset lightness and saturation by various amounts
  --offset-count: 4;
  --user-contrast-p: calc(var(--user-contrast) * 1%);
  --contrast: var(--user-contrast-p, 45%);

  --offset-step: calc(var(--contrast) / var(--offset-count));
  --offset-diff: calc(var(--contrast) - var(--offset-step));

  --off-1: calc(var(--offset-step));
  --off-2: calc(var(--offset-step) + var(--offset-diff) * 1 / 3);
  --off-3: calc(var(--offset-step) + var(--offset-diff) * 2 / 3);
  --off-4: var(--contrast);

  // generate faded values…
  --fade: 0.75;
}

[data-theme='pink-to-blue'] {
  --h-prime: 330;
  --h-accent: 195;
  --custom-hue: none;
}

[data-theme='blue-to-pink'] {
  --h-prime: 195;
  --h-accent: 330;
  --custom-hue: none;
}

[data-theme='black'] {
  --s: 0%;
  --l: 50%;
  --contrast: calc(100% * var(--offset-count));
  --custom-hue: none;
  --custom-sat: none;
  --custom-light: none;
  --custom-contrast: none;
}

[data-theme='monochrome'] {
  --h-accent: var(--h-prime);
}

[data-theme='complement'] {
  --h-accent: var(--h-complement);
}

[data-theme='triad'] {
  --h-accent: var(--h-triad);
}

[data-theme='adjacent'] {
  --h-accent: var(--h-adjacent);
}

[data-colors] {
  --given-mode: var(--user-mode, var(--html-mode, var(--os-mode, 1)));
  --mode: var(--given-mode, 1);
  --invert: calc(-1 * var(--mode));
  --img-bright: calc(85% + 15% * var(--mode));
}

[data-colors='invert'] {
  --mode: calc(-1 * var(--given-mode, 1));
}

[data-colors='light'] {
  --html-mode: 1;
}

[data-colors='dark'] {
  --html-mode: -1;
}


// layout
// ------
html {
  --gutter: 0.75rem;
  --gutter-plus: calc(var(--gutter) * 1.5);
  --double-gutter: calc(var(--gutter) * 2);
  --shim: calc(var(--gutter) / 2);
  --half-shim: calc(var(--shim) / 2);
  --quarter-shim: calc(var(--shim) / 4);

  --spacer: calc(var(--gutter) + 5vw);
  --double-spacer: calc(var(--double-gutter) + 8vw);

  --border-width: var(--quarter-shim);
  --border-radius: var(--half-shim);

  --font-large: calc(1rem + 0.5vw);
  --font-small: 0.75rem;
  --font-smaller: 0.75em;

  --line-ratio: 1.4;
  --rhythm: 1.4rem;

  @media (min-width: 35em) {
    --gutter: 1rem;
  }
}

* { box-sizing: border-box; }

body {
  display: grid;
  min-height: 100vh;
  margin: 0;
}

main {
  display: grid;
  grid-template-columns: minmax(min-content, 40em);
  justify-content: center;
  padding: 1em;
}

section {
  padding: var(--shim);
}

h1,
h2 {
  line-height: 1;
  margin: 0 0 var(--shim);
}

h1 {
  font-size: 1.5em;
}

h2 {
  font-size: var(--font-small);
}

// menu
// ----
[data-menu] {
  background: var(--bg-full);
  display: grid;
  grid-column-gap: var(--gutter);
  grid-template-columns: repeat(2, 1fr);
  padding: var(--shim);
}

input,
select {
  width: 100%;
}

.color-btns {
  display: flex;
  grid-column: 1 / -1;
  justify-content: space-between;
  margin-bottom: var(--gutter);
}

a {
  #{$link} {
    background: var(--link-bg, initial);
    color: var(--link-color, var(--action));
    text-decoration-color: var(--link-line, var(--prime-fg1-fade));
    text-decoration-skip-ink: auto;
  }

  #{$focus} {
    background: var(--link-hover-bg, var(--link-bg, initial));
    color: var(--link-hover, var(--action-hover));
    text-decoration-color: var(--link-hover-line, var(--prime, initial));
  }

  &:focus {
    outline: 2px dashed var(--accent);
    outline-offset: var(--quarter-shim);
  }

  &[data-active] {
    --link-color: var(--accent-fg2);
    --link-hover: var(--accent-fg4);
  }
}

[href*='://'],
[data-offsite] {
  &::after {
    content: '↗';
    text-decoration: none;
    font-size: var(--font-smaller);
  }
}

button {
  --btn-shade: hsla(var(--h-prime), var(--s-bg1), var(--l-bg1), 0.25);
  --btn-shadow: var(--text-shadow-off) var(--text-shadow-off);
  background-color: var(--btn-bg, var(--action));
  background-image: linear-gradient(
    to bottom,
    var(--btn-shade) 50%,
    transparent 50%
  );
  border: var(--border-width) solid var(--btn-border, var(--prime-fade));
  border-radius: var(--border-radius) 0;
  color: var(--btn-color, var(--bg));
  cursor: pointer;
  font: inherit;
  font-size: var(--font-small);
  padding: var(--quarter-shim) var(--shim);
  text-shadow: var(--btn-shadow) 0 var(--btn-shade);
  text-transform: capitalize;

  #{$focus} {
    --btn-bg: var(--action-hover);
    --btn-border: var(--action);
  }

  &:active {
    --btn-bg: var(--accent-bg2);
    --btn-color: var(--accent-fg2);
    --btn-border: var(--accent-fg3);
    --btn-shade: hsla(var(--h-accent), var(--s-fg1), var(--l-fg1), 0.25);
    --btn-shadow: var(--text-shadow-off-invert) var(--text-shadow-off-invert);
  }

  &:disabled {
    filter: grayscale(100%);
    cursor: not-allowed;
    opacity: 0.5;
  }
}

[data-field],
[data-label],
[data-input] {
  display: block;
}

[data-field] {
  margin-bottom: var(--field-margin, var(--shim));
}

[data-label] {
  font-size: var(--font-small);
  font-style: italic;
}

select,
[data-input] {
  --input-bg: var(--bg);
  --input-border: var(--border);
  --input-color: var(--border);
  background-color: var(--input-bg);
  border: var(--quarter-shim) solid var(--input-border);
  color: var(--input-color);
  font: inherit;
  font-size: var(--font-small);
}

[data-input~='text'] {
  border-radius: var(--border-radius) 0;
  padding: var(--field-padding, var(--half-shim));
  width: var(--field-width, 100%);

  &:focus {
    --input-bg: var(--bg);
    --input-border: var(--accent);
    --input-color: var(--prime-fg3);
  }
}

[data-input~='area'] {
  min-height: calc(var(--gutter) * 4);
}

::placeholder {
  font-style: italic;
}

select {
  border: var(--quarter-shim) solid var(--input-border);
}

/* stylelint-disable */

@mixin range-track {
  &::-webkit-slider-runnable-track {
    @content;
  }
  &::-moz-range-track {
    @content;
  }
  &::-ms-track {
    @content;
  }
}

@mixin range-thumb {
  &::-webkit-slider-thumb {
    transform: translateY(-35%);
    @content;
  }
  &::-moz-range-thumb {
    @content;
  }
  &::-ms-thumb {
    @content;
  }
}

/* stylelint-enable */

$rainbow: ();
@for $hue from 1 through 36 {
  $rainbow: append($rainbow, hsl($hue * 10, 80%, 40%), comma);
}

[for='hue-select'] {
  display: var(--custom-hue, block);
}

[for='light-select'] {
  display: var(--custom-light, block);
}

[for='sat-select'] {
  display: var(--custom-sat, block);
}

[for='contrast-select'] {
  display: var(--custom-contrast, block);
}

[type='range'] {
  appearance: none;
  background: transparent;
  height: var(--gutter);
  max-width: 100%;
  padding: 0;

  @include range-track {
    appearance: none;
    height: var(--shim);
    background: var(--callout);
    border-radius: var(--border-radius);
    border: 2px solid var(--border);
    cursor: pointer;
  }

  @include range-thumb {
    appearance: none;
    border: 2px solid var(--accent-fg3);
    height: var(--gutter);
    width: var(--shim);
    border-radius: var(--border-radius);
    background: var(--prime);
    cursor: pointer;
  }
}

[id='hue-select'] {
  @include range-track {
    background: linear-gradient(to right, $rainbow);
  }
}

[id='light-select'] {
  @include range-track {
    background: linear-gradient(to right, hsl(0, 0%, 25%), silver);
  }
}

[id='sat-select'] {
  // 0.1% so that units aren't removed in minification
  @include range-track {
    background: linear-gradient(
      to right,
      hsl(var(--h-prime, 0), 0.1%, var(--l, 50%)),
      hsl(var(--h-prime, 0), 100%, var(--l, 50%))
    );
  }
}

[id='contrast-select'] {
  @include range-track {
    background: linear-gradient(to right, gray, white),
      linear-gradient(to right, gray, black);
    background-size: 100% 50%, 100% 100%;
    background-position: top left, bottom left;
    background-repeat: no-repeat;
  }
}

// logic
// -----

[data-colors] {
  /* options for setting different color palettes */
  --h-complement: calc(var(--h-prime) + (180 * var(--mode)));
  --h-triad: calc(var(--h-prime) + (120 * var(--mode)));
  --h-adjacent: calc(var(--h-prime) + (60 * var(--mode)));

  /* full contrast colors, foreground and background */
  --bg-full: hsl(0, 0%, calc(100% * var(--mode)));
  --fg-full: hsl(0, 0%, calc(100% * var(--invert)));

  /* generate lightness values */
  --l-fg1: calc(var(--l) - var(--off-1) * var(--mode));
  --l-fg2: calc(var(--l) - var(--off-2) * var(--mode));
  --l-fg3: calc(var(--l) - var(--off-3) * var(--mode));
  --l-fg4: calc(var(--l) - var(--off-4) * var(--mode));

  --l-bg1: calc(var(--l) + var(--off-1) * var(--mode));
  --l-bg2: calc(var(--l) + var(--off-2) * var(--mode));
  --l-bg3: calc(var(--l) + var(--off-3) * var(--mode));
  --l-bg4: calc(var(--l) + var(--off-4) * var(--mode));

  /* generate saturation values */
  --s-fg1: calc(var(--s) - var(--off-1));
  --s-fg2: calc(var(--s) - var(--off-2));
  --s-fg3: calc(var(--s) - var(--off-3));
  --s-fg4: calc(var(--s) - var(--off-4));

  --s-bg1: calc(var(--s) - 20% - var(--off-1));
  --s-bg2: calc(var(--s) - 20% - var(--off-2));
  --s-bg3: calc(var(--s) - 20% - var(--off-3));
  --s-bg4: calc(var(--s) - 20% - var(--off-4));

  /* generate the prime color palette */
  --prime: hsl(var(--h-prime), var(--s), var(--l));
  --prime-fade: hsla(var(--h-prime), var(--s-fg3), var(--l), var(--fade));
  --prime-fg1: hsl(var(--h-prime), var(--s-fg1), var(--l-fg1));
  --prime-fg1-fade: hsla(
    var(--h-prime),
    var(--s-fg3),
    var(--l-fg1),
    var(--fade)
  );
  --prime-fg2: hsl(var(--h-prime), var(--s-fg2), var(--l-fg2));
  --prime-fg2-fade: hsla(
    var(--h-prime),
    var(--s-fg3),
    var(--l-fg2),
    var(--fade)
  );
  --prime-fg3: hsl(var(--h-prime), var(--s-fg3), var(--l-fg3));
  --prime-fg3-fade: hsla(
    var(--h-prime),
    var(--s-fg3),
    var(--l-fg3),
    var(--fade)
  );
  --prime-fg4: hsl(var(--h-prime), var(--s-fg4), var(--l-fg4));
  --prime-fg4-fade: hsla(
    var(--h-prime),
    var(--s-fg4),
    var(--l-fg4),
    var(--fade)
  );

  --prime-bg1: hsl(var(--h-prime), var(--s-bg1), var(--l-bg1));
  --prime-bg1-fade: hsla(
    var(--h-prime),
    var(--s-bg3),
    var(--l-bg1),
    var(--fade)
  );
  --prime-bg2: hsl(var(--h-prime), var(--s-bg2), var(--l-bg2));
  --prime-bg2-fade: hsla(
    var(--h-prime),
    var(--s-bg3),
    var(--l-bg2),
    var(--fade)
  );
  --prime-bg3: hsl(var(--h-prime), var(--s-bg3), var(--l-bg3));
  --prime-bg3-fade: hsla(
    var(--h-prime),
    var(--s-bg3),
    var(--l-bg3),
    var(--fade)
  );
  --prime-bg4: hsl(var(--h-prime), var(--s-bg4), var(--l-bg4));
  --prime-bg4-fade: hsla(
    var(--h-prime),
    var(--s-bg4),
    var(--l-bg4),
    var(--fade)
  );

  /* generate the accent color palette */
  --accent: hsl(var(--h-accent), var(--s), var(--l));
  --accent-fade: hsla(var(--h-accent), var(--s-fg3), var(--l), var(--fade));
  --accent-fg1: hsl(var(--h-accent), var(--s-fg1), var(--l-fg1));
  --accent-fg1-fade: hsla(
    var(--h-accent),
    var(--s-fg3),
    var(--l-fg1),
    var(--fade)
  );
  --accent-fg2: hsl(var(--h-accent), var(--s-fg2), var(--l-fg2));
  --accent-fg2-fade: hsla(
    var(--h-accent),
    var(--s-fg3),
    var(--l-fg2),
    var(--fade)
  );
  --accent-fg3: hsl(var(--h-accent), var(--s-fg3), var(--l-fg3));
  --accent-fg3-fade: hsla(
    var(--h-accent),
    var(--s-fg3),
    var(--l-fg3),
    var(--fade)
  );
  --accent-fg4: hsl(var(--h-accent), var(--s-fg4), var(--l-fg4));
  --accent-fg4-fade: hsla(
    var(--h-accent),
    var(--s-fg4),
    var(--l-fg4),
    var(--fade)
  );

  --accent-bg1: hsl(var(--h-accent), var(--s-bg1), var(--l-bg1));
  --accent-bg1-fade: hsla(
    var(--h-accent),
    var(--s-bg3),
    var(--l-bg1),
    var(--fade)
  );
  --accent-bg2: hsl(var(--h-accent), var(--s-bg2), var(--l-bg2));
  --accent-bg2-fade: hsla(
    var(--h-accent),
    var(--s-bg3),
    var(--l-bg2),
    var(--fade)
  );
  --accent-bg3: hsl(var(--h-accent), var(--s-bg3), var(--l-bg3));
  --accent-bg3-fade: hsla(
    var(--h-accent),
    var(--s-bg3),
    var(--l-bg3),
    var(--fade)
  );
  --accent-bg4: hsl(var(--h-accent), var(--s-bg4), var(--l-bg4));
  --accent-bg4-fade: hsla(
    var(--h-accent),
    var(--s-bg4),
    var(--l-bg4),
    var(--fade)
  );

  --gray: hsl(var(--h-accent), var(--s-bg3), var(--l));
  --gray-fade: hsla(var(--h-accent), var(--s-bg4), var(--l), var(--fade));
  --gray-bg1: hsl(var(--h-accent), var(--s-bg4), var(--l-bg1));
  --gray-bg1-fade: hsla(
    var(--h-accent),
    var(--s-bg4),
    var(--l-bg1),
    var(--fade)
  );
  --gray-bg2: hsl(var(--h-accent), var(--s-bg4), var(--l-bg2));
  --gray-bg2-fade: hsla(
    var(--h-accent),
    var(--s-bg4),
    var(--l-bg2),
    var(--fade)
  );
  --gray-bg3: hsl(var(--h-accent), var(--s-bg4), var(--l-bg3));
  --gray-bg3-fade: hsla(
    var(--h-accent),
    var(--s-bg4),
    var(--l-bg3),
    var(--fade)
  );
  --gray-bg4: hsl(var(--h-accent), var(--s-bg4), var(--l-bg4));
  --gray-bg4-fade: hsla(
    var(--h-accent),
    var(--s-bg4),
    var(--l-bg4),
    var(--fade)
  );
  --gray-fg1: hsl(var(--h-accent), var(--s-bg4), var(--l-fg1));
  --gray-fg1-fade: hsla(
    var(--h-accent),
    var(--s-bg4),
    var(--l-fg1),
    var(--fade)
  );
  --gray-fg2: hsl(var(--h-accent), var(--s-bg4), var(--l-fg2));
  --gray-fg2-fade: hsla(
    var(--h-accent),
    var(--s-bg4),
    var(--l-fg2),
    var(--fade)
  );
  --gray-fg3: hsl(var(--h-accent), var(--s-bg4), var(--l-fg3));
  --gray-fg3-fade: hsla(
    var(--h-accent),
    var(--s-bg4),
    var(--l-fg3),
    var(--fade)
  );
  --gray-fg4: hsl(var(--h-accent), var(--s-bg4), var(--l-fg4));
  --gray-fg4-fade: hsla(
    var(--h-accent),
    var(--s-bg4),
    var(--l-fg4),
    var(--fade)
  );
}

[data-colors] {
  // flip the shadow based on the mode
  --text-shadow-off: calc(1px * var(--mode));
  --text-shadow-off-invert: calc(-1px * var(--mode));
  --box-shadow-off: calc(var(--half-shim) * var(--mode));
  --box-shadow-off-invert: calc(var(--half-shim) * var(--mode) * -1);

  --text-shadow: var(--text-shadow-off) var(--text-shadow-off) 0 var(--bg-full);
  --text-shadow-invert: var(--text-shadow-off-invert)
    var(--text-shadow-off-invert) 0 var(--fg-full);
  --box-shadow: var(--box-shadow-off) var(--box-shadow-off) 0 var(--bg-full);
  --box-shadow-invert: var(--box-shadow-off-invert) var(--box-shadow-off-invert)
    0 var(--fg-full);

  --feature-gradient: linear-gradient(
    to bottom right,
    var(--prime-fg1),
    var(--accent-fg1)
  );

  // color props set directly by the theme
  --bg: var(--accent-bg4);
  --overlay: hsla(var(--h-accent), var(--s-bg4), var(--l-bg4), 0.85);
  --callout: var(--accent-bg3);
  --text: var(--gray-fg3);
  --text-light: var(--gray-fg2);
  --text-highlight: var(--accent-fg3);
  --border: var(--gray);

  --action: var(--prime-fg2);
  --action-hover: var(--prime-fg3);

  background: var(--bg);
  color: var(--text);
  text-shadow: var(--text-shadow);
}

.palette {
  background: linear-gradient(
      45deg,
      var(--gray-fg43) 25%,
      transparent 25% 75%,
      var(--gray-fg43) 75%
    ),
    linear-gradient(
        45deg,
        var(--gray-fg43) 25%,
        transparent 25% 75%,
        var(--gray-fg43) 75%
      )
      var(--gray-bg4);
  background-size: 1em 1em;
  background-position: 0 0, 0.5em 0.5em;
  border: 2px solid var(--fg-full);
  margin: 1em 0;

  h2 {
    font: inherit;
    margin: 0;
  }
}

[style*='--show'] {
  --stop: calc(100% / (var(--offset-count) * 2 + 1));
  --accent-palette-main: linear-gradient(
    to right,
    var(--accent-bg4) calc(var(--stop) * 1),
    var(--accent-bg3) calc(var(--stop) * 1) calc(var(--stop) * 2),
    var(--accent-bg2) calc(var(--stop) * 2) calc(var(--stop) * 3),
    var(--accent-bg1) calc(var(--stop) * 3) calc(var(--stop) * 4),
    var(--accent) calc(var(--stop) * 4) calc(var(--stop) * 5),
    var(--accent-fg1) calc(var(--stop) * 5) calc(var(--stop) * 6),
    var(--accent-fg2) calc(var(--stop) * 6) calc(var(--stop) * 7),
    var(--accent-fg3) calc(var(--stop) * 7) calc(var(--stop) * 8),
    var(--accent-fg4) calc(var(--stop) * 8)
  );
  --accent-palette-fade: linear-gradient(
    to right,
    var(--accent-bg4-fade) calc(var(--stop) * 1),
    var(--accent-bg3-fade) calc(var(--stop) * 1) calc(var(--stop) * 2),
    var(--accent-bg2-fade) calc(var(--stop) * 2) calc(var(--stop) * 3),
    var(--accent-bg1-fade) calc(var(--stop) * 3) calc(var(--stop) * 4),
    var(--accent-fade) calc(var(--stop) * 4) calc(var(--stop) * 5),
    var(--accent-fg1-fade) calc(var(--stop) * 5) calc(var(--stop) * 6),
    var(--accent-fg2-fade) calc(var(--stop) * 6) calc(var(--stop) * 7),
    var(--accent-fg3-fade) calc(var(--stop) * 7) calc(var(--stop) * 8),
    var(--accent-fg4-fade) calc(var(--stop) * 8)
  );
  --prime-palette-main: linear-gradient(
    to right,
    var(--prime-bg4) calc(var(--stop) * 1),
    var(--prime-bg3) calc(var(--stop) * 1) calc(var(--stop) * 2),
    var(--prime-bg2) calc(var(--stop) * 2) calc(var(--stop) * 3),
    var(--prime-bg1) calc(var(--stop) * 3) calc(var(--stop) * 4),
    var(--prime) calc(var(--stop) * 4) calc(var(--stop) * 5),
    var(--prime-fg1) calc(var(--stop) * 5) calc(var(--stop) * 6),
    var(--prime-fg2) calc(var(--stop) * 6) calc(var(--stop) * 7),
    var(--prime-fg3) calc(var(--stop) * 7) calc(var(--stop) * 8),
    var(--prime-fg4) calc(var(--stop) * 8)
  );
  --prime-palette-fade: linear-gradient(
    to right,
    var(--prime-bg4-fade) calc(var(--stop) * 1),
    var(--prime-bg3-fade) calc(var(--stop) * 1) calc(var(--stop) * 2),
    var(--prime-bg2-fade) calc(var(--stop) * 2) calc(var(--stop) * 3),
    var(--prime-bg1-fade) calc(var(--stop) * 3) calc(var(--stop) * 4),
    var(--prime-fade) calc(var(--stop) * 4) calc(var(--stop) * 5),
    var(--prime-fg1-fade) calc(var(--stop) * 5) calc(var(--stop) * 6),
    var(--prime-fg2-fade) calc(var(--stop) * 6) calc(var(--stop) * 7),
    var(--prime-fg3-fade) calc(var(--stop) * 7) calc(var(--stop) * 8),
    var(--prime-fg4-fade) calc(var(--stop) * 8)
  );
  --gray-palette-main: linear-gradient(
    to right,
    var(--gray-bg4) calc(var(--stop) * 1),
    var(--gray-bg3) calc(var(--stop) * 1) calc(var(--stop) * 2),
    var(--gray-bg2) calc(var(--stop) * 2) calc(var(--stop) * 3),
    var(--gray-bg1) calc(var(--stop) * 3) calc(var(--stop) * 4),
    var(--gray) calc(var(--stop) * 4) calc(var(--stop) * 5),
    var(--gray-fg1) calc(var(--stop) * 5) calc(var(--stop) * 6),
    var(--gray-fg2) calc(var(--stop) * 6) calc(var(--stop) * 7),
    var(--gray-fg3) calc(var(--stop) * 7) calc(var(--stop) * 8),
    var(--gray-fg4) calc(var(--stop) * 8)
  );
  --gray-palette-fade: linear-gradient(
    to right,
    var(--gray-bg4-fade) calc(var(--stop) * 1),
    var(--gray-bg3-fade) calc(var(--stop) * 1) calc(var(--stop) * 2),
    var(--gray-bg2-fade) calc(var(--stop) * 2) calc(var(--stop) * 3),
    var(--gray-bg1-fade) calc(var(--stop) * 3) calc(var(--stop) * 4),
    var(--gray-fade) calc(var(--stop) * 4) calc(var(--stop) * 5),
    var(--gray-fg1-fade) calc(var(--stop) * 5) calc(var(--stop) * 6),
    var(--gray-fg2-fade) calc(var(--stop) * 6) calc(var(--stop) * 7),
    var(--gray-fg3-fade) calc(var(--stop) * 7) calc(var(--stop) * 8),
    var(--gray-fg4-fade) calc(var(--stop) * 8)
  );
  --prime-palette: var(--prime-palette-main), var(--prime-palette-fade);
  --accent-palette: var(--accent-palette-main), var(--accent-palette-fade);
  --gray-palette: var(--gray-palette-main), var(--gray-palette-fade);
  background-image: var(--show);
  background-size: 100% 50%, 100% 100%;
  background-repeat: no-repeat;
  height: 3em;
}

</style>
