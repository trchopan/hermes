<template>
  <v-toolbar app dark flat clipped-left color="primary">
    <v-toolbar-side-icon @click="toggleDrawer()"/>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer/>
    <v-toolbar-items>
      <ToolbarLoadingMenu/>
      <ToolbarMenu/>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import ToolbarMenu from "./ToolbarMenu.vue";
import ToolbarLoadingMenu from "./ToolbarLoadingMenu.vue";

export default {
  name: "Toolbar",
  components: {
    ToolbarMenu,
    ToolbarLoadingMenu
  },
  data: () => ({
    title: process.env.VUE_APP_TITLE
  }),
  methods: {
    toggleDrawer() {
      this.$store.dispatch("layout/toggleDrawer");
    }
  }
};
</script>
