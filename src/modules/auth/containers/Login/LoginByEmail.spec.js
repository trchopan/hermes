import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Translate from "@/plugins/translate.js";
import LoginByEmail from "./LoginByEmail.vue";
import { mockCustomElements } from "@/__mocks__/custom-elements.js";
import { languages } from "@/modules/core/layout.models.js";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Translate);

describe("LoginByEmail.vue", () => {
  let store;
  let getters;
  let actions;
  let wrapper;

  beforeEach(() => {
    getters = {
      "layout/language": () => languages.en,
      "auth/loading": () => ({ login: false }),
      error: () => []
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
    wrapper = shallowMount(LoginByEmail, {
      stubs: mockCustomElements,
      mocks: { $router: { replace: jest.fn() } },
      store,
      localVue
    });
  });

  it("submits", async () => {
    wrapper.vm.email = "test@test.com";
    wrapper.vm.password = "password";

    await wrapper.vm.onSubmit(); // auth/loginWithEmailPassword resolve false
    expect(actions["auth/loginWithEmailPassword"].mock.calls[0][1]).toEqual({
      email: wrapper.vm.email,
      password: wrapper.vm.password
    });

    expect(wrapper.vm.$router.replace).not.toBeCalled();
    await wrapper.vm.onSubmit(); // auth/loginWithEmailPassword resolve true
    expect(wrapper.vm.$router.replace.mock.calls).toEqual([["/"]]);
  });

  it("matchs snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
