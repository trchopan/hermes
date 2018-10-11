import { shallowMount, createLocalVue } from "@vue/test-utils";
import App from "@/App.vue";

const localVue = createLocalVue();

describe("@/App.vue", () => {
  it("matchs snapshot", () => {
    let wrapper = shallowMount(App, {
      stubs: ["router-view"],
      localVue
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
