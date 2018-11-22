import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Translation from "@/plugins/translation.js";
import Home from "./Home.vue";
import { languages } from "@/modules/core/layout.models.js";
import { mockCustomElements } from "@/__mocks__/custom-elements.js";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Translation);

describe("Home.vue", () => {
  let state;
  let getters;
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
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
  });
  it("matchs snapshot", () => {
    expect(wrapper).toBeDefined();
  });
});
