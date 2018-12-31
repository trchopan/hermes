<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm6 md4>
      <v-card class="elevation-12">
        <v-form>
          <v-card-text>
            <v-text-field
              autofocus
              id="email"
              prepend-icon="person"
              name="email"
              label="Email"
              type="text"
              :error-messages="errorMessage"
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
              outline
              to="/signup"
              color="secondary"
              type="button"
            >{{ $t.signUp }}</v-btn>
            <v-btn
              id="submit"
              color="primary"
              type="submit"
              :disabled="loading.login"
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

const LANGUAGES_MAP = {
  signUp: { vi: "Đăng ký", en: "Sign up" },
  login: { vi: "Đăng nhập", en: "Log in" },
  password: { vi: "Mật khẩu", en: "Password" },
  userNotFound: {
    vi: "Không tìm thấy tài khoản. Bạn vui lòng kiểm tra lại thông tin",
    en: "Account not found. Please check your information again."
  },
  invalidEmail: { vi: "Email không hợp lệ", en: "Invalid email" }
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
      error: "error",
      authUser: "auth/authUser",
      loading: "auth/loading",
      language: "layout/language"
    }),
    $t() {
      return this.$translate(LANGUAGES_MAP, this.language.value);
    },
    errorMessage() {
      const lastError = this.error[this.error.length - 1];
      if (!lastError || !lastError.code) {
        return "";
      }
      switch (lastError.code) {
        case "auth/user-not-found":
          return this.$t.userNotFound;
        case "auth/invalid-email":
          return this.$t.invalidEmail;
        default:
          return "";
      }
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
