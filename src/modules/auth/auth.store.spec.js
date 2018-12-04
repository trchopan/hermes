import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { rootStore } from "@/modules/core/root.store.js";
import auth from "./auth.store";
import {
  createSnapshot,
  createFirestoreOnSnapshot,
  createFirestoreOnSnapshotError,
  fakeSignUpCredentials,
  fakeAuthUser,
  fakeError,
  docData
} from "@/__mocks__/firebase.mocks.js";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("auth.store", () => {
  let store;
  let fakeAuth;

  it("change authUser and load profile", () => {
    const snapData = createSnapshot(docData);
    let firestore = createFirestoreOnSnapshot(snapData);
    fakeAuth = auth(undefined, firestore, undefined);
    store = new Vuex.Store({
      modules: { auth: fakeAuth },
      ...rootStore
    });

    store.dispatch("auth/changeUser", null);
    expect(store.state.auth.authUser).toBe(null);
    expect(store.state.auth.profile).toBe(null);

    store.dispatch("auth/changeUser", fakeAuthUser);
    expect(store.state.auth.authUser).toBe(fakeAuthUser);
    expect(store.state.auth.profile).toEqual(docData);

    firestore = createFirestoreOnSnapshot(null);
    fakeAuth = auth(undefined, firestore, undefined);
    store = new Vuex.Store({
      modules: { auth: fakeAuth },
      ...rootStore
    });
    store.dispatch("auth/changeUser", fakeAuthUser);
    expect(store.state.auth.authUser).toBe(fakeAuthUser);
    expect(store.state.auth.profile).toEqual(null);
    expect(store.state.error).toEqual([{ code: "auth/profile-not-found" }]);

    firestore = createFirestoreOnSnapshotError(fakeError);
    fakeAuth = auth(undefined, firestore, undefined);
    store = new Vuex.Store({
      modules: { auth: fakeAuth },
      ...rootStore
    });
    store.dispatch("auth/changeUser", fakeAuthUser);
    expect(store.state.auth.authUser).toBe(fakeAuthUser);
    // docData is parsed from docSnapshot
    expect(store.state.auth.profile).toEqual(null);
    expect(store.state.error).toEqual([fakeError]);
  });

  it("creates user", async () => {
    const createUserSuccess = jest.fn(() => Promise.resolve());
    const createUserFail = jest.fn(() => Promise.reject(fakeError));
    let userApi = { createUser: createUserSuccess };
    fakeAuth = auth(undefined, undefined, userApi);
    store = new Vuex.Store({
      modules: { auth: fakeAuth },
      ...rootStore
    });
    const success = await store.dispatch(
      "auth/createUser",
      fakeSignUpCredentials
    );
    expect(success).toBe(true);

    userApi = { createUser: createUserFail };
    fakeAuth = auth(undefined, undefined, userApi);
    store = new Vuex.Store({
      modules: { auth: fakeAuth },
      ...rootStore
    });
    const fail = await store.dispatch("auth/createUser", fakeSignUpCredentials);
    expect(fail).toBe(false);
    expect(store.state.error).toEqual([fakeError]);
  });

  it("logins", async () => {
    const signInSuccess = jest.fn(() => Promise.resolve());
    const signInFail = jest.fn(() => Promise.reject(fakeError));
    let fireAuth = { signInWithEmailAndPassword: signInSuccess };
    fakeAuth = auth(fireAuth, undefined, undefined);
    store = new Vuex.Store({
      modules: { auth: fakeAuth },
      ...rootStore
    });
    const success = await store.dispatch("auth/loginWithEmailPassword", {
      email: "test@tester.com",
      password: "password"
    });
    expect(success).toBe(true);

    fireAuth = { signInWithEmailAndPassword: signInFail };
    fakeAuth = auth(fireAuth, undefined, undefined);
    store = new Vuex.Store({
      modules: { auth: fakeAuth },
      ...rootStore
    });
    const fail = await store.dispatch("auth/loginWithEmailPassword", {
      email: "test@tester.com",
      password: "password"
    });
    expect(fail).toBe(false);
    expect(store.state.error).toEqual([fakeError]);
  });

  it("logouts", async () => {
    const signOutSuccess = jest.fn(() => Promise.resolve());
    const signOutFail = jest.fn(() => Promise.reject(fakeError));
    let fireAuth = { signOut: signOutSuccess };
    fakeAuth = auth(fireAuth, undefined, undefined);
    store = new Vuex.Store({
      modules: { auth: fakeAuth },
      ...rootStore
    });
    const success = await store.dispatch("auth/logout");
    expect(success).toBe(true);

    fireAuth = { signOut: signOutFail };
    fakeAuth = auth(fireAuth, undefined, undefined);
    store = new Vuex.Store({
      modules: { auth: fakeAuth },
      ...rootStore
    });
    const fail = await store.dispatch("auth/logout");
    expect(fail).toBe(false);
    expect(store.state.error).toEqual([fakeError]);
  });
});
