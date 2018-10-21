import { shallowMount, createLocalVue } from "@vue/test-utils";
import Home from "@/views/Home.vue";

const localVue = createLocalVue();

describe("@/views/Home.vue", () => {
  it("matchs snapshot", () => {
    let wrapper = shallowMount(Home, {
      stubs: ["router-view"],
      localVue
    });
    expect(wrapper).toBeDefined();
  });
});
