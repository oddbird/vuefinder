<template>
  <div class="box">
    <span class='css'>CSS</span>
    <span class='is'>is</span>
    <span class='awesome'>Awesome</span>
  </div>
</template>

<script>
  export default {
    head () {
      return {
        link: [
          { 
            rel: 'stylesheet', 
            href: 'https://use.typekit.net/klr0cdt.css' 
          }
        ]
      }
    },
  }
</script>

<style lang="scss">
:root {
  align-content: center;
  background-color: hsl(180, 100%, 30%);
  background-image: url('/images/dynamic-css/calm-waters.jpg');
  background-position: bottom right;
  background-size: cover;
  color: hsl(150, 10%, 10%);
  display: grid;
  font-family: 'bookmania', serif;
  font-feature-settings: "kern", "liga", "clig", "calt", "onum", "pnum", "dlig";
  font-kerning: normal;
  font-size: calc(16px + 10vw);
  font-variant-ligatures: common-ligatures contextual discretionary-ligatures;
  font-variant-numeric: oldstyle-nums proportional-nums;
  justify-content: center;
  min-height: 100vh;
}


.box {
  --box: 2.5em;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
  height: var(--box);
  margin-left: calc(0px - var(--box));
  position: relative;
  width: var(--box);

  @include after('') {
    @include position(0 0 0 0);
    background: linear-gradient(transparent, hsl(220, 100%, 10%));
    border: 2px solid hsl(220, 100%, 60%);
    border-radius: 0.125em;
    mix-blend-mode: difference;
    pointer-events: none;
    z-index: -1;
  }
}


span {
  color: white;
  display: block;
  mix-blend-mode: hard-light;
  text-shadow: 1px 1px 0 hsla(0, 100%, 10%, 0.5);
}


.css {
  font-feature-settings: 'ss16';
  font-size: 1.25em;
  grid-area: 1 / 1 / auto / -1;
  margin-right: 0.25em;
  text-indent: -0.3em;

  &::first-letter {
    font-feature-settings: 'ss10';
  }
}


.is {
  align-self: baseline;
  display: inline-block;
  font-feature-settings: 'ss13';
  font-size: 0.5em;
  font-style: italic;
  grid-area: 2 / 1;
  justify-self: start;
  padding: 0.5em;
}


.awesome {
  -webkit-background-clip: text;
  background-clip: text;
  background-image: url('/images/dynamic-css/horizon-nature.jpg');
  background-position: center center;
  background-size: 100% auto;
  color: transparent;
  font-feature-settings: 'swsh';
  font-weight: bold;
  grid-area: 2 / 2 / auto/ span 3;
  margin-left: -0.35em;
}
</style>
