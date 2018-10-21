<template>
  <v-app>
    <v-toolbar app flat clipped-left dark>
      <v-toolbar-side-icon @click="drawerOpen = !drawerOpen" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat @click="navigate('/')">Home</v-btn>
        <v-btn flat @click="navigate('/about')">About</v-btn>
        <v-btn flat @click="navigate('/dashboard')">Dashboard</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer
      app
      clipped
      dark
      v-model="drawerOpen">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>John Leider</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="logout()">
            <v-list-tile-action>
              <div>&nbsp;</div>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Log out</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
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
      drawerOpen: false,
      bottomNav: "recent",
      title: process.env.VUE_APP_TITLE
    };
  },
  computed: mapGetters({ authUser: "auth/authUser" }),
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
</style>
