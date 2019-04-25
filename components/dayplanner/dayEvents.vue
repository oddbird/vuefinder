<template>
  <div class="events">
    <h2>Events:</h2>
    <section
      class="event"
      :style="{
        '--event-start': event.start,
        '--event-end': event.end,
        '--category': `var(--${event.category})`,
      }"
      v-for="(event, index) in events" :key="index" >
        <h3>{{ event.name }}</h3>
        <div v-if="event.start && event.end" >
          <time v-if="event.start">{{ time(event.start) }}</time>–<time v-if="event.end">{{ time(event.end) }}</time>
        </div>
    </section>
  </div>
</template>

<style lang="scss">
// The Day Grid
// ------------

.events {
  display: grid;
  grid-template-columns: var(--day-template);
}


// Full-Width Defaults
// -------------------

.events {
  > * {
    grid-column: 1 / -1;
  }
}


// Event Colors
// ------------

[style*='--category'] {
  --undefined: 0;
  --personal: 190;
  --work: 90;
  --travel: 240;
}

.event {
  --category-hue: var(--category, 0);
  --category-background: hsl(var(--category-hue, 0), 65%, 70%);
  --category-border: hsl(var(--category-hue, 0), 50%, 50%);
  background: var(--category-background);
  border: 1px solid var(--category-border);
  border-radius: 0.25em;
  padding: calc(var(--gutter) / 4);
}


// Event Positions
// ---------------

.event {
  --event-start-column: calc((var(--event-start) - var(--day-start)) * var(--columns-per-hour) + 1);
  --event-end-column: calc((var(--event-end) - var(--day-start)) * var(--columns-per-hour) + 1);
  grid-column: var(--event-start-column, 1) / var(--event-end-column, -1);
}


// Grid Overflow
// -------------

.event {
  > * {
    background: inherit;
    overflow: var(--overflow, hidden);
    padding: 0 calc(var(--gutter) / 4);
    text-overflow: ellipsis;
    white-space: nowrap;
    width: var(--width, auto);
  }

  &:hover {
    --overflow: visible;
    --width: max-content;
    filter: drop-shadow(0 0 0.125em black);
    z-index: 10;
  }
}


// Grid Flow
// ---------

.events {
  grid-auto-flow: dense;
}
</style>


<style  data-note="style cleanup...">
.event {
  font-size: var(--small);
}

.event-times {
  white-space: nowrap;
}
</style>

<script>
  export default {
    props: {
      events: {
        type: Array,
        required: true,
      },
      start: {
        type: Number,
        required: true,
      },
      end: {
        type: Number,
        required: true,
      },
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
