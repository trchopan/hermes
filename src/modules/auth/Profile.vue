<template>
  <v-layout column>
    <my-header>{{ $t.greeting }}</my-header>
    <v-layout row align-center justify-center>
      <v-flex v-if="!profile" xs12 sm8 md6>
        <p class="text-xs-center">{{ $t.profileIsBeingCreated }}</p>
      </v-flex>
      <v-flex v-else xs12 sm8 md5>
        <transition name="fade" mode="out-in">
          <v-card v-if="!editMode" key="profile-display" class="elevation-1">
            <v-list>
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <img :src="profile.avatar" alt="big avatar">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ profile.fullname }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ authUser.email }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn outline @click="editMode = true">{{ $t.edit }}</v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-card>
          <v-card
            v-if="editMode"
            key="profile-edit"
            class="elevation-6 pt-3 px-3 text-xs-center"
          >
            <v-avatar size="80">
              <img :src="profile.avatar" alt="big avatar">
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
                @click="back()"
              >{{ $t.back }}</v-btn>
            </v-card-actions>
          </v-card>
        </transition>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
import { debounce } from "@/helpers";

const languagesMap = {
  greeting: { vi: "Xin chào, bạn phẻ hok?", en: "Hi, how are you today?" },
  profileIsBeingCreated: {
    vi: "Tài khoản của bạn đang được tạo",
    en: "Your profile is being created"
  },
  edit: { vi: "Chỉnh sửa", en: "Edit" },
  fullname: { vi: "Họ tên", en: "Fullname" },
  avatar: { vi: "Avatar", en: "Avatar" },
  back: { vi: "Quay lại", en: "Back" },
  loading: { vi: "Đang lưu", en: "Saving " },
  saved: { vi: "Đã lưu", en: "Saved" }
};

export default {
  name: "Profile",
  data: () => ({
    defaultAvatar: process.env.VUE_APP_DEFAULT_AVATAR,
    editMode: false,
    prestine: true
  }),
  computed: {
    ...mapGetters({
      language: "layout/language",
      authUser: "auth/authUser",
      profile: "auth/profile",
      loading: "auth/loading",
      error: "auth/error"
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
    }
  },
  methods: {
    back() {
      this.editMode = false;
      this.prestine = true;
    }
  }
};
</script>
