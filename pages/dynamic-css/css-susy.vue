<template>
  <main>
    <aside data-susy="2"><h3>2of10</h3></aside>

    <article data-susy="6">

      <div data-susy="3"><h3>3of6</h3></div>
      <div data-susy="3 last"><h3>3of6</h3></div>

      <section>
        <div data-susy="2"><h3>2of6</h3></div>
        <article data-susy="4 last">
          <div data-susy="2"><h3>2of4</h3></div>
          <div data-susy="2 last"><h3>2of4</h3></div>
          <footer><h3>full</h3></footer>
        </article>
      </section>

    </article>

    <aside data-susy="2 last"><h3>2of10</h3></aside>
  </main>
</template>

<script>
  export default {

  }
</script>

<style lang="scss">
:root {
  /* "--susy-" variables establish the grid */
  /* settings will inherit... */
  --susy-columns: 4;
  --susy-gutters: 0.25;
  --susy-spread: 0;
  --susy-container-spread: 0;
  --susy-debug-color: hsla(0, 0%, 0%, 0.125);

  /* for static grids only */
  --susy-static-grid: 0; /* boolean */
  --susy-static-gutters: var(--susy-static-grid); /* boolean */
  --susy-column-width: 5em;
}

* {
  /* ...but all the math has to happen on the element. */

  /* INTERNAL MATH */
  /* ------------- */

  /* container math */
  --su-container-sum: calc(
      var(--susy-columns) +
      (
        ( var(--susy-columns) + var(--susy-container-spread) )
        * var(--susy-gutters)
      )
    );


  /* span math */
  --su-span-sum:  calc(
    var(--span) +
    (
      ( var(--span) + var(--susy-spread) )
      * var(--susy-gutters)
    )
  );


  /* gutter output math */
  --su-inside-gutters: calc(
      var(--gutter-width) * var(--gutters-inside)
    );

  --su-gutters-left: calc(
      var(--gutter-width) * var(--gutters-left)
    );

  --su-gutters-right: calc(
      var(--gutter-width) * var(--gutters-right)
    );


  /* background grid math */
  --su-grid-image-sum: calc(
      1 + var(--susy-gutters)
    );
  --su-grid-gutter-ratio: calc(
      var(--susy-gutters) / var(--su-grid-image-sum) * 100%
    );
  --su-split-gutter-ratio: calc(
      var(--su-grid-gutter-ratio) / 2
    );


  /* PUBLIC FUNCTIONS */
  /* ---------------- */

  /* span functions */
  --fluid-span: calc(
      var(--su-span-sum) / var(--su-container-sum) * 100%
    );
  --static-span: calc(
      var(--su-span-sum) * var(--susy-column-width)
    );

  --span-width: calc(
    var(--static-span) * var(--susy-static-grid) +
    var(--fluid-span) * (1 - var(--susy-static-grid))
  );


  /* container functions */
  --container-width: calc(
      var(--su-container-sum) * var(--susy-column-width)
    );


  /* gutter functions */
  --fluid-gutters: calc(
      var(--susy-gutters) / var(--su-container-sum) * 100%
    );
  --static-gutters: calc(
      var(--susy-gutters) * var(--susy-column-width)
    );

  --gutter-width: calc(
      var(--static-gutters) * var(--susy-static-gutters) +
      var(--fluid-gutters) * (1 - var(--susy-static-gutters))
    );


  /* debug functions */
  --debug-image: linear-gradient(to right,
    var(--susy-debug-color, #ccc) calc(100% - var(--su-grid-gutter-ratio)),
    transparent calc(100% - var(--su-grid-gutter-ratio)));
  --debug-image-split: linear-gradient(to right,
    transparent  var(--su-split-gutter-ratio),
    var(--susy-debug-color, #ccc) var(--su-split-gutter-ratio),
    var(--susy-debug-color, #ccc) calc(100% - var(--su-split-gutter-ratio)),
    transparent calc(100% - var(--su-split-gutter-ratio)));
  --debug-image-size: calc(
      var(--su-grid-image-sum) / var(--su-container-sum) * 100%
    );



  /* PUBLIC MIXINS */
  /* ------------- */

  --span: initial; /* integer */
  --gutters-inside: 0; /* multiplier */
  --gutters-left: 0; /* multiplier */
  --gutters-right: 0; /* multiplier */


  /* output */
  width: var(--span-width, initial);
  padding-left: var(--su-inside-gutters, initial);
  padding-right: var(--su-inside-gutters, initial);
  margin-left: var(--su-gutters-left, initial);
  margin-right: var(--su-gutters-right, initial);
}
</style>

<style lang="scss">
/* Global Settings */
/* --------------- */

:root {
  --susy-columns: 1;
  --susy-gutters: 0.25;
  --susy-spread: -1;
  --susy-container-spread: -1;
/*   --susy-static-grid: 1; */
/*   --susy-debug-color: green; */
}


/* Container */
/* --------- */

main {
  background-image: var(--debug-image);
  background-size: var(--debug-image-size);
  margin: var(--static-gutters) auto;
  overflow: hidden;
}



/* Medium Screens */
/* -------------- */

@media (min-width: 30em) {
  /* settings */
  :root { --susy-columns: 5; }

  /* floats and gutters */
  [data-susy] {
    --gutters-right: 1;
    float: left;
    margin-bottom: var(--gutter-width);
  }
  [data-susy~='last'] { --gutters-right: 0; }

  /* layout */
  [data-susy~='2']{ --span: 1; }

  [data-susy~='6'] { --span: 3; }
  [data-susy~='6'] * { --susy-columns: 3 }

  [data-susy~='3'] { --span: 3; }

  [data-susy~='4'] { --span: 2; }
  [data-susy~='4'] * { --susy-columns: 2 }
}



/* Large Screens */
/* ------------- */

@media (min-width: 50em) {
  /* settings */
  :root { --susy-columns: 10; }

  /* layout */
  main { max-width: var(--container-width); }
  [data-susy~='2']{ --span: 2; }

  [data-susy~='6'] { --span: 6; }
  [data-susy~='6'] * { --susy-columns: 6 }

  [data-susy~='4'] { --span: 4; }
  [data-susy~='4'] * { --susy-columns: 4 }
}



/* display styles */
/* -------------- */

@supports not (--css: variables) {
  body::before {
    content: 'This browser does not support CSS Variables';
    display: block;
  }
}

body {
  padding: var(--static-gutters);
}

h3 {
  padding: size(--static-gutter);
  text-align: center;
  text-shadow: 0 0 2px white;
}

aside::before, aside::after,
article::before, article::after,
section::before, section::after,
div::before, div::after,
footer::before, footer::after {
  content: ' ';
  display: table;
  clear: both;
}

section,
footer {
  clear: both;
}

section,
article {
  outline: 2px dotted;
}

aside {
  background-color: hsla(180, 50%, 50%, 0.5);
}

[data-susy~='6'] [data-susy~='3'],
[data-susy~='4'] [data-susy~='2'] {
  background-color: hsla(0, 50%, 50%, 0.5);
}

section [data-susy~='2'] {
  background-color: hsla(45, 50%, 50%, 0.5);
}

footer {
  background-color: hsla(-45, 50%, 50%, 0.5);
}
</style>
