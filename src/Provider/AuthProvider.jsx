import React, { createContext, useEffect, useState } from 'react';
import app from './firebase.config';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import axios from 'axios';

const auth = getAuth(app)
export const AuthContext = createContext(null)

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState()


    //sign up users
    const signUpUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)

    }

    //sign In user
    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    //google sign in
    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    //sign Out
    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }



    useEffect(() => {
        const unSubcribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            if (currentUser) {
                const userInfo = { email: currentUser.email }

                //get token
                axios.post(`${import.meta.env.VITE_URL_PATH}/jwt`, userInfo)
                    .then(res => {

                        if (res.data.token) {
                            localStorage.setItem('accessToken', res.data.token)
                        }
                    })
            }
            else {
                localStorage.removeItem('accessToken')
            }
            setLoading(false)
        })
        return () => unSubcribe()
    }, [])


    const allData = {
        signUpUser,
        loading,
        signInUser,
        user,
        signOutUser,
        googleSignIn
    }

    return (
        <AuthContext.Provider value={allData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;