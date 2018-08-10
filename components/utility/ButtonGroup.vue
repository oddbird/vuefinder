<template>
  <div :data-btn-group="name">
    <button-style v-for="(item, index) in options"
      btnStyle='group default'
      :key='index'
      :content='item'
      :active="(item === active)"
      :data-group-btn='(typeof index === String) ? index : item'
      @click="callback(item)" />
  </div>
</template>

<script>
  import ButtonStyle from '~/components/utility/ButtonStyle.vue';

  export default {
    components: {
      ButtonStyle,
    },
    props: {
      name: {
        type: [String, Boolean],
        default: true
      },
      options: {
        type: [Array, Object],
        required: true
      },
      active: {
        type: [String, Boolean],
        default: false
      },
    },
    methods: {
      callback(item) {
        this.$emit('click', item);
      },
    },
  }
</script>

<style lang="scss">
[data-btn-group] {
  display: flex;
}

[data-btn-style~='group'] {
  &:first-child {
    border-bottom-left-radius: size('corner');
    border-top-left-radius: size('corner');
  }

  &:last-child {
    border-bottom-right-radius: size('corner');
    border-top-right-radius: size('corner');
  }

  & + & {
    border-left: none;
  }
}
</style>
