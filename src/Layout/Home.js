
import React, { useState } from 'react';
import Card from "../components/UI/Card";
import ReactTags from 'react-tag-autocomplete'
import TextEdit from "../components/TextEditer/TextEdit";
function Home() {


    const [title, settitle] = useState('');
    const [tag, settag] = useState('');





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
                        <ReactTags/>
                    </div>

<div>

    <TextEdit/>

</div>


                    <div className="logint-form__actions">
                        <button>Preview</button>
                    </div>


            </Card>
            <br/>
            <Card>
                <h1>
                    {title}
                </h1>
            </Card>

        </div>
    );
}

export default Home;