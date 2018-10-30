<template>
    <v-navigation-drawer v-model="drawerOpen"
      app
      clipped
      width="200">
      <v-list class="pa-0">
        <v-list-tile v-for="item in drawerItems"
          :key="'drawer-' + item.name"
          avatar
          :to="item.path">
          <v-list-tile-avatar>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>{{ item.name }}</v-list-tile-title>
        </v-list-tile>
        <v-divider  />
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  name: "NavigationDrawer",
  data: () => ({
    drawerItems: [
      { path: "/", name: "Home", icon: "home" },
      { path: "/dashboard", name: "Dashboard", icon: "dashboard" },
      { path: "/about", name: "About", icon: "" }
    ]
  }),
  computed: {
    drawerOpen: {
      get: function() {
        return this.$store.state.layout.drawerOpen;
      },
      set: function(value) {
        if (value !== this.$store.state.layout.drawerOpen) {
          this.$store.dispatch("layout/toggleDrawer");
        }
      }
    }
  }
};
</script>
