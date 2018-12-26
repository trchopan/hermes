<template>
  <div>
    <p>Search user</p>
    <p>{{ lastError }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

const LANGUAGES_MAP = {
  search: { vi: "Tìm", en: "Search" }
};

export default {
  name: "SearchUser",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      error: "error",
      language: "layout/language",
      usersList: "user/usersList"
    }),
    $t() {
      return this.$translate(LANGUAGES_MAP, this.language.value);
    },
    lastError() {
      const lastError = this.error[this.error.length - 1] || null;
      if (!lastError) {
        return "";
      }
      switch (lastError.code) {
        case "auth/require-captch":
          return this.$t.requireCaptcha;
        default:
          return this.$t.unknownError;
      }
    }
  },
  methods: {
    async changeRole() {}
  },
  mounted() {
    this.$store.dispatch("user/listUsers");
  }
};
</script>

<style lang="scss" scoped>
.v-progress-linear {
  margin: 0;
}
</style>
