import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Translation from "@/plugins/translation.js";
import SignUp from "./SignUp.vue";
import { mockCustomElements } from "@/__mocks__/custom-elements.js";
import { languages } from "@/modules/core/layout.models.js";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Translation);

describe("SignUp.vue", () => {
  let store;
  let getters;
  let actions;
  let wrapper;

  beforeEach(() => {
    getters = {
      error: () => [],
      "layout/language": () => languages.en,
      "auth/authUser": () => null,
      "auth/loading": () => ({ create: false })
    };
    actions = {
      "auth/createUser": jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve(false))
        .mockImplementationOnce(() => Promise.resolve(true))
    };
    store = new Vuex.Store({
      getters,
      actions
    });
    let stubs = {};
    mockCustomElements.forEach(x => {
      stubs[x] = { render: () => x };
    });
    wrapper = shallowMount(SignUp, {
      stubs: mockCustomElements,
      mocks: { $router: { replace: jest.fn() } },
      store,
      localVue
    });
  });

  it("signs up", async () => {
    wrapper.vm.$refs.signUpForm = { validate: jest.fn() };
    wrapper.vm.signUpFormValid = false;

    await wrapper.vm.signUp();
    expect(wrapper.vm.$refs.signUpForm.validate).toBeCalled();
    expect(wrapper.vm.$router.replace).not.toBeCalled();

    wrapper.vm.email = "test@test.com";
    wrapper.vm.password = "123456";
    wrapper.vm.recaptchaResponse = "abcxyz123";
    wrapper.vm.signUpFormValid = true;

    await wrapper.vm.signUp(); // auth/createUser resolve false
    expect(actions["auth/createUser"].mock.calls[0][1]).toEqual({
      email: wrapper.vm.email,
      password: wrapper.vm.password,
      response: wrapper.vm.recaptchaResponse
    });
    expect(wrapper.vm.$router.replace).not.toBeCalled();

    await wrapper.vm.signUp(); // auth/createUser resolve true
    expect(wrapper.vm.$router.replace.mock.calls).toEqual([["/login"]]);
  });

  it("matchs snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
