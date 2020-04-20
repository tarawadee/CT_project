
import React, { useState } from 'react';
import Card from "../components/UI/Card";
import * as firebase from "firebase/app";
import "firebase/firestore";

// export var firebaseConfig = {
//     apiKey: "AIzaSyBrCftH0OX1dg1up7vQ5RjkN60xd-KkXlc",
//     authDomain: "cswf-c8291.firebaseapp.com",
//     databaseURL: "https://cswf-c8291.firebaseio.com",
//     projectId: "cswf-c8291",
//     storageBucket: "cswf-c8291.appspot.com",
//     messagingSenderId: "344093463637",
//     appId: "1:344093463637:web:a0643578d21939dacd70dc",
//     measurementId: "G-JCCL3W6WQB"
// };
// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();


function Post() {




    return (
        <div className="login-form">


            <Card>
                <h1>
                    title

                </h1>
                <p>
                   tag
                </p>
                <h5>
                   detail
                </h5>
            </Card>

        </div>
    );
}

export default Post;