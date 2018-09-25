import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import App from "@/App.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("@/App.vue", () => {
  let store;
  let state;
  let getters;
  let actions;
  let mutations;
  let wrapper;

  beforeEach(() => {
    state = { inited: false, isLoggedIn: false };
    getters = {
      "auth/inited": jest.fn(state => state.inited),
      "auth/isLoggedIn": jest.fn(state => state.isLoggedIn)
    };
    actions = { "auth/init": jest.fn() };
    mutations = { inited: jest.fn(state => (state.inited = true)) };
    store = new Vuex.Store({ state, getters, actions, mutations });
  });

  it("dispatches [auth/init] when created", () => {
    const wrapper = shallowMount(App, {
      stubs: ["router-view"],
      store,
      localVue
    });
    expect(actions["auth/init"]).toHaveBeenCalled();
  });
  it("renders loading accordingly", () => {
    const wrapper = shallowMount(App, {
      stubs: ["router-view"],
      store,
      localVue
    });
    let loadingEl;
    loadingEl = wrapper.find("#loading");
    expect(loadingEl.exists()).toBe(true);
    store.commit("inited");
    loadingEl = wrapper.find("#loading");
    expect(loadingEl.exists()).toBe(false);
  });
});
