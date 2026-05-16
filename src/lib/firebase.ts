import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAvAK-kPgV4efMn-vkZmRpbWFsvWBER0mo",
  authDomain: "sm-store-4be2d.firebaseapp.com",
  databaseURL: "https://sm-store-4be2d-default-rtdb.firebaseio.com",
  projectId: "sm-store-4be2d",
  storageBucket: "sm-store-4be2d.firebasestorage.app",
  messagingSenderId: "802033022631",
  appId: "1:802033022631:web:f34c38017860adb76d8d82",
  measurementId: "G-4GCTFK1ZMK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
