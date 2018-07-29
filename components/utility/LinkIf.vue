<template>
  <a v-if="url" :href="url" ><slot /></a>
  <span v-else><slot /></span>
</template>

<script>
  export default {
    props: {
      url: {
        type: [String, Boolean],
        default: false
      },
    },
  }
</script>
