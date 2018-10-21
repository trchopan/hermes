<template>
  <form @submit.prevent="onSubmit()">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
                </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="person"
                    name="login"
                    label="Login"
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
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" type="submit">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
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
    authUser: "auth/authUser"
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
      console.log("error", this.error);
      if (success) this.$router.replace("/");
    }
  }
};
</script>
