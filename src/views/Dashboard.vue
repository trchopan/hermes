<template>
  <div>
    <my-header>{{ $t.header }}</my-header>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { translate } from "@/store/modules/layout";

const languagesMap = {
  header: { vi: "Xin chào dashboard", en: "Hi from dashboard" }
};

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters({
      language: "layout/language"
    }),
    $t() {
      return translate(languagesMap, this.language.code);
    }
  }
};
</script>
