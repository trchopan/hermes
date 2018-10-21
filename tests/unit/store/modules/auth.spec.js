import auth from "@/store/modules/auth.js";

describe("@/store/modules/auth.js", () => {
  const fakeFirebaseUser = {
    user: { uid: "123456", email: "tester@arkham.city" }
  };
  const fakeError = { code: "fake-error" };
  const fakeCredential = {
    username: "tester@arkham.city",
    password: "super_secret"
  };
  let state;
  let fakeAuth;

  beforeEach(() => {
    fakeAuth = auth();
    state = fakeAuth.state;
  });

  // Getters
  it("gets the correct values", () => {
    state.authUser = null;
    expect(fakeAuth.getters.isLoggedIn(state)).toBe(false);
    state.authUser = fakeFirebaseUser;
    expect(fakeAuth.getters.isLoggedIn(state)).toBe(true);

    expect(fakeAuth.getters.authUser(state)).toBe(state.authUser);
    expect(fakeAuth.getters.loading(state)).toBe(state.loading);
    expect(fakeAuth.getters.error(state)).toBe(state.error);
  });

  // Actions
  it("change user accordingly", async () => {
    let fakeCommit = jest.fn();
    fakeAuth.actions.changeUser({ commit: fakeCommit }, fakeFirebaseUser);
    expect(fakeCommit.mock.calls).toEqual([["userChanged", fakeFirebaseUser]]);
  });

  it("logins and handle async api results", async () => {
    let fakeCommit = jest.fn();

    let fakeDepsLoginSuccess = {
      signInWithEmailAndPassword: jest.fn().mockResolvedValue(fakeFirebaseUser)
    };
    let fakeAuthSuccess = auth(fakeDepsLoginSuccess);
    await fakeAuthSuccess.actions.loginWithEmailPassword(
      { commit: fakeCommit },
      fakeCredential
    );
    expect(fakeDepsLoginSuccess.signInWithEmailAndPassword).toHaveBeenCalled();

    let fakeDepsLoginFail = {
      signInWithEmailAndPassword: jest.fn().mockRejectedValue(fakeError)
    };
    let fakeAuthFail = auth(fakeDepsLoginFail);
    await fakeAuthFail.actions.loginWithEmailPassword(
      { commit: fakeCommit },
      fakeCredential
    );
    expect(fakeDepsLoginFail.signInWithEmailAndPassword).toHaveBeenCalled();

    expect(fakeCommit.mock.calls).toEqual([
      ["loading"],
      ["loggedIn", fakeFirebaseUser.user],
      ["loading"],
      ["errorCatched", fakeError]
    ]);
  });

  it("logouts and handle async api results", async () => {
    let fakeCommit = jest.fn();

    let fakeDepsLogoutSuccess = {
      signOut: jest.fn().mockResolvedValue(undefined)
    };
    let fakeAuthSuccess = auth(fakeDepsLogoutSuccess);
    await fakeAuthSuccess.actions.logout({ commit: fakeCommit });
    expect(fakeDepsLogoutSuccess.signOut).toHaveBeenCalled();

    let fakeDepsLogoutFail = {
      signOut: jest.fn().mockRejectedValue(fakeError)
    };
    let fakeAuthFail = auth(fakeDepsLogoutFail);
    await fakeAuthFail.actions.logout({ commit: fakeCommit });
    expect(fakeDepsLogoutFail.signOut).toHaveBeenCalled();

    expect(fakeCommit.mock.calls).toEqual([
      ["loading"],
      ["loggedOut"],
      ["loading"],
      ["errorCatched", fakeError]
    ]);
  });

  // Mutations
  it("mutates when user changed", () => {
    fakeAuth.mutations.userChanged(state, fakeFirebaseUser);
    expect(state.authUser).toBe(fakeFirebaseUser);
  });
  it("mutates when loading", () => {
    state.loading = false;
    fakeAuth.mutations.loading(state);
    expect(state.loading).toBe(true);
  });
  it("mutates when loggedIn", () => {
    state.loading = true;
    fakeAuth.mutations.loggedIn(state, fakeFirebaseUser.user);
    expect(state.loading).toBe(false);
    expect(state.authUser).toBe(fakeFirebaseUser.user);
  });
  it("mutates when loggedOut", () => {
    state.loading = true;
    fakeAuth.mutations.loggedOut(state);
    expect(state.loading).toBe(false);
    expect(state.authUser).toBe(null);
  });
  it("mutates when errorCatched", () => {
    state.loading = true;
    fakeAuth.mutations.errorCatched(state, fakeError);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(fakeError);
  });
});
