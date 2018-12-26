<template>
  <router-view />
</template>

<script>
import { mapGetters } from "vuex";

const LANGUAGES_MAP = {};

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters({
      error: "error",
      authUser: "auth/authUser",
      loading: "auth/loading",
      language: "layout/language"
    }),
    $t() {
      return this.$translate(LANGUAGES_MAP, this.language.value);
    },
    errorMessage() {
      const lastError = this.error[this.error.length - 1];
      if (!lastError || !lastError.code) {
        return "";
      }
      switch (lastError.code) {
        case "auth/user-not-found":
          return this.$t.userNotFound;
        case "auth/invalid-email":
          return this.$t.invalidEmail;
        default:
          return "";
      }
    }
  }
};
</script>
