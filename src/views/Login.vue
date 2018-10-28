<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Login form</v-toolbar-title>
        </v-toolbar>
        <v-form>
          <v-card-text>
            <v-text-field
              id="email"
              prepend-icon="person"
              name="email"
              label="Email"
              type="text"
              :error-messages="error ? error.message : ''"
              v-model="email" />
            <v-text-field
              id="password"
              prepend-icon="lock"
              name="password"
              label="Password"
              type="password"
              v-model="password" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn
              id="submit"
              color="primary"
              type="submit"
              :disabled="loading"
              @click.prevent="onSubmit()">
              Login
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
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
    authUser: "auth/authUser",
    loading: "auth/loading"
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
