<template>
  <main
    class="day-planner"
    :style="{
      '--day-start': start,
      '--day-end': end,
      '--resolution': resolution,
    }"
  >
    <header class="header">
      <h1>Monday, April 15</h1>
      <p>Denver, CO</p>
    </header>

    <form class="edit">
      <label for="day-start">
        <span data-label="day-start">Day Start:</span>
        <input
          id="day-start"
          type="number"
          min="0" max="8"
          v-model.number="start"
          @keydown.stop=""
        >
      </label>

      <label for="day-end">
        <span data-label="day-end">Day End:</span>
        <input
          id="day-end"
          type="number"
          min="18" max="24"
          v-model.number="end"
          @keydown.stop=""
        >
      </label>
    </form>

    <day-temps class="temps"
      :allTemps="allTemps"
      :start="start"
      :end="end"
    />

    <day-events class="events"
      :events="events"
      :start="start"
      :end="end"
    />
  </main>
</template>

<style lang="scss">
// basic layout
// ------------

.day-planner {
  // outside…
  min-height: 100vh;
  padding: var(--gutter);

  // inside…
  display: grid;
  grid-template:
    'head edit' auto
    'temps temps' 1fr
    'events events' auto
    / 1fr 1fr;
  row-gap: var(--gutter);
}

// layout areas
.header { grid-area: head; }
.edit { grid-area: edit; }
.temps { grid-area: temps; }
.events { grid-area: events; }


// day grid
// --------

.day-planner {
  background:
    linear-gradient(
      to right,
      hsla(0, 0%, 50%, 0.25) 1px,
      transparent 1px 100%,
    );
  background-size: calc(100% / var(--day-hours));
  background-origin: content-box;
  min-width: calc(var(--day-hours) * 1.5em);

  // for our sub-grids to use…
  --day-hours: calc(var(--day-end) - var(--day-start));
  --col-count: calc(var(--day-hours) * var(--resolution));
  --col-size: minmax(0, 1fr);
  --day-columns: repeat(var(--col-count), var(--col-size));
}


// for pretty
// ----------

.header,
.edit {
  background: white;
}

p,
time {
  font-size: var(--small);
  font-style: italic;
}

th,
td {
  text-align: center;
}

// forms
// -----

.edit {
  display: flex;
  font-size: var(--small);
  gap: var(--gutter);
  justify-content: flex-end;
}

label {
  align-items: center;
  display: flex;
  font-style: italic;
  gap: inherit;
}

[data-label] {
  flex: 0 1 max-content;
}

input {
  flex: 1 1 4ch;
  max-width: 6ch;
}
</style>

<script>
  import dayTemps from '~/components/dayplanner/dayTemps.vue';
  import dayEvents from '~/components/dayplanner/dayEvents.vue';

  export default {
    layout: 'demo',
    components: {
      dayTemps,
      dayEvents,
    },
    data() {
      const allTemps = [
        49, 48, 47, 46, 45, 45, 45, 46, 49, 53, 59, 63,
        66, 69, 71, 71, 72, 71, 70, 68, 65, 62, 59, 57,
      ];

      const events = [
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
      ];

      return {
        allTemps,
        events,
        start: 0,
        end: 24,
        resolution: 4,
      }
    },
  }
</script>
