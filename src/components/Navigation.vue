<template>
  <div>Hi from nav</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Navigation",
  data() {
    return {
      bottomNav: "recent"
    };
  },
  computed: mapGetters({ currentUser: "auth/currentUser" }),
  created() {
    console.log("router", this.$router);
  },
  methods: {
    async logout() {
      const loggedOut = await this.$store.dispatch("auth/logout");
      if (loggedOut) this.$router.replace("/login");
    }
  }
};
</script>

<style lang="scss" scoped>
nav {
  text-align: center;
  padding: 30px;
  a {
    font-weight: bold;
    color: var(--primary-color);
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
