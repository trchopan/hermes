import { createLocalVue } from "@vue/test-utils";
import Translation from "./translation.js";

let localVue = createLocalVue();

describe("transition.js", () => {
  const languagesMap = {
    test: { vi: "Kiểm choa", en: "Test" }
  };
  it("has install", () => {
    expect(Translation.install).toBeDefined();
  });
  it("translates", () => {
    Translation.install(localVue);
    expect(localVue.prototype.$translate(languagesMap, "vi")).toEqual({
      test: languagesMap.test.vi
    });
  });
});
