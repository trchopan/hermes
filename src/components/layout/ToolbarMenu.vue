<template>
  <v-menu
    :close-on-content-click="false"
    v-model="menuOpen"
    offset-y
    left>
    <v-avatar
      slot="activator"
      :size="$vuetify.breakpoint.mdAndUp ? 42 : 36">
      <img v-if="profile" :src="profile.avatar" alt="avatar" />
      <img v-else src="/images/bloody-smile.jpg" alt="avatar" />
    </v-avatar>

    <v-card>
      <v-list v-if="profile">
        <v-list-tile avatar to="/profile" @click="menuOpen = false">
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
        <v-list-tile avatar>
          <v-list-tile-avatar tile>
            <img :src="`./icons/${language.code}.svg`" alt="language icon" />
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-select
              :value="language.name"
              :items="Object.values(languages).map(x => x.name)"
              :label="$t.selectLanguage"
              @change="changeLanguage($event)" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-card-actions>
        <v-switch
          class="pr-3 pt-2"
          :label="$t.darkTheme"
          :input-value="theme"
          :true-value="themes.dark"
          :false-value="themes.light"
          @change="changeTheme($event)">
        </v-switch>
        <v-spacer></v-spacer>
        <v-btn v-if="profile"
          outline
          @click="logout()">
          {{ $t.logout }}
        </v-btn>
        <v-btn v-else
          outline
          to="/login"
          @click="menuOpen = false">
          {{ $t.login }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import { mapGetters } from "vuex";
import { themes, languages, translate } from "@/store/modules/layout";

const languagesMap = {
  selectLanguage: { vi: "Chọn ngôn ngữ", en: "Select language" },
  darkTheme: { vi: "Tắt đèn", en: "Light out" },
  logout: { vi: "Đăng xuất", en: "Log out" },
  login: { vi: "Đăng nhập", en: "Log in" }
};

export default {
  name: "ToolbarMenu",
  data: () => ({
    themes,
    languages,
    title: process.env.VUE_APP_TITLE,
    menuOpen: false
  }),
  computed: {
    ...mapGetters({
      profile: "auth/profile",
      theme: "layout/theme",
      language: "layout/language"
    }),
    $t() {
      return translate(languagesMap, this.language.code);
    }
  },
  methods: {
    async logout() {
      const loggedOut = await this.$store.dispatch("auth/logout");
      if (loggedOut) {
        this.menuOpen = false;
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
