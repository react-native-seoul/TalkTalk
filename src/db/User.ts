import firebase from 'firebase';

export function db_snapshotFriends(setFriends) {
  const unsubscribe = firebase.firestore().collection(`users/${firebase.auth().currentUser.uid}/friends`)
    .onSnapshot((snapshots) => {
    const friends = [];
    if (snapshots.size === 0) {
      setFriends(friends);
    } else {
      let cnt = 0;
      snapshots.docs.forEach(async (doc) => {
        const userDoc = await firebase.firestore().doc(`users/${doc.id}`).get();
        const user = userDoc.data();
        if (user) {
          user.uid = userDoc.id;
          friends.push(user);
        }
        cnt++;
        if (cnt === snapshots.size) {
          setFriends(friends);
        }
      });
    }
  });

  return unsubscribe;
}

export async function db_getAllUser() {
  const users = [];
  const docs = await firebase.firestore().collection('users').orderBy('displayName', 'asc').get();
  docs.forEach((doc) => {
    if (doc.id !== firebase.auth().currentUser.uid) {
      const user = doc.data();
      user.uid = doc.id;
      users.push(user);
    }
  });
  return users;
}

export async function db_getUser(uid) {
  const doc = await firebase.firestore().doc(`users/${uid}`).get();
  return doc.data();
}

export function db_addfriend(uid) {
  firebase.firestore().doc(`users/${firebase.auth().currentUser.uid}/friends/${uid}`).set({dummy: 0});
}

export function db_unfriend(uid) {
  firebase.firestore().doc(`users/${firebase.auth().currentUser.uid}/friends/${uid}`).delete();
}
