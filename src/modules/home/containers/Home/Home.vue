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
      <v-layout
        row
        wrap
      >
        <v-flex
          v-for="skill in skills"
          xs12
          sm6
          md4
          :key="'skill-' + skill.title"
          class="mb-3 pl-3"
        >
          <div class="title secondary--text mb-3">
            <router-link :to="skill.route">{{ skill.title }}</router-link>
          </div>
          <v-rating
            readonly
            color="primary"
            :value="skill.level"
          ></v-rating>
          <div v-if="skill.interests.length > 0">
            <p class="subheading mt-2 mb-1">{{ $t.fieldsOfInterest }}</p>
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
        </v-flex>
      </v-layout>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { LANGUAGES_MAP } from "./Home.languages.js";

export default {
  name: "Home",
  beforeRouteEnter(to, from, next) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    next();
  },
  computed: {
    ...mapGetters({
      language: "language",
      authUser: "auth/authUser"
    }),
    $t() {
      return this.$translate(LANGUAGES_MAP, this.language.value);
    },
    skills: () => [
      {
        title: "Vue",
        route: "/playground/vue",
        level: 5,
        interests: [
          {
            name: "Nuxt - Universal Application",
            link: "https://nuxtjs.org/"
          },
          {
            name: "Vue Typescript",
            link: "https://vuejs.org/v2/guide/typescript.html"
          }
        ]
      },
      {
        title: "Firebase",
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
        title: "Angular 6",
        route: "/playground/angular",
        level: 5,
        interests: [{ name: "Nrwl's Nx", link: "https://nrwl.io/nx" }]
      },
      {
        title: "React",
        route: "/playground/react",
        level: 4,
        interests: [
          {
            name: "React's Hooks",
            link: "https://reactjs.org/docs/hooks-intro.html"
          }
        ]
      },
      {
        title: "Machine Learning",
        route: "/playground/machine",
        level: 2,
        interests: [
          {
            name: "Tensorflow",
            link: "https://www.tensorflow.org"
          }
        ]
      },
      {
        title: "Python",
        route: "/playground/python",
        level: 2,
        interests: []
      }
    ]
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
