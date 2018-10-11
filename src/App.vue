<template>
  <div id="app">
    <button @click="logout()">logout</button>
    <Navigation />
    <router-view/>
    <pre>{{ JSON.stringify(currentUser) }}</pre>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Navigation from "@/components/Navigation/Navigation.vue";

export default {
  name: "App",
  components: {
    Navigation
  },
  computed: mapGetters({
    currentUser: "auth/currentUser"
  }),
  methods: {
    async logout() {
      const loggedOut = await this.$store.dispatch("auth/logout");
      if (loggedOut) this.$router.replace("/login");
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Muli:400,600|Merriweather:400,700");
@import "~normalize.css/normalize.css";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
