<template>
  <div class="events">
    <h2>Events:</h2>
    <section
      v-for="(event, index) in events"
      :key="index"
      class="event"
      :style="{
        '--start': event.start,
        '--end': event.end,
        '--category': `var(--${event.category})`,
      }"
    >
      <div class="event-inner">
        <h3>{{ event.name }}</h3>
        <time v-if="event.start">{{ time(event.start) }}</time>
        <time v-if="event.end">{{ time(event.end) }}</time>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.events {
  display: grid;
  grid-auto-flow: dense;
  grid-auto-rows: 1.5em;
  grid-template-columns: var(--day-columns);

  > * {
    grid-column: 1 / -1;
  }
}

.event {
  --grid-start: calc((var(--start) - var(--day-start)) * var(--resolution));
  --grid-end: calc((var(--end) - var(--day-start)) * var(--resolution));
  background: var(--category-hsl);
  grid-column: var(--grid-start, 1) / var(--grid-end, -1);
  border: 1px solid hsla(var(--category-hue, 0), 50%, 50%, var(--a, 0.25));
  border-radius: 0.25em;
  position: relative;

  &:hover {
    --a: 0.5;
    --delay: 0s;
    --opacity: 1;
    --pointer: auto;
  }
}

.event-inner {
  opacity: var(--opacity, 0);
  pointer-events: var(--pointer, none);
  background: white;
  filter: drop-shadow(0 0 0.25em gray);
  padding: 0.25em 1em;
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  min-width: min-content;
  width: 80vw;
  max-width: max-content;
  transition: opacity 200ms var(--delay, 100ms);
  z-index: 100;

  &::after {
    content: '';
    height: 0;
    border: 0.5em solid transparent;
    border-top-color: white;
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translateX(-50%);
  }
}

[style*='--category'] {
  --personal: 190;
  --work: 12;
  --travel: 240;
  --category-hue: var(--category, 0);
  --category-hsl: hsl(var(--category-hue, 0), 65%, 70%);
}

time {
  font-size: 0.75em;

  & + &::before {
    content: ' — ';
  }
}
</style>

<script>
  export default {
    props: {
      start: {
        type: Number,
        default: 6,
      },
      end: {
        type: Number,
        default: 22,
      },
    },
    data() {
      return {
        events: [
          {
            name: 'Tax Day'
          },
          {
            name: 'Morning Routine',
            category: 'personal',
            start: 8,
            end: 9.25,
          },
          {
            name: 'OddBird Standup',
            category: 'work',
            start: 9.5,
            end: 10,
          },
          {
            name: 'Packing',
            category: 'travel',
            start: 10,
            end: 11,
          },
          {
            name: 'Transit…',
            category: 'travel',
            start: 12.5,
            end: 14.5,
          },
          {
            name: 'Client Meeting',
            category: 'work',
            start: 14,
            end: 14.5,
          },
          {
            name: 'DEN => SFO',
            category: 'travel',
            start: 14.5,
            end: 17.25,
          },
        ],
      }
    },
    methods: {
      time(numeric) {
        const hour = Math.floor(numeric);
        let min = (numeric - hour) * 60;
        min = min < 10 ? `0${min}` : min;

        return hour > 12
          ? `${hour - 12}:${min}pm`
          : `${hour}:${min}am`;
      },
    },
  }
</script>
