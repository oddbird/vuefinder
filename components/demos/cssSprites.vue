<template>
  <section
    class="sprite-demo"
    :style="{
      '--src': sprite.src,
      '--vw': sprite.vw,
      '--vh': sprite.vh,
      '--steps': sprite.steps,
    }">
    <div
      v-for="action in actions"
      :key="action.name"
      :data-action="action.name"
      :style="{
        '--row': action.row,
      }"
    />
  </section>
</template>

<script>
export default {
  data() {
    let spriteSrc = '/images/dynamic-css/vueconf19/animations.png';
    if (!spriteSrc.includes('://') && !process.env.isDev) {
      spriteSrc = process.env.httpUrl + spriteSrc;
    }
    spriteSrc = `url(${spriteSrc})`;

    return {
      sprite: {
        src: spriteSrc, // e.g. url('…')
        vh: 415,
        vw: 415,
        steps: 9,
      },
      actions: [
        {
          name: 'attack',
          row: 1,
        },
        {
          name: 'special',
          row: 2,
        }
      ],
    }
  },
}
</script>


<style lang="scss" scoped>
.sprite-demo {
  --height: calc(var(--vh) * 1px);
  --width: calc(var(--vw) * 1px);
  display: grid;
  grid-template-columns: repeat(auto-fit, var(--width));
  grid-auto-rows: var(--height);
  justify-content: center;
  justify-items: center;
  align-items: center;
  align-content: center;
}

@keyframes sprite {
  to {
    background-position: 100% var(--posY);
  }
}

[data-action] {
  --posY: calc(0px - var(--row) * var(--height));
  background-image: var(--src);
  background-position: 0% var(--posY);
  height: var(--height);
  width: var(--width);

  &:hover {
    animation: sprite 1s steps(var(--steps), end) infinite both;
  }
}
</style>
