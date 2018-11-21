<template>
  <div id="app">
    <InitMessage v-if="loading && !profile"/>
    <v-app v-else :dark="darkTheme">
      <Toolbar/>
      <NavigationDrawer/>
      <v-content>
        <v-container fluid :class="{ 'white--text': darkTheme }">
          <transition name="fade" mode="out-in">
            <router-view/>
          </transition>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import InitMessage from "./components/InitMessage.vue";
import Toolbar from "./components/Toolbar.vue";
import NavigationDrawer from "./components/NavigationDrawer.vue";

export default {
  name: "App",
  components: {
    Toolbar,
    NavigationDrawer,
    InitMessage
  },
  computed: mapGetters({
    darkTheme: "layout/darkTheme",
    loading: "auth/loading",
    profile: "auth/profile"
  }),
  created() {
    this.$store.dispatch("layout/initLocalStorage");
    if (this.$vuetify.breakpoint.lgAndUp) {
      this.$store.dispatch("layout/toggleDrawer");
    }
    this.$t();
  }
};
</script>

<style lang="scss" src="@/style.scss" />
