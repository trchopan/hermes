<template>
  <v-navigation-drawer v-model="drawerOpen" app clipped width="230">
    <v-list class="pa-0">
      <v-list-tile
        v-for="item in drawerItems"
        :key="'drawer-' + item.name"
        avatar
        :to="item.path"
      >
        <v-list-tile-avatar>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-title>{{ item.name }}</v-list-tile-title>
      </v-list-tile>
      <v-divider/>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

export const languagesMap = {
  home: { vi: "Trang chủ", en: "Home" },
  dashboard: { vi: "Bảng điều khiển", en: "Dashboard" },
  user: { vi: "Quản lý người dùng", en: "User management" },
  about: { vi: "Về chúng tôi", en: "About" }
};

export const _drawerItems = [
  { path: "/", name: "home", icon: "home" },
  {
    path: "/dashboard",
    name: "dashboard",
    icon: "dashboard"
  },
  { path: "/user", name: "user", icon: "account_circle" },
  { path: "/about", name: "about", icon: "" }
];

export default {
  name: "NavigationDrawer",
  computed: {
    ...mapGetters({
      _drawerOpen: "layout/drawerOpen",
      language: "layout/language"
    }),
    $t() {
      return this.$translate(languagesMap, this.language.code);
    },
    drawerOpen: {
      get: function() {
        return this._drawerOpen;
      },
      set: function(value) {
        if (value !== this.$store.state.layout.drawerOpen) {
          this.$store.dispatch("layout/toggleDrawer");
        }
      }
    },
    drawerItems() {
      return _drawerItems.map(x => ({ ...x, name: this.$t[x.name] }));
    }
  }
};
</script>
