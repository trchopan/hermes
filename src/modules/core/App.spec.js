import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import App from "./App.vue";
import Translate from "@/plugins/translate.js";
import { helpers } from "@/helpers.js";
import { mockCustomElements } from "@/__mocks__/custom-elements.js";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Translate);

describe("App.vue", () => {
  let store;
  let state;
  let getters;
  let actions;
  let wrapper;

  beforeEach(() => {
    state = {
      loading: false,
      profile: null
    };
    getters = {
      "darkTheme": () => true,
      "auth/loading": state => state.loading,
      "auth/profile": state => state.profile
    };
    actions = {
      "initLocalStorage": jest.fn(),
      "toggleDrawer": jest.fn()
    };
    store = new Vuex.Store({
      state,
      getters,
      actions
    });
    wrapper = shallowMount(App, {
      stubs: mockCustomElements,
      mocks: { $vuetify: { breakpoint: { lgAndUp: true } }, $helpers: helpers },
      store,
      localVue
    });
  });
  it("initializes", () => {
    expect(actions["initLocalStorage"]).toBeCalled();
    expect(actions["toggleDrawer"]).toBeCalled();
  });
  it("matchs snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
