<template>
  <v-layout column>
    <v-layout row :wrap="true" align-center justify-center>
      <v-flex xs12 sm6 md4>
        <v-card
          key="profile-edit"
          class="elevation-6 pt-3 px-3 text-xs-center"
          v-model="formValid"
        >
          <v-avatar size="80">
            <img :src="avatar" alt="big avatar">
          </v-avatar>
          <v-form>
            <v-text-field
              id="fullname"
              prepend-icon="person"
              label="Email"
              type="text"
              v-model="email"
              required
            />
            <v-text-field
              id="avatar"
              prepend-icon="lock"
              :label="$t.password"
              type="password"
              v-model="password"
              required
            />
            <v-card-actions>
              <v-spacer/>
              <v-btn
                outline
                color="secondary"
                type="button"
                :disabled="loading"
                @click="signUp()"
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

const languagesMap = {
  password: { vi: "Mật khẩu", en: "Password" },
  signUp: { vi: "Đăng ký", en: "Sign Up" }
};

export default {
  name: "Login",
  data() {
    return {
      formValid: false,
      avatar: "",
      email: "",
      password: ""
    };
  },
  computed: {
    ...mapGetters({
      error: "auth/error",
      loading: "auth/loading",
      language: "layout/language"
    }),
    $t() {
      return this.$translate(languagesMap, this.language.code);
    }
  },
  methods: {
    async signUp() {
      console.log("Sign up woot");
    }
  }
};
</script>

<style lang="scss" scoped>
.v-progress-linear {
  margin: 0;
}
</style>
