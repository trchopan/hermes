<template>
  <div id="initial-loading">
    <img src="/images/bloody-smile.jpg" alt="initializing image" />
    <p class="mt-3 title">...{{ $t.greeting }}</p>
  </div>  
</template>

<script>
import { mapGetters } from "vuex";

const languagesMap = {
  greeting: {
    vi: "Cười phát sống thêm ít phút nào",
    en: "Let's put a smile on that face"
  }
};

export default {
  name: "InitMessage",
  computed: {
    ...mapGetters({
      language: "layout/language"
    }),
    $t: this.$helpers.translate(languagesMap, this.language.code)
  }
};
</script>


<style lang="scss" scoped>
#initial-loading {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 6rem;
    height: auto;
    border-radius: 50%;
  }
}
</style>
