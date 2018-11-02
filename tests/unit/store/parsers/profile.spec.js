import profileParser from "@/store/parsers/profile.js";
import { docData } from "@tests/unit/__mocks__/firebase-results.js";

describe("@/store/modules/auth.js", () => {
  it("parses profile correctly", () => {
    const emptyData = profileParser({});
    expect(emptyData.fullname).toBeDefined();
    expect(emptyData.avatar).toBeDefined();
    expect(emptyData.position).toBeDefined();
    const data = profileParser(docData);
    expect(data).toEqual(docData);
  });
});
