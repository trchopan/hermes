<template>
  <div>
    <my-header>{{ $t.today | format([localTimeString, "Beauti"]) }}</my-header>
    <v-fab-transition>
      <v-btn v-show="!hidden"
        color="pink"
        dark
        fixed
        bottom
        right
        fab
        @click="showDialog()">
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { translate } from "@/store/modules/layout";

const languagesMap = {
  today: { vi: "Bây giờ là {0}, {1}", en: "Now is {0}, {1}" }
};

export default {
  name: "Dashboard",
  data: () => ({ hidden: true }),
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
    this.hidden = false;
  }
};
</script>
