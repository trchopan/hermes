<template>
  <div id="app">
    <v-app :dark="darkTheme">
      <Toolbar/>
      <NavigationDrawer/>
      <v-content>
        <v-container
          fluid
          :class="{ 'white--text': darkTheme }"
        >
          <transition
            name="fade"
            mode="out-in"
          >
            <router-view/>
          </transition>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Toolbar from "./components/Toolbar.vue";
import NavigationDrawer from "./components/NavigationDrawer.vue";

export default {
  name: "App",
  components: {
    Toolbar,
    NavigationDrawer
  },
  data() {
    return {
      backgroundImg: process.env.VUE_APP_BACKGROUND_IMAGE
    };
  },
  computed: mapGetters({
    darkTheme: "darkTheme",
    loading: "auth/loading",
    profile: "auth/profile"
  }),
  created() {
    this.$store.dispatch("initLocalStorage");
    if (this.$vuetify.breakpoint.lgAndUp) {
      this.$store.dispatch("toggleDrawer");
    }
  }
};
</script>

<style lang="scss" src="@/style.scss" />
