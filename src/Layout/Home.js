import React from 'react';

import Card from "../components/UI/Card";
import TextEdit from "../components/TextEditer/TextEdit";
function Home() {
    return (
        <div className="login-form">

            <Card>

                <form >
                    <h3>สร้างกระทู้ประชาสัมพันธ์</h3>
                    <div className="form-control">
                        <label htmlFor="title">หัวข้อ</label>
                        <input type="text" id="title" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="tag">tag</label>
                        <input type="text" id="tag" />
                    </div>

<div>

    <TextEdit/>

</div>


                    <div className="logint-form__actions">
                        <button type="submit">โพสกระทู้</button>
                    </div>

                </form>
            </Card>
        </div>
    );
}

export default Home;