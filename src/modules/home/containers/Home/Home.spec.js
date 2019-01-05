import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Translate from "@/plugins/translate.js";
import Home from "./Home.vue";
import { languages } from "@/modules/core/root.models.js";
import { mockCustomElements } from "@/__mocks__/custom-elements.js";
import { fakeAuthUser } from "@/__mocks__/firebase.mocks.js";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Translate);

describe("Home.vue", () => {
  let getters;
  let store;
  let wrapper;

  it("matchs snapshot", () => {
    getters = {
      "auth/authUser": () => fakeAuthUser,
      "language": () => languages.en
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
