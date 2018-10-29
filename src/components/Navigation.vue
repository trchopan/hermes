<template>
  <v-app>
    <v-toolbar app flat clipped-left dark>
      <v-toolbar-side-icon @click="drawerOpen = !drawerOpen" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-menu v-if="profile"
          offset-y
          dark>
          <v-avatar
            slot="activator"
            :size="$vuetify.breakpoint.mdAndUp ? 48 : 36">
            <img :src="profile.avatar" alt="avatar" />
          </v-avatar>
          <v-list>
            <v-list-tile @click="logout()">
              <v-list-tile-title>Log out</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-btn v-else
          flat
          @click="navigate('/login')">
          Log in
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer v-model="drawerOpen"
      app
      dark
      clipped
      width="200">
      <v-list class="pa-0">
        <v-list-tile v-for="item in drawerItems"
          :key="'drawer-' + item.name"
          avatar
          @click="navigate(item.path)">
          <v-list-tile-avatar>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title>{{ item.name }}</v-list-tile-title>
        </v-list-tile>
        <v-divider dark />
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid>
        <slot></slot>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Navigation",
  data() {
    return {
      drawerOpen: this.$vuetify.breakpoint.lgAndUp ? true : false,
      bottomNav: "recent",
      title: process.env.VUE_APP_TITLE,
      drawerItems: [
        { path: "/", name: "Home", icon: "home" },
        { path: "/dashboard", name: "Dashboard", icon: "dashboard" },
        { path: "/about", name: "About", icon: "" }
      ]
    };
  },
  computed: {
    ...mapGetters({ authUser: "auth/authUser", profile: "auth/profile" })
  },
  methods: {
    async logout() {
      const loggedOut = await this.$store.dispatch("auth/logout");
      if (loggedOut) this.$router.replace("/login");
    },
    navigate(link) {
      this.$router.push(link);
    }
  }
};
</script>

<style lang="scss" scoped>
.v-avatar {
  margin: auto;
}
</style>
