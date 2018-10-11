<template>
  <div>Initializing...</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "InitPage",
  computed: mapGetters({ inited: "auth/inited", redirect: "auth/redirect" }),
  watch: {
    inited(value) {
      if (value) this.$router.replace(this.redirect);
    }
  }
};
</script>

<style lang="scss">
</style>
