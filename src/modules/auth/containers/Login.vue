<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{ $t.login }}</v-toolbar-title>
        </v-toolbar>
        <v-progress-linear
          :active="loading"
          indeterminate
          color="orange"
          height="3"
        />
        <v-form>
          <v-card-text>
            <v-text-field
              id="email"
              prepend-icon="person"
              name="email"
              label="Email"
              type="text"
              :error-messages="error ? error.message : ''"
              v-model="email"
            />
            <v-text-field
              id="password"
              prepend-icon="lock"
              name="password"
              :label="$t.password"
              type="password"
              v-model="password"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn
              id="submit"
              color="primary"
              type="submit"
              :disabled="loading"
              @click.prevent="onSubmit()"
            >{{ $t.login }}</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
import { translate } from "@/share/helpers";

const languagesMap = {
  login: { vi: "Đăng nhập", en: "Log in" },
  password: { vi: "Mật khẩu", en: "Password" }
};

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters({
      error: "auth/error",
      authUser: "auth/authUser",
      loading: "auth/loading",
      language: "layout/language"
    }),
    $t() {
      return translate(languagesMap, this.language.code);
    }
  },
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

<style lang="scss" scoped>
.v-progress-linear {
  margin: 0;
}
</style>
