import * as firebaseAdmin from "firebase-admin";

if (!process.env.PROJECTID || !process.env.CLIENTEMAIL || !process.env.PRIVATEKEY) {
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
        storageBucket: process.env.STORAGEBUCKET,

    });
}

const firestore = firebaseAdmin.firestore();
const auth = firebaseAdmin.auth();
const bucket = firebaseAdmin.storage().bucket();

export { firestore, auth, bucket };