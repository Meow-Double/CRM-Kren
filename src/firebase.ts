import { initializeApp } from 'firebase/app';

// interface firebaseTypes {
//   apiKey: any;
//   authDomain: any;
//   projectId: any;
//   storageBucket: any;
//   messagingSenderId: any;
//   appId: any;
// }

// interface ImportMeta  {
//   env: {
//     VITE_FIREBASE_API_KEY?:string;
//   }
// }


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
