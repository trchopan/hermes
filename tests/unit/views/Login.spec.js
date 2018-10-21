import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Login from "@/views/Login.vue";
import { mockVuetifyComponents } from "@/__mocks__/vuetify";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("views/Login.vue", () => {
  let store;
  let getters;

  beforeEach(() => {
    getters = {
      "auth/error": () => null
    };
    store = new Vuex.Store({
      getters
    });
  });
  it("matchs snapshot", () => {
    let wrapper = shallowMount(Login, {
      stubs: ["router-view", ...mockVuetifyComponents],
      store,
      localVue
    });
    expect(wrapper).toBeDefined();
  });
});
