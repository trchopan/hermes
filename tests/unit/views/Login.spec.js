import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Login from "@/views/Login.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe.skip("views/Login.vue", () => {
  let state;
  let getters;
  let actions;
  let mutations;
  let store;
  let fakeDepsSuccess;

  beforeEach(() => {
    // Setup the store module "auth"
    state = {
      authUser: null
    };
    getters = {
      "auth/isLoggedIn": jest.fn(
        () => (state.authUser && state.authUser.uid ? true : false)
      )
    };
    actions = {
      "auth/loginWithEmailPassword": jest.fn()
    };
    mutations = {
      "auth/loggedIn": state => (state.authUser = { uid: "1234" })
    };
    store = new Vuex.Store({
      state,
      getters,
      actions,
      mutations
    });
  });

  it("connects the form with user inputs when submit", () => {
    const wrapper = shallowMount(Login, { store, localVue });
    const formEl = wrapper.find("form");
    const emailEl = wrapper.find('form > input[type="text"]');
    const passwordEl = wrapper.find('form > input[type="password"]');
    expect(formEl.exists()).toBe(true);
    expect(emailEl.exists()).toBe(true);
    expect(passwordEl.exists()).toBe(true);
    emailEl.element.value = "email";
    emailEl.trigger("input");
    passwordEl.element.value = "password";
    passwordEl.trigger("input");
    expect(wrapper.vm.$data.email).toBe("email");
    expect(wrapper.vm.$data.password).toBe("password");
    formEl.trigger("submit");
    expect(actions["auth/loginWithEmailPassword"].mock.calls[0][1]).toEqual({
      email: emailEl.element.value,
      password: passwordEl.element.value
    });
  });

  it("redirects to home when logged in", () => {
    let mockPush = jest.fn();
    const wrapper = shallowMount(Login, {
      mocks: { $router: { push: mockPush } },
      store,
      localVue
    });
    store.commit("auth/loggedIn");
    return wrapper.vm.$nextTick().then(next => {
      expect(getters["auth/isLoggedIn"].mock.calls.length).toBe(2);
      expect(mockPush.mock.calls).toEqual([["/home"]]);
    });
  });

  it.skip("matchs snapshot", () => {
    const wrapper = shallowMount(Login, {});
    expect(wrapper.element).toMatchSnapshot();
  });
});
