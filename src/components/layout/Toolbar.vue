<template>
  <v-toolbar app dark flat clipped-left color="primary">
    <v-toolbar-side-icon @click="toggleDrawer()" />
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer />
    <v-toolbar-items>
      <ToolbarMenu v-if="profile" />
      <v-btn v-else
        flat
        to="/login"
        replace>
        Log in
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapGetters } from "vuex";
import ToolbarMenu from "@/components/layout/ToolbarMenu.vue";

export default {
  name: "Toolbar",
  components: {
    ToolbarMenu
  },
  data: () => ({
    title: process.env.VUE_APP_TITLE
  }),
  computed: mapGetters({
    profile: "auth/profile"
  }),
  methods: {
    toggleDrawer() {
      this.$store.dispatch("layout/toggleDrawer");
    }
  }
};
</script>
