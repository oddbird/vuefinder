<template>
  <nav data-nav="slide-controls">
    <button
      data-slide-control="close"
      @click="$emit('toggleView', fallback)" >
      x
    </button>
    <button v-show="(hasPrev)"
      data-slide-control="prev"
      @click="$emit('prevSlide')" >
      «
    </button>
    <button v-show="(hasNext)"
      data-slide-control="next"
      @click="$emit('nextSlide')" >
      »
    </button>

    <div data-overlay="pause"
      v-show="paused"
      aria-role="presentation"
      @click="$emit('togglePaused')">
      ||
    </div>
  </nav>
</template>

<script>
  export default {
    props: {
      fallback: {
        type: String,
        default: 'list'
      },
      paused: {
        type: Boolean,
        defualt: false,
      },
      hasPrev: {
        type: Boolean,
        default: true,
      },
      hasNext: {
        type: Boolean,
        default: true,
      },
    },
  }
</script>
