<template>
  <div id="app">
    <Navigation />
    <Header />
    <router-view/>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation.vue";
import Header from "@/components/Header.vue";

export default {
  name: "App",
  components: {
    Navigation,
    Header
  }
};
</script>

<style lang="scss">
@import url("./assets/style.scss");
</style>
