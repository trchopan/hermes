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
import { mapGetters } from "vuex";

export default {
  name: "NavigationDrawer",
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
    },
    ...mapGetters({ $t: "layout/$t" }),
    drawerItems() {
      return [
        { path: "/", name: this.$t.drawer.home, icon: "home" },
        {
          path: "/dashboard",
          name: this.$t.drawer.dashboard,
          icon: "dashboard"
        },
        { path: "/about", name: this.$t.drawer.about, icon: "" }
      ];
    }
  }
};
</script>
