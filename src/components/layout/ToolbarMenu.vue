<template>
  <v-menu v-if="profile"
    :close-on-content-click="false"
    offset-y
    left>
    <v-avatar
      slot="activator"
      :size="$vuetify.breakpoint.mdAndUp ? 42 : 36">
      <img :src="profile.avatar" alt="avatar" />
    </v-avatar>

    <v-card>
      <v-list>
        <v-list-tile avatar to="/profile">
          <v-list-tile-avatar>
            <img :src="profile.avatar" alt="big avatar">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ profile.fullname }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ profile.position | titleCase }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-divider></v-divider>

      <v-card-actions>
        <v-switch
          class="pr-3 pt-2"
          label="Dark theme"
          :input-value="theme"
          :true-value="themes.dark"
          :false-value="themes.light"
          @change="changeTheme($event)">
        </v-switch>
        <v-spacer></v-spacer>
        <v-btn
          outline
          @click="logout()">
          Log out
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import { mapGetters } from "vuex";
import { themes } from "@/store/modules/layout";

export default {
  name: "ToolbarMenu",
  data: () => ({
    themes,
    title: process.env.VUE_APP_TITLE
  }),
  computed: mapGetters({
    profile: "auth/profile",
    theme: "layout/theme"
  }),
  methods: {
    async logout() {
      const loggedOut = await this.$store.dispatch("auth/logout");
      if (loggedOut) this.$router.replace("/login");
    },
    changeTheme(theme) {
      this.$store.dispatch("layout/changeTheme", theme);
    }
  }
};
</script>
