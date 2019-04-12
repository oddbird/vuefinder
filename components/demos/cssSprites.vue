<template>
  <section
    class="sprite-demo"
    :style="{
      '--src': sprite.src,
      '--columns': sprite.columns,
      '--rows': sprite.rows,
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
        columns: 10,
        rows: 5,
      },
      actions: [
        {
          name: 'idle',
          row: 0, // 0 index
        },
        {
          name: 'attack',
          row: 1,
        },
        {
          name: 'special',
          row: 2,
        },
      ],
    }
  },
}
</script>


<style lang="scss" scoped>
.sprite-demo {
  --steps: calc(var(--columns) - 1);
  --square: calc(6em + 10vw);
  display: grid;
  grid-template-columns: repeat(auto-fit, var(--square));
  grid-auto-rows: var(--square);
  justify-content: center;
  justify-items: stretch;
  align-items: stretch;
  align-content: center;

  [data-slide-view='grid'] & {
    --square: calc(5em + 5vw);
  }
}

@keyframes sprite {
  to {
    background-position: 100% var(--posY);
  }
}

[data-action] {
  --posY: calc(0px - var(--square) * var(--row));
  animation: sprite 1s steps(var(--steps), end) infinite paused;
  background-image: var(--src);
  background-size: calc(var(--square) * var(--columns)) auto;
  background-position: 0% var(--posY);
  width: 100%;

  &:hover {
    animation-play-state: running;
  }
}
</style>
