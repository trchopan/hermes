<template>
  <v-layout column>
    <v-layout
      row
      :wrap="true"
      align-center
      justify-center
    >
      <v-flex
        xs12
        sm6
        md4
      >
        <v-card
          key="profile-edit"
          class="elevation-6 pt-3 px-3 text-xs-center"
        >
          <v-form
            ref="signUpForm"
            v-model="signUpFormValid"
            @submit.prevent="signUp()"
          >
            <v-text-field
              autofocus
              prepend-icon="person"
              label="Email"
              type="text"
              v-model="email"
              :rules="emailRules"
              validate-on-blur
              required
            />
            <v-text-field
              prepend-icon="lock"
              :label="$t.password"
              type="password"
              v-model="password"
              :rules="passwordRules"
              validate-on-blur
              required
            />
            <v-text-field
              prepend-icon="lock"
              :label="$t.passwordConfirm"
              type="password"
              v-model="passwordConfirm"
              :rules="passwordConfirmRules"
              validate-on-blur
              required
            />
            <Recaptcha @response="recaptchaResponse = $event"/>
            <span
              class="warn--text"
              v-if="authError"
            >{{ authError }}</span>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                outline
                color="secondary"
                type="submit"
                :disabled="loading.create"
              >{{ $t.signUp }}</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
import { validateEmail } from "@/helpers.js";
import Recaptcha from "./components/Recaptcha.vue";

const languagesMap = {
  password: { vi: "Mật khẩu", en: "Password" },
  passwordConfirm: { vi: "Xác nhận mật khẩu", en: "Confirm Password" },
  signUp: { vi: "Đăng ký", en: "Sign Up" },
  invalidEmail: {
    vi: "Email không hợp lệ",
    en: "Invalid email"
  },
  passwordGreaterThan: {
    vi: "Mật khẩu phải nhiều hơn {0} ký tự",
    en: "Password must have more than {0} characters"
  },
  passwordNotMatch: {
    vi: "Mật khẩu xác nhận không trùng nhau",
    en: "Password confirmation does not match"
  },
  requireCaptcha: {
    vi: "Cần xác thực captcha",
    en: "Require captcha verification"
  },
  emailAlreadyExist: {
    vi: "Đã có tài khoản sử dụng email này",
    en: "Email is already used by another account"
  }
};

export default {
  name: "Login",
  components: {
    Recaptcha
  },
  data() {
    return {
      signUpFormValid: false,
      email: "",
      password: "",
      passwordConfirm: "",
      emailRules: [v => validateEmail(v) || this.$t.invalidEmail],
      passwordRequiredLength: 6,
      passwordRules: [
        v =>
          v.length >= this.passwordRequiredLength ||
          this.$format(this.$t.passwordGreaterThan, [
            this.passwordRequiredLength
          ])
      ],
      passwordConfirmRules: [
        v => v === this.password || this.$t.passwordNotMatch
      ]
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
      return this.$translate(languagesMap, this.language.value);
    },
    authError() {
      const lastError = this.error[this.error.length - 1] || null;
      if (!lastError) {
        return "";
      }
      switch (lastError.code) {
        case "auth/require-captch":
          return this.$t.requireCaptcha;
        case "auth/email-already-exists":
          return this.$t.emailAlreadyExist;
        default:
          return this.$t.unknownError;
      }
    }
  },
  methods: {
    async signUp() {
      this.$refs.signUpForm.validate();
      if (this.signUpFormValid) {
        const success = await this.$store.dispatch("auth/createUser", {
          email: this.email,
          password: this.password,
          response: this.recaptchaResponse
        });

        if (success) {
          this.$router.replace("/login");
        }
      }
    }
  },
  mounted() {
    if (this.authUser) {
      this.$router.replace("/");
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("clearError");
    next();
  }
};
</script>

<style lang="scss" scoped>
.v-progress-linear {
  margin: 0;
}
</style>
