import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { themes } from "@/modules/core/layout.models.js";
import { filters } from "@/share/filters.js";
import ToolbarMenu, { languagesMap } from "./ToolbarMenu.vue";
import { mockCustomElements } from "@/__mocks__/custom-elements.js";
import { docData } from "@/__mocks__/firebase-results";
import { languages } from "@/modules/core/layout.models.js";

const localVue = createLocalVue();
localVue.filter("titleCase", filters.titleCase);
localVue.use(Vuex);

describe("ToolbarMenu.vue", () => {
  let getters;
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      "auth/profile": () => docData,
      "layout/theme": () => themes.light,
      "layout/language": () => languages.en
    };
    actions = {
      "layout/changeTheme": jest.fn(),
      "layout/changeLanguage": jest.fn(),
      "auth/logout": jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve(false))
        .mockImplementationOnce(() => Promise.resolve(true))
    };
    store = new Vuex.Store({
      getters,
      actions
    });
    wrapper = shallowMount(ToolbarMenu, {
      stubs: mockCustomElements,
      mocks: {
        $vuetify: { breakpoint: { mdAndUp: true } },
        $router: { replace: jest.fn() }
      },
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
  it("changes theme", () => {
    wrapper.vm.changeTheme(themes.light);
    expect(actions["layout/changeTheme"].mock.calls[0][1]).toEqual(
      themes.light
    );
  });
  it("changes language", () => {
    wrapper.vm.changeLanguage(languages.vi.code);
    expect(actions["layout/changeLanguage"].mock.calls[0][1]).toEqual(
      languages.vi.code
    );
  });
  it("renders profile correctly", () => {
    expect(wrapper.find("v-list-tile-title-stub").text()).toBe(
      docData.fullname
    );
    expect(wrapper.find("v-btn-stub").text()).toBe(languagesMap.logout.en);
    getters = {
      ...getters,
      "auth/profile": () => null
    };
    store = new Vuex.Store({
      getters,
      actions
    });
    wrapper = shallowMount(ToolbarMenu, {
      stubs: mockCustomElements,
      mocks: {
        $vuetify: { breakpoint: { mdAndUp: true } },
        $router: { replace: jest.fn() }
      },
      store,
      localVue
    });
    expect(wrapper.find("v-btn-stub").text()).toBe(languagesMap.login.en);
  });
  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
    getters = {
      ...getters,
      "auth/profile": () => null
    };
    store = new Vuex.Store({
      getters,
      actions
    });
    wrapper = shallowMount(ToolbarMenu, {
      stubs: mockCustomElements,
      mocks: {
        $vuetify: { breakpoint: { mdAndUp: true } },
        $router: { replace: jest.fn() }
      },
      store,
      localVue
    });
    expect(wrapper).toMatchSnapshot();
  });
});
