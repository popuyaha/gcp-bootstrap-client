import firebase from 'firebase'
import 'firebase/firestore'

const config = {
   apiKey: "AIzaSyBfwBPJzFoekAD4o_wpiYHISCskGTb6HkY",
   authDomain: "mlog-gcp.firebaseapp.com",
   databaseURL: "https://mlog-gcp.firebaseio.com",
   projectId: "mlog-gcp",
   storageBucket: "mlog-gcp.appspot.com",
   messagingSenderId: "64190399018"
};
firebase.initializeApp(config);
const db = firebase.firestore();
export default db;

// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.9.3/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.9.3/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyBfwBPJzFoekAD4o_wpiYHISCskGTb6HkY",
//     authDomain: "mlog-gcp.firebaseapp.com",
//     databaseURL: "https://mlog-gcp.firebaseio.com",
//     projectId: "mlog-gcp",
//     storageBucket: "mlog-gcp.appspot.com",
//     messagingSenderId: "64190399018",
//     appId: "1:64190399018:web:40e3b29d09ee057fa23953",
//     measurementId: "G-KWKGPRV0KK"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// </script>