<template>
  <v-layout
    align-center
    justify-center
  >
    <v-flex
      xs12
      sm6
      md4
    >
      <transition
        name="fade"
        mode="out-in"
      >
        <v-card
          v-if="!confirmationResult"
          key="phone-number"
          class="elevation-12"
        >
          <v-form>
            <v-card-text>
              <p>{{ $t.descriptionPhoneNumber }}</p>
              <v-select
                outline
                :value="selectedCountry"
                :items="phoneCountries"
                :label="$t.selectCountry"
              ></v-select>
              <v-text-field
                autofocus
                outline
                required
                prepend-inner-icon="phone"
                name="phone"
                mask="(###) ### - #####"
                :label="$t.phoneNumber"
                type="tel"
                v-model="phoneNumber"
              />
              <p v-show="errorMessage">{{ errorMessage }}</p>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                id="submit"
                color="primary"
                type="submit"
                :disabled="loading.login"
                @click.prevent="onNext()"
              >{{ $t.next }}</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
        <v-card
          v-if="confirmationResult"
          key="phone-confirmation-result"
        >
          <v-form>
            <v-card-text>
              <p>{{ $format($t.descriptionConfirmationResult, [phoneNumber]) }}</p>
              <v-text-field
                autofocus
                outline
                required
                prepend-inner-icon="lock"
                name="lock"
                mask="######"
                :label="$t.confirmationCode"
                type="phone"
                v-model="confirmationCode"
              />
              <p v-show="errorMessage">{{ errorMessage }}</p>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                id="confirm-code"
                color="primary"
                type="submit"
                :disabled="loading.login"
                @click.prevent="onConfirmCode()"
              >{{ $t.verify }}</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </transition>
    </v-flex>
    <div id="recaptcha-container"></div>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
import { fireAuth, ReCaptchaVerifier } from "@/firebase.js";
import { phoneCountries } from "@/modules/auth/auth.models.js";

const LANGUAGES_MAP = {
  descriptionPhoneNumber: {
    vi:
      "Bạn sẽ nhận tin nhắn SMS vào số điện thoại cung cấp ở trên. Bạn vui lòng điền số này mã xác thực ở cửa sổ tiếp theo.",
    en:
      "You will receive a SMS text message to the phone number provied. Please enter this code in to the confirmation in the next state."
  },
  descriptionConfirmationResult: {
    vi:
      "Tin nhắn mã xác nhận đã được gởi vào số điện thoại {0}. Bạn vui lòng điền mã bên dưới",
    en:
      "A confirmation code has been sent to your number {0}. Please enter the code below."
  },
  selectCountry: { vi: "Chọn mã vùng", en: "Select country" },
  phoneNumber: { vi: "Số điện thoại", en: "Phone number" },
  confirmationCode: { vi: "Mã xác nhận", en: "Confirmation code" },
  next: { vi: "Tiếp tục", en: "Next" },
  verify: { vi: "Xác nhận", en: "Verify" },
  invalidPhone: { vi: "Số điện thoại không hợp lệ", en: "Invalid Phone Number" }
};

export default {
  name: "LoginByPhone",
  data() {
    return {
      recaptcha: null,
      confirmationResult: null,
      phoneCountries: Object.values(phoneCountries),
      selectedCountry: phoneCountries.vn,
      confirmationCode: "",
      phoneNumber: ""
    };
  },
  computed: {
    ...mapGetters({
      error: "error",
      authUser: "auth/authUser",
      loading: "auth/loading",
      language: "language"
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
        default:
          return this.$t.unknownError;
      }
    }
  },
  methods: {
    async onNext() {
      const phoneNumber =
        this.selectedCountry.value + this.phoneNumber.replace(/^0/, "");
      try {
        this.confirmationResult = await fireAuth.signInWithPhoneNumber(
          phoneNumber,
          this.recaptcha
        );
        console.log(this.confirmationResult);
      } catch (error) {
        console.log("ERROR", error);
      }
    },
    async onConfirmCode() {
      if (!this.confirmationCode) {
        console.log("woot no code?", this.confirmationCode);
        return;
      }
      const user = await this.confirmationResult.confirm(this.confirmationCode);
      if (!user) {
        console.log("naniii no user");
      }
    }
  },
  mounted() {
    this.recaptcha = new ReCaptchaVerifier("recaptcha-container", {
      size: "invisible",
      callback: res => {
        console.log("woot", res);
      }
    });
  }
};
</script>

<style lang="scss" scoped>
#recaptcha-container {
  display: none;
}
</style>
