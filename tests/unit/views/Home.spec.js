import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Home from "@/views/Home.vue";
import { languages } from "@/store/modules/layout.js";
import { mockCustomElements } from "@tests/unit/__mocks__/custom-elements.js";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("@/views/Home.vue", () => {
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
