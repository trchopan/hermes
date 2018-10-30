import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import NavigationDrawer from "@/components/layout/NavigationDrawer.vue";
import { mockVuetifyComponents } from "@/__mocks__/vuetify.js";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("components/layout/NavigationDrawer.vue", () => {
  let state;
  let actions;
  let store;
  let wrapper;
  let mocDrawerItems = [
    {
      path: "/test",
      name: "Test",
      icon: "test-icon"
    }
  ];

  beforeEach(() => {
    state = { layout: { drawerOpen: false } };
    actions = {
      "layout/toggleDrawer": jest.fn()
    };
    store = new Vuex.Store({
      state,
      actions
    });
    wrapper = shallowMount(NavigationDrawer, {
      stubs: mockVuetifyComponents,
      store,
      localVue
    });
  });

  it("render drawer items", () => {
    wrapper.vm.drawerItems = mocDrawerItems;
    const tile = wrapper.find("v-list-tile-stub");
    const icon = tile.find("v-list-tile-avatar-stub").find("v-icon-stub");
    const title = tile.find("v-list-tile-title-stub");
    expect(tile.attributes("to")).toEqual(mocDrawerItems[0].path);
    expect(icon.text()).toEqual(mocDrawerItems[0].icon);
    expect(title.text()).toEqual(mocDrawerItems[0].name);
  });
  it("matches snapshot", () => {
    wrapper.vm.drawerItems = mocDrawerItems;
    expect(wrapper).toMatchSnapshot();
  })
});
