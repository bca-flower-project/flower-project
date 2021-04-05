import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

const credentials = {
  apiKey: "AIzaSyCJGRvSo2zhLjgJn7pZ7oCKuFHraXDQ-34",
  authDomain: "example-auth-5e946.firebaseapp.com",
  databaseURL: "https://example-auth-5e946.firebaseio.com",
  projectId: "example-auth-5e946",
  storageBucket: "example-auth-5e946.appspot.com",
  messagingSenderId: "111109385265",
  appId: "1:111109385265:web:e404cc2ae5d06b2d3b7910"
}

const firebaseApp = !firebase.apps.length ? firebase.initializeApp(credentials) : firebase.app()

const database = firebaseApp.database()
const googleProvider = new firebase.auth.GoogleAuthProvider()
const auth = firebase.auth

export { firebaseApp, database, auth, googleProvider }
