import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { themes } from "@/store/modules/layout";
import filters from "@/filters.js";
import ToolbarMenu from "@/components/layout/ToolbarMenu.vue";
import { mockVuetifyComponents } from "@/__mocks__/vuetify.js";

const localVue = createLocalVue();
localVue.filter("titleCase", filters.titleCase);
localVue.use(Vuex);

describe("components/layout/ToolbarMenu.vue", () => {
  let getters;
  let actions;
  let store;
  let wrapper;

  beforeEach(() => {
    getters = {
      "auth/profile": () => ({
        fullname: "Tester",
        email: "test@tester.com",
        avatar: "avatar",
        position: "manager"
      }),
      "layout/theme": () => themes.light
    };
    actions = {
      "layout/toggleDrawer": jest.fn(),
      "layout/changeTheme": jest.fn(),
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
      stubs: mockVuetifyComponents,
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
    expect(actions["layout/changeTheme"].mock.calls[0][1]).toEqual(themes.light);
  });
  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
