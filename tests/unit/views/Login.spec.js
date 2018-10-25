import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Login from "@/views/Login.vue";
import { mockVuetifyComponents } from "@/__mocks__/vuetify.js";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("views/Login.vue", () => {
  let store;
  let getters;
  let actions;

  beforeEach(() => {
    getters = {
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
  });
  it("submits dispatch store login action", async () => {
    let wrapper = shallowMount(Login, {
      stubs: mockVuetifyComponents,
      mocks: { $router: { replace: jest.fn() } },
      store,
      localVue
    });
    wrapper.vm.email = "test@test.com";
    wrapper.vm.password = "wrong password";
    await wrapper.vm.onSubmit();
    expect(wrapper.vm.$router.replace).not.toBeCalled();
    expect(actions["auth/loginWithEmailPassword"].mock.calls[0][1]).toEqual({
      email: "test@test.com",
      password: "wrong password"
    });

    wrapper.vm.password = "correct password"
    await wrapper.vm.onSubmit();
    expect(actions["auth/loginWithEmailPassword"].mock.calls[1][1]).toEqual({
      email: "test@test.com",
      password: "correct password"
    });expect(wrapper.vm.$router.replace.mock.calls).toEqual([["/"]]);
  });
  it("matchs snapshot", () => {
    let wrapper = shallowMount(Login, {
      stubs: mockVuetifyComponents,
      store,
      localVue
    });
    expect(wrapper).toMatchSnapshot();
  });
});
