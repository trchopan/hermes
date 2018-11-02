import { shallowMount, createLocalVue } from "@vue/test-utils";
import { mockCustomElements } from "@tests/unit/__mocks__/custom-elements.js";
import App from "@/App.vue";

const localVue = createLocalVue();

describe.skip("@/App.vue", () => {
  it("matchs snapshot", () => {
    let wrapper = shallowMount(App, {
      stubs: mockCustomElements,
      localVue
    });
    expect(wrapper).toMatchSnapshot();
  });
});
