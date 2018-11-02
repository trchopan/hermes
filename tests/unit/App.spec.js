import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import App from "@/App.vue";
import { mockCustomElements } from "@tests/unit/__mocks__/custom-elements.js";
import { docData } from "@tests/unit/__mocks__/firebase-results.js"

const localVue = createLocalVue();
localVue.use(Vuex);

describe("@/App.vue", () => {
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
      "layout/darkTheme": () => true,
      "auth/loading": state => state.loading,
      "auth/profile": state => state.profile
    };
    actions = {
      "layout/initLocalStorage": jest.fn(),
      "layout/toggleDrawer": jest.fn()
    };
    store = new Vuex.Store({
      state,
      getters,
      actions
    });
    wrapper = shallowMount(App, {
      stubs: mockCustomElements,
      mocks: { $vuetify: { breakpoint: { lgAndUp: true } } },
      store,
      localVue
    });
  });
  it("initializes", () => {
    expect(actions["layout/initLocalStorage"]).toBeCalled();
    expect(actions["layout/toggleDrawer"]).toBeCalled();
  });
  it("renders InitMessage correctly", () => {
    let initPage;
    state.loading = true;
    state.profile = null;
    initPage = wrapper.find("initmessage-stub");
    expect(initPage.exists()).toBe(true);
    state.loading = true;
    state.profile = docData;
    initPage = wrapper.find("initmessage-stub");
    expect(initPage.exists()).toBe(false);
  });
  it("matchs snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
