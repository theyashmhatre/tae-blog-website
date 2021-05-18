import * as firebaseAdmin from "firebase-admin";
import serviceAccount from './serviceAccountKey.json';

if (!serviceAccount) {
    console.log(
        `Failed to load Firebase credentials. Follow the instructions in the README to set your Firebase credentials inside environment variables.`
    );
}

if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert({
            projectId: process.env.PROJECTID,
            clientEmail: process.env.CLIENTEMAIL,
            privateKey: process.env.PRIVATEKEY,
        }),
        databaseURL: `https://${process.env.PROJECTID}.firebaseio.com`,
    });
}

const firestore = firebaseAdmin.firestore();
const auth = firebaseAdmin.auth();

export { firestore, auth };