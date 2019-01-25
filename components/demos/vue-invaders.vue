<template>
  <section class="invaders-root">
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
      </div>
    </footer>

    <transition-group name="invaders"
                      tag="div"
                      class="main"
                      :style="{'--blip': blipSize, '--gap': gapSize}">
      <span v-for="(invader, index) in invaders"
            :key="invader.id"
            :style="{'--scale': invader.scale}"
            class="invader"
            @click="remake(index)">
        <i v-for="blip in invader.blips"
          :key="blip.id"
          :style="{'--bg': blip.color, '--col': blip.column}"
          class="blip" />
      </span>
    </transition-group>
  </section>
</template>

<script>
  import shuffle from 'lodash/shuffle';
  import random from 'lodash/random';
  import dropRight from 'lodash/dropRight';
  import uuidv1 from 'uuid/v1';

  export default {
    data() {
      const count = 200;

      return {
        blipSize: '5px',
        gapSize: '1px',
        count: count,
        invaders: this.initVaders(count),
      }
    },
    methods: {
      makeBlips() {
        let blips = [];

        // The first 15 bits can ge generated individually
        [...Array(15)].forEach((e, i) => {
          const blip = {
            id: uuidv1(),
            color: random(1) ? 'transparent' : 'white',
            column: Math.ceil((i + 1) / 5),
          };
          blips.push(blip);
        });

        // The final 10 bits are reflections of the first 10
        [...Array(10)].forEach((e, i) => {
          const mirror = blips[i];
          const revBlip = {
            id: uuidv1(),
            color: mirror.color,
            column: (mirror.column + 1) * -1,
          };
          blips.push(revBlip);
        });

        // return a full set of 25 bits
        return blips;
      },
      makeInvader() {
        const big = (random(1, 50) === 50);
        const top = big ? 10 : 2;
        return {
          id: uuidv1(),
          scale: random(1, top),
          blips: this.makeBlips()
        }
      },
      initVaders(add) {
        return [...Array(add)].map(() => this.makeInvader());
      },
      invade() {
        let diff = this.count - this.invaders.length;
        if (diff > 0) {
          this.initVaders(diff).forEach((e) => this.invaders.push(e));
        } else if (diff) {
          diff = Math.abs(diff);
          this.invaders = dropRight(this.invaders, diff);
        }
      },
      shuffle() {
        this.invaders = shuffle(this.invaders);
      },
      remake(index) {
        this.invaders[index].blips = this.makeBlips();
      },
    }
  }
</script>

<style lang="scss" scoped>

// Main Grid
// ---------
.main {
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
.invaders-root {
  @include font-family('code');
  background: black;
  color: white;
  font-size: size('xsmaller');
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
  padding: size('half-shim') size('shim');
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
  padding: size('half-shim') size('shim');

  @media (min-width: 40em) {
    text-align: right;
  }
}
</style>
