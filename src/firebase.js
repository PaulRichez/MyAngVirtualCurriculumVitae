import { firebase } from '@firebase/app'
import '@firebase/firestore'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getDatabase } from 'firebase/database'
// ... other firebase imports

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyDuI1mv61iK19mq11kE_wwj_f_rCyRblgU",
  authDomain: "mycv-4b1ec.firebaseapp.com",
  projectId: "mycv-4b1ec",
  storageBucket: "mycv-4b1ec.appspot.com",
  messagingSenderId: "398803838186",
  appId: "1:398803838186:web:8ef64e7fd154905af66393",
  measurementId: "G-GFYC3F4XTY"
})
export const database = getFirestore(firebase)
export const firestore = getDatabase(firebase)