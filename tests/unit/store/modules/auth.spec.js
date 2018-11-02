import auth from "@/store/modules/auth.js";
import {
  fakeAuthUser,
  fakeError,
  docData,
  docSnapshot
} from "@/__mocks__/firebase-results";

describe("@/store/modules/auth.js", () => {
  const signInWithEmailAndPassword = jest
    .fn()
    .mockImplementationOnce(() => Promise.resolve())
    .mockImplementationOnce(() => Promise.reject(fakeError));
  const signOut = jest
    .fn()
    .mockImplementationOnce(() => Promise.resolve())
    .mockImplementationOnce(() => Promise.reject(fakeError));
  const fireAuth = { signInWithEmailAndPassword, signOut };

  // Getters
  it("gets the correct values", () => {
    let fakeAuth = auth();
    let state = fakeAuth.state;
    expect(fakeAuth.getters.authUser(state)).toBe(state.authUser);
    expect(fakeAuth.getters.profile(state)).toBe(state.profile);
    expect(fakeAuth.getters.loading(state)).toBe(state.loading);
    expect(fakeAuth.getters.error(state)).toBe(state.error);
  });

  // Actions
  it("change authUser and load profile", () => {
    let fireStore = {
      collection: () => ({
        doc: () => ({ onSnapshot: (cb, _) => cb(docSnapshot) })
      })
    };

    let fakeCommit = jest.fn();
    let fakeAuth = auth(undefined, fireStore);

    fakeAuth.actions.changeUser({ commit: fakeCommit }, null);
    expect(fakeCommit.mock.calls).toEqual([
      // onAuthStateChanged has not any user
      ["userChanged", null],
      ["profileChanged", null]
    ]);

    fakeCommit.mockClear();
    fakeAuth.actions.changeUser({ commit: fakeCommit }, fakeAuthUser);
    expect(fakeCommit.mock.calls).toEqual([
      // onAuthStateChanged has user
      ["userChanged", fakeAuthUser],
      ["loading"],
      ["profileChanged", docData]
    ]);
  });

  it("handles firestore error", () => {
    let fireStore = {
      collection: () => ({
        doc: () => ({ onSnapshot: (_, err) => err(fakeError) })
      })
    };

    let fakeCommit = jest.fn();
    let fakeAuth = auth(undefined, fireStore);

    fakeAuth.actions.changeUser({ commit: fakeCommit }, fakeAuthUser);
    expect(fakeCommit.mock.calls).toEqual([
      // fireStore snapshot has error
      ["userChanged", fakeAuthUser],
      ["loading"],
      ["errorCatched", fakeError]
    ]);
  });

  it("logins", async () => {
    let fakeCommit = jest.fn();
    let fakeAuth = auth(fireAuth, undefined);
    let fakeCredential = { email: "test", password: "123" };

    fakeCommit.mockClear();
    const success = await fakeAuth.actions.loginWithEmailPassword(
      { commit: fakeCommit },
      fakeCredential
    );
    expect(fireAuth.signInWithEmailAndPassword.mock.calls).toEqual([
      [fakeCredential.email, fakeCredential.password]
    ]);
    expect(success).toEqual(true);
    expect(fakeCommit.mock.calls).toEqual([["loading"]]);

    fakeCommit.mockClear();
    const fail = await fakeAuth.actions.loginWithEmailPassword(
      { commit: fakeCommit },
      fakeCredential
    );
    expect(fail).toEqual(false);
    expect(fakeCommit.mock.calls).toEqual([
      ["loading"],
      ["errorCatched", fakeError]
    ]);
  });

  it("logouts and handle async api results", async () => {
    let fakeCommit = jest.fn();
    let fakeAuth = auth(fireAuth, undefined);

    fakeCommit.mockClear();
    const success = await fakeAuth.actions.logout({ commit: fakeCommit });
    expect(success).toEqual(true);
    expect(fakeCommit.mock.calls).toEqual([["loading"]]);

    fakeCommit.mockClear();
    const fail = await fakeAuth.actions.logout({ commit: fakeCommit });
    expect(fail).toEqual(false);
    expect(fakeCommit.mock.calls).toEqual([
      ["loading"],
      ["errorCatched", fakeError]
    ]);
  });

  // Mutations
  it("mutates when user changed", () => {
    let fakeAuth = auth();
    let state = fakeAuth.state;
    fakeAuth.mutations.userChanged(state, fakeAuthUser);
    expect(state.authUser).toBe(fakeAuthUser);
  });
  it("mutates when profile changed", () => {
    let fakeAuth = auth();
    let state = fakeAuth.state;
    state.loading = true;
    state.error = fakeError;
    fakeAuth.mutations.profileChanged(state, docData);
    expect(state.profile).toBe(docData);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });
  it("mutates when loading", () => {
    let fakeAuth = auth();
    let state = fakeAuth.state;
    state.loading = false;
    fakeAuth.mutations.loading(state);
    expect(state.loading).toBe(true);
  });
  it("mutates when errorCatched", () => {
    let fakeAuth = auth();
    let state = fakeAuth.state;
    state.loading = true;
    fakeAuth.mutations.errorCatched(state, fakeError);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(fakeError);
  });
});
