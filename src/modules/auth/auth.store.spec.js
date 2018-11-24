import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import auth from "./auth.store";
import {
  fakeAuthUser,
  fakeError,
  docData,
  docSnapshot
} from "@/__mocks__/firebase-results";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("auth.store", () => {
  it("change authUser and load profile", () => {
    let fireStore = {
      collection: () => ({
        doc: () => ({ onSnapshot: (cb, _) => cb(docSnapshot) })
      })
    };

    let fakeAuth = auth(undefined, fireStore);
    let store = new Vuex.Store(fakeAuth);

    store.dispatch("changeUser", null);
    expect(store.state.authUser).toBe(null);
    expect(store.state.profile).toBe(null);

    store.dispatch("changeUser", fakeAuthUser);
    expect(store.state.authUser).toBe(fakeAuthUser);
    // docData is parsed from docSnapshot
    expect(store.state.profile).toEqual(docData);
  });

  it("handles firestore error", () => {
    let fireStore = {
      collection: () => ({
        doc: () => ({ onSnapshot: (_, err) => err(fakeError) })
      })
    };

    let fakeAuth = auth(undefined, fireStore);
    let store = new Vuex.Store(fakeAuth);

    store.dispatch("changeUser", fakeAuthUser);
    expect(store.state.authUser).toBe(fakeAuthUser);
    expect(store.state.error).toEqual(fakeError);
  });

  it("creates user", async () => {
    let fakeUserApiError = { response: { data: fakeError } };
    let fakeUserApi = {
      createUser: jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve(fakeAuthUser))
        .mockImplementationOnce(() => Promise.reject(fakeUserApiError))
    };
    let fakeAuth = auth(undefined, undefined, fakeUserApi);
    let store = new Vuex.Store(fakeAuth);
    let success = await store.dispatch("createUser");
    expect(success).toBe(true);
    let fail = await store.dispatch("createUser");
    expect(fail).toBe(false);
    expect(store.state.error).toBe(fakeError);
  });

  it("logins", async () => {
    const signInWithEmailAndPassword = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve())
      .mockImplementationOnce(() => Promise.reject(fakeError));
    const fireAuth = { signInWithEmailAndPassword };
    let fakeAuth = auth(fireAuth);
    let store = new Vuex.Store(fakeAuth);

    const success = await store.dispatch("loginWithEmailPassword", {
      email: "test@tester.com",
      password: "password"
    });
    expect(success).toBe(true);

    const fail = await store.dispatch("loginWithEmailPassword", {
      email: "test@tester.com",
      password: "password"
    });
    expect(fail).toBe(false);
    expect(store.state.error).toBe(fakeError);
  });

  it("logouts", async () => {
    const signOut = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve())
      .mockImplementationOnce(() => Promise.reject(fakeError));
    const fireAuth = { signOut };
    let fakeAuth = auth(fireAuth);
    let store = new Vuex.Store(fakeAuth);

    const success = await store.dispatch("logout");
    expect(success).toBe(true);

    const fail = await store.dispatch("logout");
    expect(fail).toBe(false);
    expect(store.state.error).toBe(fakeError);
  });

  it("clears error", () => {
    let fakeAuth = auth();
    fakeAuth.state.error = fakeError;
    let store = new Vuex.Store(fakeAuth);
    expect(store.state.error).toBe(fakeError);
    store.dispatch("clearError");
    expect(store.state.error).toBe(null);
  });
});
