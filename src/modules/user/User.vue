<template>
  <div>
    <router-view/>
    <v-fab-transition>
      <v-btn
        v-show="!initButton"
        color="teal"
        dark
        fixed
        bottom
        right
        fab
        @click="showDialog()"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

const LANGUAGES_MAP = {
  user: { vi: "Người dùng", en: "Users" }
};

export default {
  name: "User",
  data: () => ({ initButton: true }),
  mounted() {
    this.initButton = false;
  },
  computed: {
    ...mapGetters({
      language: "language"
    }),
    $t() {
      return this.$translate(LANGUAGES_MAP, this.language.value);
    }
  }
};
</script>
