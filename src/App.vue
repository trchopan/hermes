<template>
  <div id="app">
    <Init v-if="!inited" />
    <Navigation v-else>
      <Header/>
      <router-view/>
    </Navigation>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import Init from "@/components/Init";

export default {
  name: "App",
  components: {
    Init,
    Navigation,
    Header
  },
  computed: {
    ...mapGetters({
      currentUser: "auth/currentUser",
      redirect: "auth/redirect"
    }),
    inited() {
      if (this.currentUser === null) return false;
      if (this.$route.meta.requireAuth && !this.currentUser.uid) {
        this.$router.push("/login");
      }
      return true;
    }
  },
  mounted() {
    this.$store.dispatch("auth/init");
  }
};
</script>

<style lang="scss">
@import url("./assets/style.scss");
</style>
