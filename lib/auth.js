import React, { useState, useEffect, useContext, createContext } from 'react';
import Router from 'next/router';
import firebase from "../config/config";
import "firebase/auth";
import { createUser } from "./db";

const authContext = createContext();

export function AuthProvider({ children }) {
    const auth = useFirebaseAuth();
    return (<authContext.Provider value={auth}>{children}</authContext.Provider>);
}

export const useAuth = () => {
    return useContext(authContext);
};

function useFirebaseAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleUser = async (rawUser) => {
        if (rawUser) {
            const user = await formatUser(rawUser);
            const { token, ...userWithoutToken } = user;
            // console.log(user);
            // console.log(token);

            createUser(user.uid, userWithoutToken);
            setUser(user);

            setLoading(false);
            return user;
        } else {
            setUser(false);
            setLoading(false);
            return false;
        }
    };
    const signinWithGoogle = (redirect) => {
        // console.log(redirect);
        setLoading(true);
        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((response) => {
                handleUser(response.user);
                // console.log(response);

                if (redirect) {
                    // console.log("redirect true");
                    Router.push(redirect);
                }
            });
    };

    const signout = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => handleUser(false));
    };

    useEffect(() => {
        const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);
        return () => unsubscribe();
    }, []);

    return {
        user,
        loading,
        signinWithGoogle,
        signout,
    };
}

const formatUser = async (user) => {
    // const token = await user.getIdToken(/* forceRefresh */ true);
    const decodedToken = await user.getIdTokenResult(/*forceRefresh*/ true);
    const { token, expirationTime } = decodedToken;
    // console.log(token);
    return {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        provider: user.providerData[0].providerId,
        photoUrl: user.photoURL,
        token,
        expirationTime,
        // stripeRole: await getStripeRole(),
    };
};