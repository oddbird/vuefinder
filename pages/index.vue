<template>
  <div data-layout="home">
    <h1>vuefinder</h1>

    <div v-for="(list, group) in routesByType" :key='group'>
      <strong>{{ group }}</strong>
      <ul>
        <li v-for="item in list" :key="item" >
          <link-if :url="`/${item}`">{{ item }}</link-if>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import LinkIf from '~/components/utility/LinkIf.vue';

  export default {
    components: {
      LinkIf,
    },
    data() {
      return {
        mdRoutes: process.env.mdRoutes,
      };
    },
    computed: {
      routesByType() {
        const group = {};
        for (const route in process.env.mdRoutes) {
          let src = process.env.mdRoutes[route];
          const type = src.slice(src.indexOf('/') + 1, src.lastIndexOf('/'));
          if (type in group) {
            group[type].push(route);
          } else {
            group[type] = [route];
          }
        }
        return group;
      },
    },
  }
</script>
