<template>
  <v-card class="elevation-6 pt-3 px-3 text-xs-center">
    <v-form
      v-model="profileEditFormValid"
      @submit.prevent="updateProfile()"
    >
      <v-avatar size="80">
        <img
          :src="avatar"
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
        <!-- <template v-if="!prestine">
          <v-icon
            class="mr-1"
            color="success"
          >{{ loading.profile ? 'hourglass_empty' : 'check_circle_outline' }}</v-icon>
          <span class="mr-2">{{ loading.profile ? $t.loading : $t.saved }}</span>
        </template>-->
        <v-btn
          color="primary"
          type="submit"
          :disabled="loading.profile || prestine"
        >{{ $t.save }}</v-btn>
        <v-btn
          outline
          color="primary"
          type="button"
          :disabled="loading.profile"
          @click="$emit('back')"
        >{{ $t.back }}</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { debounce } from "@/helpers";

const LANGUAGES_MAP = {
  fullname: { vi: "Họ tên", en: "Fullname" },
  avatar: { vi: "Avatar", en: "Avatar" },
  save: { vi: "Lưu", en: "Save" },
  back: { vi: "Quay lại", en: "Back" },
  loading: { vi: "Đang lưu", en: "Saving " },
  saved: { vi: "Đã lưu", en: "Saved" }
};

export default {
  name: "ProfileEdit",
  data: () => ({
    profileEditFormValid: false,
    prestine: true,
    _fullname: "",
    _avatar: ""
  }),
  computed: {
    ...mapGetters({
      error: "error",
      language: "language",
      loading: "auth/loading",
      profile: "auth/profile"
    }),
    $t() {
      return this.$translate(LANGUAGES_MAP, this.language.value);
    },
    fullname: {
      get: function() {
        return this.profile.fullname;
      },
      set: debounce(function(value) {
        if (value !== this.profile.fullname) {
          this.prestine = false;
          this._fullname = value;
        }
      }, 200)
    },
    avatar: {
      get: function() {
        return this._avatar || this.profile.avatar;
      },
      set: debounce(function(value) {
        if (value !== this.profile.avatar) {
          this.prestine = false;
          this._avatar = value;
        }
      }, 200)
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
  },
  methods: {
    updateProfile() {
      if (this._avatar) {
        this.$store.dispatch("auth/updateProfile", { avatar: this._avatar });
      }

      if (this._fullname) {
        this.$store.dispatch("auth/updateProfile", {
          fullname: this._fullname
        });
      }
    }
  }
};
</script>
