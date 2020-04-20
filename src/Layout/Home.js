
import React, { useState } from 'react';
import Card from "../components/UI/Card";
import { useHistory } from 'react-router-dom';


import * as firebase from "firebase/app";
import "firebase/firestore";

export var firebaseConfig = {
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
const db = firebase.firestore();


function Home() {


    const [title, settitle] = useState('');
    const [tag, settag] = useState('');
    const [detail, setdetail] = useState('');
    const history = useHistory();
    const postnew = (title, tag,detail) => {
        return db.collection('Post')
            .add({

                 title: title,
                 tag: tag,
                 detail: detail,
                 created: firebase.firestore.FieldValue.serverTimestamp(),

            });
        history.push('/')
        };




    return (
        <div className="login-form">

            <Card>


                    <h3>สร้างกระทู้ประชาสัมพันธ์</h3>
                    <div className="form-control">
                        <label htmlFor="title">หัวข้อ</label>
                        <input type="text" id="title" onChange={e =>settitle(e.target.value)} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="tag">tag</label>
                        <input type="text" id="title" onChange={e =>settag(e.target.value)} />
                    </div>

<div>

    <div className="form-control">
        <label htmlFor="tag">Detail</label>
        <textarea type="text" id="title" onChange={e =>setdetail(e.target.value)}  rows="4" cols="50"/>
    </div>

</div>


                    <div className="logint-form__actions">
                        <button onClick={() =>postnew(title,tag,detail)} >Preview</button>
                    </div>


            </Card>
            <br/>
            <Card>
                <h1>
                    {title}

                </h1>
                <p>
                    {tag}
                </p>
                <h5>
                    {detail}
                </h5>
            </Card>

        </div>
    );
}

export default Home;