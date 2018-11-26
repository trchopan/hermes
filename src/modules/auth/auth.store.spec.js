import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { rootStore } from "@/modules/core/root.store.js";
import auth from "./auth.store";
import {
  fakeSignUpCredentials,
  fakeAuthUser,
  fakeError,
  docData,
  docSnapshot
} from "@/__mocks__/firebase-results";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("auth.store", () => {
  let store;

  beforeEach(() => {
    const signInWithEmailAndPassword = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve())
      .mockImplementationOnce(() => Promise.reject(fakeError));
    const signOut = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve())
      .mockImplementationOnce(() => Promise.reject(fakeError));
    const fireAuth = { signInWithEmailAndPassword, signOut };

    let fakeUserApi = {
      createUser: jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve())
        .mockImplementationOnce(() => Promise.reject(fakeError))
    };

    let fakeAuth = auth(fireAuth, undefined, fakeUserApi);

    store = new Vuex.Store({
      modules: { auth: fakeAuth },
      ...rootStore
    });
  });

  it("change authUser and load profile", () => {
    let fireStore = {
      collection: () => ({
        doc: () => ({
          onSnapshot: (cb, _) => cb(docSnapshot)
        })
      })
    };
    let fakeAuth = auth(undefined, fireStore, undefined);
    store = new Vuex.Store({
      modules: { auth: fakeAuth },
      ...rootStore
    });

    store.dispatch("auth/changeUser", null);
    expect(store.state.auth.authUser).toBe(null);
    expect(store.state.auth.profile).toBe(null);

    store.dispatch("auth/changeUser", fakeAuthUser);
    expect(store.state.auth.authUser).toBe(fakeAuthUser);
    // docData is parsed from docSnapshot
    expect(store.state.auth.profile).toEqual(docData);

    fireStore = {
      collection: () => ({
        doc: () => ({
          onSnapshot: (cb, _) => cb(null)
        })
      })
    };
    fakeAuth = auth(undefined, fireStore, undefined);
    store = new Vuex.Store({
      modules: { auth: fakeAuth },
      ...rootStore
    });

    store.dispatch("auth/changeUser", fakeAuthUser);
    expect(store.state.auth.authUser).toBe(fakeAuthUser);
    // docData is parsed from docSnapshot
    expect(store.state.auth.profile).toEqual(null);
    expect(store.state.error).toEqual([{ code: "auth/profile-not-found" }]);

    fireStore = {
      collection: () => ({
        doc: () => ({
          onSnapshot: (_, error) => error(fakeError)
        })
      })
    };
    fakeAuth = auth(undefined, fireStore, undefined);
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
    let success = await store.dispatch(
      "auth/createUser",
      fakeSignUpCredentials
    );
    expect(success).toBe(true);
    let fail = await store.dispatch("auth/createUser", fakeSignUpCredentials);
    expect(fail).toBe(false);
    expect(store.state.error).toEqual([fakeError]);
  });

  it("logins", async () => {
    const success = await store.dispatch("auth/loginWithEmailPassword", {
      email: "test@tester.com",
      password: "password"
    });
    expect(success).toBe(true);

    const fail = await store.dispatch("auth/loginWithEmailPassword", {
      email: "test@tester.com",
      password: "password"
    });
    expect(fail).toBe(false);
    expect(store.state.error).toEqual([fakeError]);
  });

  it("logouts", async () => {
    const success = await store.dispatch("auth/logout");
    expect(success).toBe(true);

    const fail = await store.dispatch("auth/logout");
    expect(fail).toBe(false);
    expect(store.state.error).toEqual([fakeError]);
  });
});
