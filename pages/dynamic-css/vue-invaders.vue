<template>
  <div id="app">
    <footer>
      <div class="field">
        <label for="blipsize">Bit Size</label>
        <input type="type"
              id="blipsize"
              v-model="blipSize">
      </div>
      <div class="field">
        <label for="gapsize">Gap Size</label>
        <input type="type"
              id="gapsize"
              v-model="gapSize">
      </div>
      <div class="field">
        <label for="count">Invaders</label>
        <input type="number"
              id="count"
              v-model="count"
              @keyup="invade">
      </div>

      <div class="actions">
        <button @click="shuffle">Shuffle</button>
        <button @click="kickAss">KickAss Battle Mode</button>
      </div>
    </footer>

    <transition-group name="invaders"
                      tag="main"
                      :style="{'--blip': blipSize, '--gap': gapSize}">
      <span v-for="(invader, index) in invaders"
            :key="invader.id"
            :style="{'--scale': invader.scale}"
            class="invader"
            @click="remake(index)">
        <i v-for="blip in invader.blips"
          :key="blip.id"
          :style="{'--bg': blip.color, '--col': blip.column}"
          class="blip"></i>
      </span>
    </transition-group>
  </div>
</template>

<script>
  import shuffle from 'lodash/shuffle';
  import random from 'lodash/random';
  import dropRight from 'lodash/dropRight';

  const guid = () => {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  // Build an array of individual bits with random/symmetrical backgrounds
  const makeBlips = () => {
    let blips = [];

    // The first 15 bits can ge generated individually
    for (
      let blipIndex = 1;
      blipIndex <= 15;
      blipIndex++
    ) {
      let blip = {
        id: guid(),
        color: (random(1) === 1) ? 'transparent' : 'white',
        column: Math.ceil(blipIndex / 5),
      };
      blips.push(blip);
    }

    // The final 10 bits are reflections of the first 10
    for (
      let blipIndex = 0;
      blipIndex < 10;
      blipIndex++
    ) {
      let revBlip = {
        id: guid(),
        color: blips[blipIndex].color,
        column: (blips[blipIndex].column + 1) * -1,
      };

      blips.push(revBlip);
    }

    // return a full set of 25 bits
    return blips;
  }

  // Generate a random invader size,
  // with occasional random larger sizes
  const makeScale = () => {
    const big = (random(1, 50) === 50);
    const top = big ? 10 : 2;
    return random(1, top);
  }

  // Build an invader with id, bits, and scale
  const makeInvader = () => {
    return {
      id: guid(),
      scale: makeScale(),
      blips: makeBlips()
    }
  }

  // Build any number of invaders
  const invade = (add) => {
    let invaders = [];

    for (
      let i=0;
      i < add;
      i++
    ) {
      invaders.push(makeInvader());
    }

    return invaders;
  }

  export default {
    data() {
      return {
        blipSize: '5px',
        gapSize: '1px',
        count: 200,
        invaders: invade(200),
      }
    },
    methods: {
      invade() {
        let diff = this.count - this.invaders.length;
        if (diff > 0) {
          let newInvaders = invade(diff);
          for (let i=0; i<newInvaders.length; i++) {
            this.invaders.push(newInvaders[i]);
          }
        } else if (diff) {
          diff = Math.abs(diff);
          this.invaders = dropRight(this.invaders, diff);
        }
      },
      shuffle() {
        this.invaders = shuffle(this.invaders);
      },
      remake(index) {
        this.invaders[index].blips = makeBlips();
      },
      kickAss() {
        let KICKASSVERSION = '2.0';
        let s = document.createElement('script');
        s.type = 'text/javascript';
        document.body.appendChild(s);
        s.src='//hi.kickassapp.com/kickass.js';
        void(0);
      }
    }
  }
</script>

<style lang="scss">
@import '~/assets/scss/base/_manifest.scss';

// Main Grid
// ---------
main {
  --blip: 5px;
  --gap: 1px;
  --size: calc(var(--blip, 5px) * 6 + var(--gap, 1px) * 4);
  align-content: center;
  display: grid;
  grid-auto-flow: dense;
  grid-auto-rows: var(--size);
  grid-template-columns: repeat(auto-fill, var(--size));
  justify-content: center;
}

// Invaders
// --------
.invader {
  display: grid;
  grid-auto-flow: dense;
  grid-column-end: span var(--scale);
  grid-gap: var(--gap);
  grid-row-end: span var(--scale);
  grid-template: repeat(5, 1fr) / repeat(5, 1fr);
  padding: calc(var(--blip) / 2);
  transition: background-color 4s 2s ease-in-out;

  &:hover {
    background-color: red;
    transition-delay: .01ms;
    transition-duration: 150ms;
  }
}

.blip {
  background-color: var(--bg);
  grid-column-start: var(--col);
  transition: background-color 300ms ease-in-out;
}

// Animations
// ----------
.invaders-move {
  transition: all 1s .01ms ease;
}

.invaders-enter-active,
.invaders-leave-active {
  transition: all 0.8s 0.01ms ease;
}

.invaders-enter,
.invaders-leave-to {
  background: green;
  opacity: 0;
  transform: scale(0.25);
}

.invaders-leave-to {
  background: red;
}

// Setup
// -----
:root {
  @include font-family('code');
  background: black;
  color: white;
  font-size: calc(12px + 0.125vw);
}

* {
  box-sizing: border-box;
}

a,
button {
  &,
  &:link,
  &:visited {
    background: transparent;
    border: 1px solid white;
    border-radius: 0.25em;
    color: currentColor;
    cursor: pointer;
    display: inline-block;
    font: inherit;
    padding: 0.25em 0.5em;
    text-decoration: none;
  }

  &:hover,
  &:focus,
  &:active {
    background: white;
    color: black;
  }
}

// Footer Controls
// ---------------
footer {
  align-items: baseline;
  background: rgba(black, 0.95);
  border-bottom: 1px solid white;
  display: flex;
  flex-wrap: wrap;
  position: fixed;
  position: sticky;
  top: 0;
  width: 100vw;
}

.field {
  flex: 0 0 auto;
  padding: 1em;
}

input {
  background: rgba(white, 0.25);
  border: 1px solid rgba(white, 0.5);
  color: white;
  padding: 0.25em 0.5em;
  width: 8ch;
}

.actions {
  flex: 1 0 auto;
  padding: 1em;

  @media (min-width: 40em) {
    text-align: right;
  }
}
</style>
