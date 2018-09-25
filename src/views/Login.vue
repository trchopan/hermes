<template>
  <form @submit="onSubmit()">
    <input type="text" v-model="email" />
    <input type="password" v-model="password" />
    <button type="submit" />
  </form>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: mapGetters({ isLoggedIn: "auth/isLoggedIn" }),
  watch: {
    isLoggedIn(newValue, oldValue) {
      if (newValue) this.$router.push("/home");
    }
  },
  methods: {
    onSubmit() {
      const someApi = () => "hello";
      this.$store.dispatch("auth/loginWithEmailPassword", {
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>

<style lang="scss">
</style>
