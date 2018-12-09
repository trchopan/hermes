<template>
  <v-card class="elevation-6 pt-3 px-3 text-xs-center">
    <v-avatar size="80">
      <img
        :src="profile.avatar"
        alt="big avatar"
      >
    </v-avatar>
    <v-text-field
      id="fullname"
      prepend-icon="person"
      :label="$t.fullname"
      type="text"
      v-model="fullname"
      required
    />
    <v-text-field
      id="avatar"
      prepend-icon="lock"
      :label="$t.avatar"
      type="text"
      v-model="avatar"
      required
    />
    <span class="warn--text">{{ profileError }}</span>
    <v-card-actions>
      <v-spacer/>
      <template v-if="!prestine">
        <v-icon
          class="mr-1"
          color="success"
        >{{ loading.profile ? 'hourglass_empty' : 'check_circle_outline' }}</v-icon>
        <span class="mr-2">{{ loading.profile ? $t.loading : $t.saved }}</span>
      </template>
      <v-btn
        outline
        color="primary"
        type="button"
        :disabled="loading.profile"
        @click="$emit('back')"
      >{{ $t.back }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { debounce } from "@/helpers";

const languagesMap = {
  fullname: { vi: "Họ tên", en: "Fullname" },
  avatar: { vi: "Avatar", en: "Avatar" },
  back: { vi: "Quay lại", en: "Back" },
  loading: { vi: "Đang lưu", en: "Saving " },
  saved: { vi: "Đã lưu", en: "Saved" }
};

export default {
  name: "ProfileForm",
  data: () => ({
    prestine: true
  }),
  computed: {
    ...mapGetters({
      error: "error",
      language: "layout/language",
      loading: "auth/loading",
      profile: "auth/profile"
    }),
    $t() {
      return this.$translate(languagesMap, this.language.value);
    },
    fullname: {
      get: function() {
        return this.profile.fullname;
      },
      set: debounce(function(value) {
        if (value !== this.profile.fullname) {
          this.prestine = false;
          this.$store.dispatch("auth/updateProfile", { fullname: value });
        }
      }, 500)
    },
    avatar: {
      get: function() {
        return this.profile.avatar;
      },
      set: debounce(function(value) {
        if (value !== this.profile.avatar) {
          this.prestine = false;
          this.$store.dispatch("auth/updateProfile", { avatar: value });
        }
      }, 500)
    },
    profileError() {
      const lastError = this.error[this.error.length - 1] || null;
      if (!lastError) {
        return "";
      }
      switch (lastError.code) {
        default:
          return this.$t.unknownError;
      }
    }
  }
};
</script>
