<template>
  <div>
    <my-header>{{ $t.dashboard.header }}</my-header>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters({
      $t: "layout/$t"
    })
  }
};
</script>
