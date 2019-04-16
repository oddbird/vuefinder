<template>
  <div class="theme-root">
    <div
      v-for="theme in themes"
      :key="theme"
      :data-theme="theme"
    >
      Our "{{ theme }}" Theme
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        themes: [
          'light',
          'dark',
          'contrast',
        ]
      }
    },
  }
</script>

<style lang="scss" scoped>
$brand-colors: (
  'brand-dark': #226,
  'brand-darker': #000,
  'brand-light': #ddf,
  'brand-lighter': #fff,
);

$light-theme: (
  'bg-color': 'brand-light',
  'text-color': 'brand-dark',
);

$dark-theme: (
  'bg-color': 'brand-dark',
  'text-color': 'brand-light',
);

$contrast-theme: (
  'bg-color': 'brand-darker',
  'text-color': 'brand-lighter',
);

$themes: (
  'light': $light-theme,
  'dark': $dark-theme,
  'contrast': $contrast-theme,
);

.theme-root {
  display: grid;
  grid: repeat(auto-fit, minmax(2em, 1fr)) / 1fr;
  text-shadow: none;

  @each $var, $color in $brand-colors {
    --#{$var}: #{$color};
  }
}

@each $name, $theme in $themes {
  [data-theme='#{$name}'] {
    @each $local, $global in $theme {
      --#{$local}: var(--#{$global});
    }
  }
}

[data-theme] {
  background: var(--bg-color);
  color: var(--text-color);

  align-items: center;
  display: flex;
  justify-content: center;
}
</style>
