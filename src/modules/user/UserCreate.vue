<template>
  <div>
    <my-header>{{ $t.userCreate }}</my-header>
    
  </div>
</template>

<script>
import { mapGetters } from "vuex";

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
      return this.$translate(languagesMap, this.language.value);
    }
  }
};
</script>
