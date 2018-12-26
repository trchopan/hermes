<template>
  <v-menu
    v-if="filteredLoadings.length > 0"
    v-model="menuOpen"
    offset-y
    left
  >
    <v-progress-circular
      indeterminate
      class="mr-3"
      slot="activator"
      :size="$vuetify.breakpoint.mdAndUp ? 32 : 28"
    />
    <v-card>
      <v-list>
        <v-list-tile
          v-for="(loading, i) in filteredLoadings"
          :key="'loading-' + i"
        >
          <v-list-tile-content>
            <v-list-tile-title>...{{ $t[loading] }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import { mapGetters } from "vuex";

export const LANGUAGES_MAP = {
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
    vi: "Đang đăng xuất",
    en: "Logging out"
  }
};

const mapLoadingArray = (moduleName, loadings) =>
  Object.keys(loadings)
    .filter(key => loadings[key] === true)
    .map(x => `${moduleName}/${x}`);

export default {
  name: "ToolbarLoadingMenu",
  data: () => ({
    menuOpen: false
  }),
  computed: {
    ...mapGetters({
      language: "layout/language",
      authLoadings: "auth/loading"
    }),
    $t() {
      return this.$translate(LANGUAGES_MAP, this.language.value);
    },
    filteredLoadings() {
      return mapLoadingArray("auth", this.authLoadings);
    }
  }
};
</script>
