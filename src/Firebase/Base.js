import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth"
import "firebase/storage";
import {useEffect, useState} from "react";

const firebaseConfig = {
    apiKey: "AIzaSyBrCftH0OX1dg1up7vQ5RjkN60xd-KkXlc",
    authDomain: "cswf-c8291.firebaseapp.com",
    databaseURL: "https://cswf-c8291.firebaseio.com",
    projectId: "cswf-c8291",
    storageBucket: "cswf-c8291.appspot.com",
    messagingSenderId: "344093463637",
    appId: "1:344093463637:web:a0643578d21939dacd70dc",
    measurementId: "G-JCCL3W6WQB"
};

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

export const authenticateAnonymously = () => {
    return firebase.auth().signInAnonymously();
};

export const createPost = (title,tag,detail,url,photoURL,uid,displayName) => {
    return db.collection('Post')
        .add({
            title: title,
            tag: tag,
            detail: detail,
            url: url,
            photoURL:photoURL,
            uid:uid,
            displayName:displayName,
            created: firebase.firestore.FieldValue.serverTimestamp(),
        });
};

export const updatePost = (title,tag,detail,url,photoURL,uid,displayName,docid) => {
    return db.collection('Post').doc(docid)
        .update({
            title: title,
            tag: tag,
            detail: detail,
            url: url,
            photoURL:photoURL,
            uid:uid,
            displayName:displayName,
            created: firebase.firestore.FieldValue.serverTimestamp(),
        });
};

export const getdataPost = db.collection('Post');
export const getpostbyid = (id) =>{
    return db.collection('Post').doc(id).get()

}
export const Delete =(key) => {
    return db.collection('Post').doc(key).delete();

    }

export const storage = firebase.storage();


