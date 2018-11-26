<template>
  <div id="recaptcha-container" ref="recaptcha-container"></div>
</template>

<script>
export default {
  name: "Recaptcha",
  mounted() {
    if (
      window.hasOwnProperty("grecaptcha") &&
      window.grecaptcha.hasOwnProperty("render")
    ) {
      window.grecaptcha.render("recaptcha-container", {
        sitekey: process.env.VUE_APP_RECAPTCHA_KEY,
        callback: response => {
          this.$emit("response", response);
        }
      });
    } else {
      this.$refs["recaptcha-container"].innerHTML =
        "Unable to load reCaptcha script";
    }
  }
};
</script>

<style lang="scss">
#recaptcha-container {
  width: 100%;
}
#recaptcha-container > div {
  margin: auto;
}
#recaptcha-container > div > div > iframe {
  transform: scale(0.8);
  @media (max-width: 375px) {
    transform: scale(0.7);
  }
}
</style>
