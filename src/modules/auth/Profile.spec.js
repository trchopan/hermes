import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Translation from "@/plugins/translation.js";
import Profile from "./Profile.vue";
import { helpers } from "@/helpers.js"
import { mockCustomElements } from "@/__mocks__/custom-elements.js";
import { docData } from "@/__mocks__/firebase-results.js";
import { languages } from "@/modules/core/layout.models.js";
import { filters } from "@/filters.js";

const localVue = createLocalVue();
localVue.filter("titleCase", filters.titleCase);
localVue.use(Vuex);
localVue.use(Translation);

describe("views/Profile.vue", () => {
  let store;
  let getters;
  let actions;
  let wrapper;

  beforeEach(() => {
    getters = {
      "layout/language": () => languages.en,
      "auth/profile": () => docData,
      "auth/error": () => null,
      "auth/loading": () => false
    };
    actions = {
      "auth/updateProfile": jest.fn()
    };
    store = new Vuex.Store({
      getters,
      actions
    });
    wrapper = shallowMount(Profile, {
      stubs: mockCustomElements,
      mocks: { $helpers: helpers },
      store,
      localVue
    });
  });
  it("has all the tools", () => {
    expect(wrapper.vm.editMode).toBeDefined();
  });
  it("changes user profile when input change with debouncing", done => {
    const otherValue = "Other Value";
    wrapper.vm.fullname = "afiauhnilg";
    wrapper.vm.avatar = "wertniwertugn";
    wrapper.vm.fullname = otherValue;
    wrapper.vm.avatar = otherValue;

    setTimeout(() => {
      expect(actions["auth/updateProfile"].mock.calls[0][1]).toEqual({
        fullname: otherValue
      });
      expect(actions["auth/updateProfile"].mock.calls[1][1]).toEqual({
        avatar: otherValue
      });
      done();
    }, 1000);
  });
  it("matchs snapshot", () => {
    expect(wrapper).toMatchSnapshot();
    wrapper.vm.editMode = true;
    expect(wrapper).toMatchSnapshot();
  });
});
