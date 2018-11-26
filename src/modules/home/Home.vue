<template>
  <div>
    <my-header>{{ $t.home }}</my-header>
    <div v-if="!authUser" class="home-container">
      <p>{{ $t.notYetHasAccount }}</p>
      <v-btn to="/signup" outline color="secondary">{{ $t.pressHereToSignUp }}</v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export const languagesMap = {
  home: { vi: "Troang chủ", en: "Home page" },
  notYetHasAccount: {
    vi: "Bạn chưa có tài khoản?",
    en: "Not yet have account?"
  },
  pressHereToSignUp: {
    vi: "Hãy nhấn vào đây để đăng ký",
    en: "Click here to sign up"
  }
};

export default {
  name: "Home",
  computed: {
    ...mapGetters({
      language: "layout/language",
      authUser: "auth/authUser"
    }),
    $t() {
      return this.$translate(languagesMap, this.language.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.home-container {
  text-align: center;
}
</style>
