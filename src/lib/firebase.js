import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { getAuth } from 'firebase/auth';

import { firebaseConfig } from 'config/constants';

// Auth
const app = firebase.initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);

// Firestore
const db = firebase.firestore();

export { firebaseAuth, db };
