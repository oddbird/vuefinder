<template>
  <main
    class="day-planner"
    :style="{'--day-start': start, '--day-end': end}"
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
// Setup
// -----

.day-planner {
  min-height: 100vh;
  padding: var(--gutter);
}


// Grid Layout
// -----------

.day-planner {
  display: grid;
  grid-template:
    'head edit' auto
    'temps temps' 1fr
    'events events' auto
    / 1fr 1fr; // minmax(auto, 1fr)
  row-gap: var(--gutter);
}

.header { grid-area: head; }
.edit { grid-area: edit; }
.temps { grid-area: temps; }
.events { grid-area: events; }


// Day Grid
// --------

.day-planner {
  --hours-per-day: calc(var(--day-end) - var(--day-start));

  --columns-per-hour: 4;
  --columns-per-day: calc(var(--hours-per-day) * var(--columns-per-hour));

  --column-size: minmax(0, 1fr);
  --day-template: repeat(var(--columns-per-day), var(--column-size));
}


// Visualizing the Grid
// --------------------

.day-planner {
  background:
    linear-gradient(
      to right,
      hsl(210, 50%, 50%) 1px,
      transparent 1px 100%,
    );
  background-size: calc(100% / var(--hours-per-day));
  background-origin: content-box;
}
</style>


<style data-note="style cleanup...">
.header,
.edit {
  background: white;
}

p,
time {
  font-size: var(--small);
  font-style: italic;
}


/* Forms
   ----- */

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
          name: 'Workshop/Talk Review',
          category: 'work',
          start: 10,
          end: 11,
        },
        {
          name: 'Packing',
          category: 'travel',
          start: 10.5,
          end: 11.5,
        },
        {
          name: 'Lunch',
          category: 'personal',
          start: 12,
          end: 12.5,
        },
        {
          name: 'Transit',
          category: 'travel',
          start: 12.75,
          end: 14.5,
        },
        {
          name: 'Client Meeting',
          category: 'work',
          start: 14,
          end: 15,
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
      }
    },
  }
</script>
