<template>
  <v-menu :close-on-content-click="false" v-model="menuOpen" offset-y left>
    <v-avatar slot="activator" :size="$vuetify.breakpoint.mdAndUp ? 42 : 36">
      <img v-if="profile" :src="profile.avatar" alt="avatar">
      <img v-else :src="defaultAvatar" alt="avatar">
    </v-avatar>
    <v-card>
      <v-list v-if="authUser" two-line>
        <v-list-tile avatar to="/profile" @click="menuOpen = false">
          <v-list-tile-avatar>
            <img v-if="profile" :src="profile.avatar" alt="big avatar">
            <img v-else :src="defaultAvatar" alt="big avatar">
          </v-list-tile-avatar>
          <v-list-tile-content v-if="profile">
            <v-list-tile-title>{{ profile.fullname }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ authUser.email }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-content v-else>
            <v-list-tile-title>{{ authUser.email }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ $t.updateProfile }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider v-if="authUser"/>
      <v-list>
        <v-list-tile>
          <v-list-tile-content>
            <v-select
              :value="language"
              :items="languages"
              :label="$t.selectLanguage"
              @change="changeLanguage($event)"
            />
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-switch
            class="pr-3 pt-2"
            :label="$t.darkTheme"
            :input-value="theme"
            :true-value="themes.dark"
            :false-value="themes.light"
            @change="changeTheme($event)"
          ></v-switch>
        </v-list-tile>
      </v-list>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="authUser" outline @click="logout()">{{ $t.logout }}</v-btn>
        <v-btn
          v-else
          outline
          to="/login"
          @click="menuOpen = false"
        >{{ $t.login }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import { mapGetters } from "vuex";
import { themes, languages } from "@/modules/core/root.models.js";

export const LANGUAGES_MAP = {
  updateProfile: {
    vi: "Cập nhật thông tin tài khoản",
    en: "Please update your profile"
  },
  selectLanguage: { vi: "Chọn ngôn ngữ", en: "Select language" },
  darkTheme: { vi: "Tắt đèn", en: "Light out" },
  logout: { vi: "Đăng xuất", en: "Log out" },
  login: { vi: "Đăng nhập", en: "Log in" }
};

export default {
  name: "ToolbarMenu",
  data: () => ({
    defaultAvatar: process.env.VUE_APP_DEFAULT_AVATAR,
    themes,
    languages: Object.values(languages),
    title: process.env.VUE_APP_TITLE,
    menuOpen: false
  }),
  computed: {
    ...mapGetters({
      authUser: "auth/authUser",
      profile: "auth/profile",
      theme: "theme",
      language: "language"
    }),
    $t() {
      return this.$translate(LANGUAGES_MAP, this.language.value);
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
      this.$store.dispatch("changeTheme", theme);
    },
    changeLanguage(code) {
      this.menuOpen = false;
      this.$store.dispatch("changeLanguage", languages[code]);
    }
  }
};
</script>
