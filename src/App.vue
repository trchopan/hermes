<template>
  <div id="app">
    <Navigation>
      <router-view/>
    </Navigation>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";

export default {
  name: "App",
  components: {
    Navigation
  }
};
</script>

<style lang="scss">
@import url("./assets/style.scss");
</style>
