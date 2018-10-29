import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Navigation from "@/components/Navigation.vue";
import { mockVuetifyComponents } from "@/__mocks__/vuetify.js";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("components/Navigation.vue", () => {
  let store;
  let getters;
  let actions;
  let wrapper;
  let $vuetify;

  beforeEach(() => {
    getters = {
      "auth/authUser": () => null,
      "auth/profile": () => null
    };
    actions = {
      "auth/logout": jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve(false))
        .mockImplementationOnce(() => Promise.resolve(true))
    };
    store = new Vuex.Store({
      getters,
      actions
    });
    $vuetify = {
      breakpoint: { name: "lg", mdAndUp: true, lgAndUp: true }
    };
    wrapper = shallowMount(Navigation, {
      stubs: mockVuetifyComponents,
      mocks: { $router: { push: jest.fn(), replace: jest.fn() }, $vuetify },
      store,
      localVue
    });
  });
  it("logouts and handle error", async () => {
    await wrapper.vm.logout();
    expect(actions["auth/logout"]).toBeCalled();
    expect(wrapper.vm.$router.replace).not.toBeCalled();

    await wrapper.vm.logout();
    expect(wrapper.vm.$router.replace.mock.calls).toEqual([["/login"]]);
  });
  it("navigates", () => {
    let link = "/link";
    wrapper.vm.navigate(link);
    expect(wrapper.vm.$router.push.mock.calls).toEqual([[link]]);
  })
  it("matchs snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
