<template>
  <div>
    <my-header>{{ $t.today | format([localTimeString, "Beauti"]) }}</my-header>
    <v-fab-transition>
      <v-btn
        v-show="!initButton"
        color="pink"
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
import { translate } from "@/share/helpers";

const languagesMap = {
  today: { vi: "Bây giờ là {0}, {1}", en: "Now is {0}, {1}" }
};

export default {
  name: "Dashboard",
  data: () => ({ initButton: true }),
  computed: {
    ...mapGetters({
      language: "layout/language"
    }),
    $t() {
      return translate(languagesMap, this.language.code);
    },
    localTimeString() {
      return new Date().toLocaleString(this.language.code);
    }
  },
  mounted() {
    this.initButton = false;
  }
};
</script>
