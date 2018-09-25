import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Login from "@/views/Login.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("views/Login.vue", () => {
  let state;
  let getters;
  let actions;
  let mutations;
  let store;
  let routes;
  let router;
  let fakeDepsSuccess;

  beforeEach(() => {
    // Setup the store module "auth"
    state = {
      currentUser: null
    };
    getters = {
      "auth/isLoggedIn": jest.fn(
        () => (state.currentUser && state.currentUser.uid ? true : false)
      )
    };
    actions = {
      "auth/loginWithEmailPassword": jest.fn()
    };
    mutations = {
      "auth/loggedIn": state => (state.currentUser = { uid: "1234" })
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
    const form = wrapper.find("form");
    const email = wrapper.find('form > input[type="text"]');
    const password = wrapper.find('form > input[type="password"]');
    email.element.value = "email";
    email.trigger("input");
    password.element.value = "password";
    password.trigger("input");
    expect(wrapper.vm.$data.email).toBe("email");
    expect(wrapper.vm.$data.password).toBe("password");
    form.trigger("submit");
    expect(actions["auth/loginWithEmailPassword"].mock.calls[0][1]).toEqual({
      email: email.element.value,
      password: password.element.value
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
