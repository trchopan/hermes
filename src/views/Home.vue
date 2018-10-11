<template>
  <div class="home">
    <p>Xin chào quản lý, phẻ hok?</p>
  </div>
</template>

<script>
export default {
  name: "home",
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    }
  }
};
</script>
