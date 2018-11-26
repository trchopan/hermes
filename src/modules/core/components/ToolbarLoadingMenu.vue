<template>
  <v-menu v-if="loading.length > 0" v-model="menuOpen" offset-y left>
    <v-progress-circular
      indeterminate
      class="mr-3"
      slot="activator"
      :size="$vuetify.breakpoint.mdAndUp ? 32 : 28"
    />
    <v-card>
      <v-list>
        <v-list-tile v-for="(l, i) in loading" :key="'loading-' + i">
          <v-list-tile-content>
            <v-list-tile-title>...{{ $t[l] }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import { mapGetters } from "vuex";

export const languagesMap = {
  updateProfile: {
    vi: "Cập nhật thông tin tài khoản",
    en: "Please update your profile"
  },
  "auth/create": {
    vi: "Đang tạo user",
    en: "Creating user"
  },
  "auth/profile": {
    vi: "Đang tải thông tin tài khoản",
    en: "Getting profile information"
  },
  "auth/login": {
    vi: "Đang đăng nhập",
    en: "Logging in"
  },
  "auth/logout": {
    vi: "Đang đăng nhập",
    en: "Logging out"
  }
};

export default {
  name: "ToolbarLoadingMenu",
  data: () => ({
    menuOpen: false
  }),
  computed: {
    ...mapGetters({
      language: "layout/language",
      authLoading: "auth/loading"
    }),
    $t() {
      return this.$translate(languagesMap, this.language.value);
    },
    loading() {
      let authLoadingArray = Object.keys(this.authLoading)
        .filter(key => this.authLoading[key] === true)
        .map(x => "auth/" + x);
      return authLoadingArray;
    }
  }
};
</script>
