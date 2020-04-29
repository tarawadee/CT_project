import React, { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { createPost,storage } from '../Firebase/Base'
import Card from "../components/UI/Card";
import './Login.css'
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

function Login()
{
    const history = useHistory();
    const [user, setuser] = useState('');
    const uiConfig = {

        signInFlow: 'popup',

        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
        callbacks: {
            // Avoid redirects after sign-in.
            signInSuccess: () => false
        }
    }
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            setuser(user);
            console.log("user", user)
            if(user!=null){
                history.push("/");
            }

        })
    });
    const logout = () => {
        firebase.auth().signOut().then(response => {
            setuser(null)
            })
        }



    return (
        <div className="login-form">
           <Card>
               <p>Please sign-in:</p>
               <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
           </Card>
        </div>
    );
}

export default Login;