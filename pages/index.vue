<template>
  <div data-layout="home">
    <h1>vuefinder</h1>

    <div v-for="(list, group) in routesByType" :key='group'>
      <strong>{{ group }}</strong>
      <ul>
        <li v-for="item in list" :key="item" >
          <a :href="`/${item}`">{{ item }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        mdRoutes: process.env.mdRoutes,
      };
    },
    computed: {
      routesByType() {
        const group = {};
        for (const route in process.env.mdRoutes) {
          const src = process.env.mdRoutes[route];
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
