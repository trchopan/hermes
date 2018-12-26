<template>
  <div
    id="recaptcha-container"
    ref="recaptcha-container"
  ></div>
</template>

<script>
import { firebaseApp, ReCaptchaVerifier } from "@/firebase.js";

export default {
  name: "Recaptcha",
  async mounted() {
    const recaptcha = new ReCaptchaVerifier("recaptcha-container");
    await recaptcha.render();
    const token = await recaptcha.verify();
    this.$emit("response", token);
  }
};
</script>

<style lang="scss">
#recaptcha-container {
  width: 100%;
}
#recaptcha-container > div > div {
  margin: auto;
}
#recaptcha-container > div > div > div > iframe {
  transform: scale(0.8);
  @media (max-width: 375px) {
    transform: scale(0.7);
  }
}
</style>
