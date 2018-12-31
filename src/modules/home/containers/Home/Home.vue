<template>
  <div>
    <section id="home-header">
      <h1 class="display-1 primary--text">{{ $t.greeting }}</h1>
      <p>
        {{ $t.hello }}
        <span
          class="font-weight-bold secondary--text"
        >{{ $t.name }}</span>
      </p>
      <p>{{ $t.greetingText }}</p>
    </section>
    <section id="home-playgrounds">
      <h2 class="headline primary--text mb-3">{{ $t.skillLevel }}</h2>
      <div
        v-for="skill in skills"
        :key="'skill-' + skill.title"
        class="mb-3"
      >
        <div class="title secondary--text mb-3">
          <router-link :to="skill.route">{{ skill.title }}</router-link>
        </div>
        <v-rating
          readonly
          :value="skill.level"
          color="primary"
        ></v-rating>
        <div v-if="skill.interests.length > 0">
          <p class="subheading">{{ $t.fieldsOfInterest }}</p>
          <ul>
            <li
              v-for="interest in skill.interests"
              :key="'interest-' + interest.name"
            >
              {{ interest.name }}
              <v-icon
                small
                @click="open(interest.link, true)"
              >open_in_new</v-icon>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { LANGUAGES_MAP } from "./languages.js";

export default {
  name: "Home",
  computed: {
    ...mapGetters({
      language: "layout/language",
      authUser: "auth/authUser"
    }),
    $t() {
      return this.$translate(LANGUAGES_MAP, this.language.value);
    },
    skills() {
      return [
        {
          title: this.$t.vue,
          route: "/playground/vue",
          level: 5,
          interests: [
            {
              name: this.$t.vueNuxt,
              link: "https://nuxtjs.org/"
            },
            {
              name: this.$t.vueTypescript,
              link: "https://vuejs.org/v2/guide/typescript.html"
            }
          ]
        },
        {
          title: this.$t.firebase,
          route: "/playground/firebase",
          level: 5,
          interests: [
            {
              name: "Firebase ML Kit",
              link: "https://firebase.google.com/products/ml-kit/"
            }
          ]
        },
        {
          title: this.$t.angular6,
          route: "/playground/angular",
          level: 5,
          interests: [
            { name: this.$t.angular6Nwrl, link: "https://nrwl.io/nx" }
          ]
        },
        {
          title: this.$t.react,
          route: "/playground/react",
          level: 4,
          interests: [
            {
              name: this.$t.reactHooks,
              link: "https://reactjs.org/docs/hooks-intro.html"
            }
          ]
        }
      ];
    }
  },
  methods: {
    open(link, external) {
      window.open(link, external ? "_blank" : "");
    }
  }
};
</script>

<style lang="scss" scoped>
section > * {
  text-align: justify;
}
a {
  color: inherit;
}
</style>
