export const fakeAuthUser = { uid: "123456", email: "tester@arkham.city" };
export const fakeError = { code: "fake-error" };
export const docData = { name: "tester" };

const docResult = {
  exists: true,
  data: () => docData
};

const collection = jest
  .fn()
  .mockImplementationOnce(() => ({
    doc: () => ({
      get: () => Promise.resolve(docResult)
    })
  }))
  .mockImplementationOnce(() => ({
    doc: () => ({
      get: () => Promise.reject(fakeError)
    })
  }));

export const fireStore = { collection };

const signInWithEmailAndPassword = jest
  .fn()
  .mockImplementationOnce(() => Promise.resolve())
  .mockImplementationOnce(() => Promise.reject(fakeError));
const signOut = jest
  .fn()
  .mockImplementationOnce(() => Promise.resolve())
  .mockImplementationOnce(() => Promise.reject(fakeError));
export const fireAuth = { signInWithEmailAndPassword, signOut };
