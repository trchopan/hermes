<template>
  <v-card class="elevation-6 pt-3 px-3 text-xs-center">
    <v-text-field
      id="secret"
      prepend-icon="lock"
      :label="$t.secret"
      type="password"
      v-model="secret"
      required
    />
    <v-select
      id="accountType"
      prepend-icon="people"
      :label="$t.accountType"
      outlie
      v-model="accountType"
      :items="accountTypes"
      required
    />
    <span class="warn--text">{{ lastError }}</span>
    <v-card-actions>
      <v-spacer/>
      <v-btn
        outline
        color="primary"
        type="button"
        @click="makeKing()"
      >{{ $t.submit }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

const LANGUAGES_MAP = {
  secret: { vi: "Bí sờ mật", en: "Secret shhhh" },
  accountType: { vi: "Loại tài khoản", en: "Account Type" },
  submit: { vi: "Ô sờ kê", en: "OK" }
};

export default {
  name: "MakeMeKing",
  data() {
    return {
      secret: "",
      accountType: {},
      accountTypes: [
        { text: "Admin", value: "admin" },
        { text: "Manager", value: "manager" },
        { text: "Worker", value: "worker" },
        { text: "Customer", value: "customer" }
      ]
    };
  },
  computed: {
    ...mapGetters({
      error: "error",
      language: "layout/language",
      authUser: "auth/authUser"
    }),
    $t() {
      return this.$translate(LANGUAGES_MAP, this.language.value);
    },
    lastError() {
      const lastError = this.error[this.error.length - 1] || null;
      if (!lastError) {
        return "";
      }
      switch (lastError.code) {
        case "auth/require-captch":
          return this.$t.requireCaptcha;
        default:
          return this.$t.unknownError;
      }
    }
  },
  methods: {
    async makeKing() {
      console.log("woot", this.secret, this.accountType);
      if (!this.secret || !this.accountType) {
        return;
      }
      this.$store.dispatch("user/makeKing", {
        secret: this.secret,
        role: this.accountType,
        email: this.authUser.email
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.v-progress-linear {
  margin: 0;
}
</style>
