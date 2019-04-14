<template>
  <div class="demo-root">
    <section data-show="layers">
      <h3>✅ type</h3>
      <div class="color js">JS</div>
      <div class="color css">CSS</div>
      <div class="color html">HTML</div>
    </section>

    <section data-show="components">
      <h3>✅ purpose</h3>
      <div class="color button">button</div>
      <div class="color modal">modal</div>
      <div class="color nav">nav</div>
    </section>

    <section data-show="nope">
      <h3>¯\_(ツ)_/¯</h3>
      <div class="color button">button</div>
      <div class="color modal">modal</div>
      <div class="color nav">nav</div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.demo-root {
  display: grid;
  gap: size('shim');
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  padding: size('shim');
}

[data-show] {
  display: grid;
  gap: inherit;
  grid-auto-rows: 1fr;
  grid-template-rows: auto;
}

.color {
  align-items: center;
  display: flex;
  justify-content: center;
  outline: 1px solid currentColor;
  padding: size('half-shim');
}

h3 {
  grid-column:  1 / -1;
  text-align: center;
}

// layers
// ------
[data-show='layers'] {
  .js {
    background: lightblue;
  }

  .css {
    background: lightgreen;
  }

  .html {
    background: pink;
  }
}

// components
// ----------
$colors: lightblue, lightgreen, pink;
$clean: ();

@each $color in $colors {
  $clean: join($clean, ($color, $color), comma);
}

[data-show='components'],
[data-show='nope'] {
  grid-template-columns: repeat(3, 1fr);

  .color {
    background: linear-gradient(
      to bottom,
      $clean
    );
    writing-mode: vertical-rl;
  }
}

// nope
$colors: join($colors, (lightblue, lightblue, lightblue));

[data-show='nope'] {
  @each $class in ('.button', '.modal', '.nav') {
    #{$class} {
      $grad: ();

      @for $i from 1 to 60 {
        $color: nth($colors, random(length($colors)));
        $grad: append($grad, $color, comma);
      }
      background: linear-gradient(
        to bottom,
        $grad
      );
    }
  }
}
</style>
