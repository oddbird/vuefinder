<template>
  <nav data-nav="slide-controls">
    <button
      data-slide-control="close"
      @click="$emit('close')" >
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

<style lang="scss">
@import '~assets/scss/config/manifest';

[data-slide-control] {
  background: color('background');
  border: pattern('border-base') transparent;
  border-radius: size('corner');
  padding: 0 size('half-shim');
  margin: size('half-shim');
  opacity: 0.125;
  transition: all 200ms ease;
  z-index: 2;

  #{$focus} {
    border-color: currentColor;
    color: color('action');
    opacity: 1;
  }
}

[data-slide-control='close'] {
  @include position(fixed 0 0 null null);
}

[data-slide-control='prev'] {
  @include position(fixed null null 0 0);
}

[data-slide-control='next'] {
  @include position(fixed null 0 0 null);
}
</style>

