<template>
  <v-layout column>
    <v-layout row :wrap="true" align-center justify-center>
      <v-flex xs12 sm6 md4>
        <v-card key="profile-edit" class="elevation-6 pt-3 px-3 text-xs-center">
          <v-form v-model="signUpFormValid" @submit.prevent="signUp()">
            <v-text-field
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
              v-if="requireCaptcha"
            >{{ $t.verifyCaptcha }}</span>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                outline
                color="secondary"
                type="submit"
                :disabled="loading"
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
import { format, validateEmail } from "@/helpers.js";
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
  verifyCaptcha: {
    vi: "Vui lòng xác thực captcha",
    en: "Please verify captcha"
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
      recaptchaResponse: "",
      requireCaptcha: false,
      formError: "",
      emailRules: [v => validateEmail(v) || this.$t.invalidEmail],
      passwordRequiredLength: 6,
      passwordRules: [
        v =>
          v.length >= this.passwordRequiredLength ||
          format(this.$t.passwordGreaterThan, [this.passwordRequiredLength])
      ],
      passwordConfirmRules: [
        v => v === this.password || this.$t.passwordNotMatch
      ]
    };
  },
  computed: {
    ...mapGetters({
      error: "auth/error",
      loading: "auth/loading",
      language: "layout/language",
      darkTheme: "layout/darkTheme"
    }),
    $t() {
      return this.$translate(languagesMap, this.language.value);
    }
  },
  methods: {
    async signUp() {
      if (!this.recaptchaResponse) {
        this.requireCaptcha = true;
        return;
      }
      if (this.signUpFormValid && this.recaptchaResponse) {
        const result = await this.$store.dispatch("auth/createUser", {
          email: this.email,
          password: this.password,
          response: this.recaptchaResponse
        });
        console.log("result", result);
        // try {
        //   let result = await axios.post(
        //     process.env.VUE_APP_API + "/user/create",
        //     {
        //       email: this.email,
        //       password: this.password,
        //       response: this.recaptchaResponse
        //     }
        //   );
        //   console.log("result", result);
        // } catch (error) {
        //   console.log("error", error.response.status, error.response.data);
        // }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.v-progress-linear {
  margin: 0;
}
</style>
