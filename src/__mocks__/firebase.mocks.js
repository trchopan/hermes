export const fakeSignUpCredentials = {
  email: "test@tester.com",
  password: "123456",
  response: "abcxyz123"
};
export const fakeAuthUser = { uid: "123456", email: "tester@arkham.city" };
export const fakeError = { code: "fake-error" };
export const docData = {
  fullname: "Tester",
  avatar: "avatar",
  position: "manager"
};

export const createSnapshot = (data) => ({
  exists: true,
  data: () => data
});

export const createFirestoreOnSnapshot = (docSnapshot) => ({
  collection: () => ({
    doc: () => ({
      onSnapshot: (cb, _) => cb(docSnapshot)
    })
  }) 
})

export const createFirestoreOnSnapshotError = (error) => ({
  collection: () => ({
    doc: () => ({
      onSnapshot: (_, err) => err(error)
    })
  }) 
})
