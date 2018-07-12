import firebase from 'firebase';

export async function db_unfriend(user) {
  const userData = firebase.auth().currentUser;
  console.log(`users/${userData.uid}/friends/${user.friendId}`);

  // realtime-database
  await firebase.database().ref(`users/${userData.uid}/friends/${user.friendId}`).remove();

  // firestore
  await firebase.firestore()
  .collection('users').doc(`${userData.uid}`)
  .collection('friends').doc(`${user.friendId}`)
  .delete();
}
