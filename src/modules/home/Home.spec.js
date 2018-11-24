import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Translation from "@/plugins/translation.js";
import Home from "./Home.vue";
import { languages } from "@/modules/core/layout.models.js";
import { mockCustomElements } from "@/__mocks__/custom-elements.js";
import { fakeAuthUser } from "@/__mocks__/firebase-results";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Translation);

describe("Home.vue", () => {
  let getters;
  let store;
  let wrapper;

  it("matchs snapshot", () => {
    getters = {
      "auth/authUser": () => fakeAuthUser,
      "layout/language": () => languages.en
    };
    store = new Vuex.Store({
      getters
    });
    wrapper = shallowMount(Home, {
      stubs: mockCustomElements,
      store,
      localVue
    });
    expect(wrapper).toMatchSnapshot();

    getters = {
      ...getters,
      "auth/authUser": () => null
    };
    store = new Vuex.Store({
      getters
    });
    wrapper = shallowMount(Home, {
      stubs: mockCustomElements,
      store,
      localVue
    });
    expect(wrapper).toMatchSnapshot();
  });
});
