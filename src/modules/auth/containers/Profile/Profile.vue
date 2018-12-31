<template>
  <v-layout column>
    <my-header>{{ $t.greeting }}</my-header>
    <v-layout
      row
      align-center
      justify-center
    >
      <v-flex
        v-if="!profile"
        xs12
        sm8
        md6
      >
        <p class="text-xs-center">{{ $t.loadingProfile }}</p>
      </v-flex>
      <v-flex
        v-else
        xs12
        sm8
        md5
      >
        <transition
          name="fade"
          mode="out-in"
        >
          <v-layout
            v-if="!editMode"
            key="profile-display"
            column
            justify-center
          >
            <v-card class="elevation-1">
              <v-list>
                <v-list-tile avatar>
                  <v-list-tile-avatar>
                    <img
                      :src="profile.avatar"
                      alt="big avatar"
                    >
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ profile.fullname }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ authUser.email }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-btn
                      outline
                      @click="editMode = true"
                    >{{ $t.edit }}</v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </v-card>
            <v-card class="mt-3">
              <v-list two-line>
                <v-list-tile>
                  <v-list-tile-content>hi</v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-layout>
          <ProfileEdit
            v-if="editMode"
            key="profile-edit"
            @back="back()"
          />
        </transition>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
import ProfileEdit from "./ProfileEdit.vue";

const LANGUAGES_MAP = {
  greeting: { vi: "Xin chào, bạn phẻ hok?", en: "Hi, how are you today?" },
  loadingProfile: {
    vi: "Đang tải thông tin tài khoản",
    en: "Loading profile information"
  },
  edit: { vi: "Chỉnh sửa", en: "Edit" },
  permissions: { vi: "Quyền hạn", en: "Permissions" }
};

export default {
  name: "Profile",
  components: {
    ProfileEdit
  },
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
      loading: "auth/loading"
    }),
    $t() {
      return this.$translate(LANGUAGES_MAP, this.language.value);
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
