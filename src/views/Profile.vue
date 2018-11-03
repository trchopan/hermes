<template>
  <v-layout column>
    <my-header>{{ $t.greeting }}</my-header>
    <v-layout row wrap align-center justify-center>
      <v-flex xs12 sm6 md4>
        <v-list v-if="profile && !editMode" class="elevation-1">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img :src="profile.avatar" alt="big avatar">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ profile.fullname }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ profile.position | titleCase }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn
                outline
                @click="editMode = true">
                {{ $t.edit }}
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <v-card class="elevation-6 pt-3 px-3 text-xs-center" v-if="profile && editMode">
          <v-avatar size="80">
            <img :src="profile.avatar" alt="big avatar">
          </v-avatar>
          <v-text-field
            id="fullname"
            prepend-icon="person"
            name="fullname"
            :label="$t.fullname"
            type="text"
            :error-messages="error ? error.message : ''"
            v-model="fullname" />
          <v-text-field
            id="avatar"
            prepend-icon="lock"
            name="avatar"
            :label="$t.avatar"
            type="text"
            v-model="avatar" />
          <v-card-actions>
            <v-spacer />
            <v-icon class="mr-3" color="success">
              {{ loading ? 'hourglass_empty' : 'check_circle_outline' }}
            </v-icon>
            <v-btn
              color="primary"
              type="button"
              :disabled="loading"
              @click="editMode = false">
              {{ $t.back }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
import { debounce } from "@/helpers";
import { translate } from "@/store/modules/layout";

const languagesMap = {
  greeting: { vi: "Xin chào, bạn phẻ hok?", en: "Hi, how are you today?" },
  edit: { vi: "Chỉnh sửa", en: "Edit" },
  fullname: { vi: "Họ tên", en: "Fullname" },
  avatar: { vi: "Avatar", en: "Avatar" },
  back: { vi: "Quay lại", en: "Back" }
};

export default {
  name: "Profile",
  data: () => ({
    editMode: false
  }),
  computed: {
    ...mapGetters({
      language: "layout/language",
      profile: "auth/profile",
      loading: "auth/loading",
      error: "auth/error"
    }),
    $t() {
      return translate(languagesMap, this.language.code);
    },
    fullname: {
      get: function() {
        return this.profile.fullname;
      },
      set: debounce(function(value) {
        if (value !== this.profile.fullname) {
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
          this.$store.dispatch("auth/updateProfile", { avatar: value });
        }
      }, 500)
    }
  }
};
</script>
