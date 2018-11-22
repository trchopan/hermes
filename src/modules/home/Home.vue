<template>
  <div>
    <my-header>{{ $t.home }}</my-header>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export const languagesMap = {
  home: { vi: "Troang chủ", en: "Home page" }
};

export default {
  name: "Home",
  computed: {
    ...mapGetters({
      language: "layout/language"
    }),
    $t() {
      return this.$translate(languagesMap, this.language.code);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
