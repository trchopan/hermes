<template>
  <div id="initial-loading">
    <img src="/images/bloody-smile.jpg" alt="initializing image" />
    <p class="mt-3 title">...{{ $t.init.greeting }}</p>
  </div>  
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "InitMessage",
  computed: mapGetters({ $t: "layout/$t" })
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
