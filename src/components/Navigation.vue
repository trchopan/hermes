<template>
  <v-app>
    <v-toolbar app flat clipped-left dark>
      <v-toolbar-side-icon @click="drawerOpen = !drawerOpen" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          flat
          v-for="item in drawerItems"
          v-if="item.toolbar"
          @click="navigate(item.path)"
          :key="'toolbar-' + item.name">
          {{ item.name }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer
      app
      dark
      clipped
      v-model="drawerOpen">
        <v-list class="pa-0">
          <v-list-tile v-if="!profile"
            @click="navigate('/login')">
            <v-list-tile-action>
              <div>&nbsp;</div>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Log in</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-else avatar >
            <v-list-tile-avatar>
              <img :src="profile.avatar">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ profile.fullname }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider dark />
          <v-list-tile class="hidden-md-and-up"
            v-for="item in drawerItems"
            @click="navigate(item.path)"
            :key="'drawer-' + item.name">
            <v-list-tile-action>
              <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
              <div v-else>&nbsp;</div>
            </v-list-tile-action>
            <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          </v-list-tile>
          <v-divider dark />
          <v-list-tile v-if="profile"
            @click="logout()">
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
      title: process.env.VUE_APP_TITLE,
      drawerItems: [
        { path: "/", name: "Home", icon: "home", toolbar: true },
        {
          path: "/dashboard",
          name: "Dashboard",
          icon: "dashboard",
          toolbar: true
        },
        { path: "/about", name: "About", icon: "", toolbar: true }
      ]
    };
  },
  computed: mapGetters({ authUser: "auth/authUser", profile: "auth/profile" }),
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
