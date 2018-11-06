import { profileParser } from "./models.js";
import { docData } from "@/__mocks__/firebase-results.js";

describe("models.js", () => {
  it("parses profile correctly", () => {
    const emptyData = profileParser({});
    expect(emptyData.fullname).toBeDefined();
    expect(emptyData.avatar).toBeDefined();
    expect(emptyData.position).toBeDefined();
    const data = profileParser(docData);
    expect(data).toEqual(docData);
  });
});
