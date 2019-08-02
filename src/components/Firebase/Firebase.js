import * as firebase from 'firebase/app';
import 'firebase/auth';

/* !!! move this to an environment variable !!! */
const firebaseConfig = {
	apiKey: "AIzaSyCm2gsdrHrCWZgG3dH-Gm0w6HsrO3ykGWs",
	authDomain: "data-comparison.firebaseapp.com",
	databaseURL: "https://data-comparison.firebaseio.com",
	projectId: "data-comparison",
	storageBucket: "",
	messagingSenderId: "43002367306",
	appId: "1:43002367306:web:b0ba55359e2e8685"
};

export default class Firebase {
	constructor() {
		firebase.initializeApp(firebaseConfig);
		this.auth = firebase.auth();
	}

	doCreateUserWithEmailAndPassword = (email, password) =>
  		this.auth.createUserWithEmailAndPassword(email, password);

	doSignInWithEmailAndPassword = (email, password) =>
		this.auth.signInWithEmailAndPassword(email, password);

	doSignOut = () => this.auth.signOut();

	// doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

	// doPasswordUpdate = password =>
	// 	this.auth.currentUser.updatePassword(password);
}
