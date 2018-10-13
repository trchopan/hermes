<template>
  <form @submit.prevent="onSubmit()">
    <p id="error" class="error">{{ error }}</p>
    <label for="email">Email:</label>
    <input id="email" type="text" v-model="email" />
    <label for="password">Password:</label>
    <input id="password" type="password" v-model="password" />
    <button type="submit">Submit</button>
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
  computed: mapGetters({
    error: "auth/error",
    currentUser: "auth/currentUser"
  }),
  methods: {
    async onSubmit() {
      const success = await this.$store.dispatch(
        "auth/loginWithEmailPassword",
        {
          email: this.email,
          password: this.password
        }
      );
      if (success) this.$router.replace("/");
    }
  }
};
</script>
