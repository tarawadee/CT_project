
import React, { useState } from 'react';
import Card from "../components/UI/Card";
import { useHistory } from 'react-router-dom';
import { createPost } from '../Firebase/Base'

function Home() {


    const [title, settitle] = useState('');
    const [tag, settag] = useState('');
    const [detail, setdetail] = useState('');
    const history = useHistory();
    const sucess = (title,tag,detail) => {
        createPost(title,tag,detail)
        history.push("/");
        console.log("link")
    }





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
                        <button onClick={() =>sucess(title,tag,detail)} >Preview</button>
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