import { createLocalVue } from "@vue/test-utils";
import Translate from "./translate.js";

let localVue = createLocalVue();

describe("translate.js", () => {
  const LANGUAGES_MAP = {
    test: { vi: "Kiểm choa", en: "Test" }
  };
  it("has install", () => {
    expect(Translate.install).toBeDefined();
  });
  it("translates", () => {
    Translate.install(localVue);
    expect(localVue.prototype.$translate(languagesMap, "vi")).toEqual({
      test: languagesMap.test.vi
    });
  });
  it("formats", () => {
    Translate.install(localVue);
    expect(localVue.prototype.$format("{0} {1}", ["hello", "world"])).toEqual(
      "hello world"
    );
  });
});
