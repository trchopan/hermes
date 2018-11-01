<template>
  <v-menu
    :close-on-content-click="false"
    offset-y
    left>
    <v-avatar
      slot="activator"
      :size="$vuetify.breakpoint.mdAndUp ? 42 : 36">
      <img v-if="profile" :src="profile.avatar" alt="avatar" />
      <img v-else src="/images/bloody-smile.jpg" alt="avatar" />
    </v-avatar>

    <v-card class="profile-card">
      <v-list v-if="profile">
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
      <v-divider v-if="profile" />
      <v-list>
        <v-list-tile>
          <v-list-tile-content>
            <v-select
              :value="language.name"
              :items="Object.values(languages).map(x => x.name)"
              :label="$t.toolbar.selectLanguage"
              @change="changeLanguage($event)" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-card-actions>
        <v-switch
          class="pr-3 pt-2"
          :label="$t.toolbar.darkTheme"
          :input-value="theme"
          :true-value="themes.dark"
          :false-value="themes.light"
          @change="changeTheme($event)">
        </v-switch>
        <v-spacer></v-spacer>
        <v-btn v-if="profile"
          outline
          @click="logout()">
          {{ $t.toolbar.logout }}
        </v-btn>
        <v-btn v-else
          outline
          to="/login">
          {{ $t.toolbar.login }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import { mapGetters } from "vuex";
import { themes } from "@/store/modules/layout";
import { languages } from "@/languages";

export default {
  name: "ToolbarMenu",
  data: () => ({
    themes,
    languages,
    title: process.env.VUE_APP_TITLE
  }),
  computed: mapGetters({
    profile: "auth/profile",
    theme: "layout/theme",
    language: "layout/language",
    $t: "layout/$t"
  }),
  methods: {
    async logout() {
      const loggedOut = await this.$store.dispatch("auth/logout");
      if (loggedOut) {
        this.$router.replace("/login");
      }
    },
    changeTheme(theme) {
      this.$store.dispatch("layout/changeTheme", theme);
    },
    changeLanguage(language) {
      const lang = Object.values(languages).find(x => x.name === language);
      this.$store.dispatch("layout/changeLanguage", lang);
    }
  }
};
</script>

<style lang="scss" scoped>
.profile-card {
  min-width: 250px;
}
</style>
