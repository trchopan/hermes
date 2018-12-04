import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Translate from "@/plugins/translate.js";
import NavigationDrawer, { languagesMap } from "./NavigationDrawer.vue";
import { mockCustomElements } from "@/__mocks__/custom-elements.js";
import { languages } from "@/modules/core/layout.models.js";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Translate);

describe("NavigationDrawer.vue", () => {
  let state;
  let getters;
  let actions;
  let store;
  let wrapper;
  let mocDrawerItems = [
    {
      path: "/",
      name: "home",
      icon: "home"
    }
  ];

  beforeEach(() => {
    state = { layout: { drawerOpen: false } };
    getters = {
      "layout/language": () => languages.en,
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
    expect(title.text()).toEqual(languagesMap.home.en);
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
