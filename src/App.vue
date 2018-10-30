<template>
  <div id="app">
    <InitMessage v-if="loading" />
    <v-app v-else :dark="darkTheme">
      <Toolbar />
      <NavigationDrawer />
      <v-content>
        <v-container fluid>
          <router-view/>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import InitMessage from "@/components/InitMessage";
import Toolbar from "@/components/Toolbar";
import NavigationDrawer from "@/components/NavigationDrawer";

export default {
  name: "App",
  components: {
    Toolbar,
    NavigationDrawer,
    InitMessage
  },
  computed: mapGetters({
    darkTheme: "layout/darkTheme",
    loading: "auth/loading"
  }),
  created() {
    this.$store.dispatch("layout/initLocalStorage");
  }
};
</script>

<style lang="scss">
@import url("./assets/style.scss");
</style>
