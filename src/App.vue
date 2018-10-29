<template>
  <div id="app">
    <InitMessage v-if="loading" />
    <Navigation v-else>
      <router-view/>
    </Navigation>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import InitMessage from "@/components/InitMessage";
import Navigation from "@/components/Navigation";

export default {
  name: "App",
  components: {
    Navigation,
    InitMessage
  },
  computed: mapGetters({ loading: "auth/loading" })
};
</script>

<style lang="scss">
@import url("./assets/style.scss");
</style>
