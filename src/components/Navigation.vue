<template>
  <v-card height="200px" flat>
    <div class="headline text-xs-center pa-5">
      Active: {{ bottomNav }}
    </div>
    <v-bottom-nav :active.sync="bottomNav"
      :value="true"
      absolute
      color="transparent">
      <v-btn color="teal"
        flat
        value="recent">
        <span>Recent</span>
        <v-icon>history</v-icon>
      </v-btn>

      <v-btn color="teal"
        flat
        value="favorites">
        <span>Favorites</span>
        <v-icon>favorite</v-icon>
      </v-btn>

      <v-btn color="teal"
        flat
        value="nearby">
        <span>Nearby</span>
        <v-icon>place</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-card>
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
