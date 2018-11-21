<template>
  <div>
    <my-header>{{ $t.userCreate }}</my-header>
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { translate } from "@/share/helpers";

const languagesMap = {
  userCreate: { vi: "Tạo người dùng", en: "Create users" }
};

export default {
  name: "UserCreate",
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
