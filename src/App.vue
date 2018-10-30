<template>
  <div id="app">
    <InitMessage v-if="loading" />
    <v-app v-else :dark="darkTheme">
      <Toolbar />
      <NavigationDrawer />
      <v-content>
        <v-container fluid :class="{ dark: darkTheme }">
          <router-view/>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import InitMessage from "@/components/layout/InitMessage";
import Toolbar from "@/components/layout/Toolbar";
import NavigationDrawer from "@/components/layout/NavigationDrawer";

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
    if (this.$vuetify.breakpoint.lgAndUp) {
      this.$store.dispatch("layout/toggleDrawer");
    }
  }
};
</script>

<style lang="scss">
@import url("./assets/style.scss");

.dark {
  color: white;
}
.theme--dark * > .primary--text {
  color: #95caff !important;
}
</style>
