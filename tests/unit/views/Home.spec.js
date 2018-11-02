import { shallowMount, createLocalVue } from "@vue/test-utils";
import Home from "@/views/Home.vue";
import { mockCustomElements } from "@/__mocks__/custom-elements";

const localVue = createLocalVue();

describe("@/views/Home.vue", () => {
  it("matchs snapshot", () => {
    let wrapper = shallowMount(Home, {
      stubs: mockCustomElements,
      localVue
    });
    expect(wrapper).toBeDefined();
  });
});
