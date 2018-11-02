import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import NavigationDrawer from "@/components/layout/NavigationDrawer.vue";
import { mockCustomElements } from "@tests/unit/__mocks__/custom-elements.js";
import { languagesMap } from "@/languages";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("components/layout/NavigationDrawer.vue", () => {
  let state;
  let getters;
  let actions;
  let store;
  let wrapper;
  let mocDrawerItems = [
    {
      path: "/test",
      name: "test",
      icon: "test-icon"
    }
  ];

  beforeEach(() => {
    state = { layout: { drawerOpen: false } };
    getters = {
      "layout/$t": () => languagesMap.en,
      "layout/drawerOpen": () => false
    };
    actions = {
      "layout/toggleDrawer": jest.fn()
    };
    store = new Vuex.Store({
      state,
      getters,
      actions
    });
    wrapper = shallowMount(NavigationDrawer, {
      stubs: mockCustomElements,
      store,
      localVue
    });
  });

  it("render drawer items", () => {
    wrapper.vm.items = mocDrawerItems;
    const tile = wrapper.find("v-list-tile-stub");
    const icon = tile.find("v-list-tile-avatar-stub").find("v-icon-stub");
    const title = tile.find("v-list-tile-title-stub");
    expect(tile.attributes("to")).toEqual(mocDrawerItems[0].path);
    expect(icon.text()).toEqual(mocDrawerItems[0].icon);
    expect(title.text()).toEqual(
      languagesMap.en.drawer[mocDrawerItems[0].name]
    );
  });
  it("toggles drawer", () => {
    wrapper.vm.drawerOpen = true;
    expect(actions["layout/toggleDrawer"]).toBeCalled();
  });
  it("matches snapshot", () => {
    wrapper.vm.items = mocDrawerItems;
    expect(wrapper).toMatchSnapshot();
  });
});
