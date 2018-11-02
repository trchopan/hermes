import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Login from "@/views/Login.vue";
import { mockCustomElements } from "@tests/unit/__mocks__/custom-elements.js";
import { languagesMap } from "@/languages";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("views/Login.vue", () => {
  let store;
  let getters;
  let actions;
  let wrapper;

  beforeEach(() => {
    getters = {
      "layout/$t": () => languagesMap.en,
      "auth/error": () => null,
      "auth/loading": () => false
    };
    actions = {
      "auth/loginWithEmailPassword": jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve(false))
        .mockImplementationOnce(() => Promise.resolve(true))
    };
    store = new Vuex.Store({
      getters,
      actions
    });
    wrapper = shallowMount(Login, {
      stubs: mockCustomElements,
      mocks: { $router: { replace: jest.fn() } },
      store,
      localVue
    });
  });
  it("has all the tools", () => {
    expect(wrapper.vm.email).toBeDefined();
    expect(wrapper.vm.password).toBeDefined();
    expect(wrapper.vm.onSubmit).toBeDefined();
  });
  it("submits and handle error", async () => {
    wrapper.vm.email = "test@test.com";

    wrapper.vm.password = "wrong password";
    await wrapper.vm.onSubmit();
    expect(wrapper.vm.$router.replace).not.toBeCalled();
    expect(actions["auth/loginWithEmailPassword"].mock.calls[0][1]).toEqual({
      email: "test@test.com",
      password: "wrong password"
    });

    wrapper.vm.password = "correct password";
    await wrapper.vm.onSubmit();
    expect(actions["auth/loginWithEmailPassword"].mock.calls[1][1]).toEqual({
      email: "test@test.com",
      password: "correct password"
    });
    expect(wrapper.vm.$router.replace.mock.calls).toEqual([["/"]]);
  });
  it("matchs snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
