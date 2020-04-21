
import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import { useHistory } from 'react-router-dom';
import { createPost,storage } from '../Firebase/Base'

function Home() {


    const [title, settitle] = useState('');
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState("");
    const [tag, settag] = useState('');
    const [detail, setdetail] = useState('');
    const history = useHistory();
    const sucess = (title,tag,detail,url) => {
        createPost(title,tag,detail,url)
        history.push("/");
        console.log("link")
    }
    const handChange = e => {
        const file = e.target.files[0];
        if (file) {
            const fileType = file["type"];
            const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
            if (validImageTypes.includes(fileType)) {
                setError("");
                setImage(file);
            } else {
                setError("Please select an image to upload");
            }
        }
    };

    const handleUpdate = () => {
        if (image) {
            const uploadTask = storage.ref(`images/${image.name}`).put(image);

            uploadTask.on(
                "state_changed",
                snapshot => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);
                },
                error => {
                    setError(error);
                },
                () => {
                    storage
                        .ref("images")
                        .child(image.name)
                        .getDownloadURL()
                        .then(url => {
                            setUrl(url);
                            setProgress(0);
                        });
                }
            );
        } else {
            setError("Error please choose an image to upload");
        }
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
    <div>
        <div>
            <input type="file" onChange={handChange} />{" "}
            <button onClick={handleUpdate}> Upload</button>
        </div>
        <div style={{ height: "100px" }}>
            {progress > 0 ? <progress value={progress} max="100" /> : ""}
            <p style={{ color: "red" }}>{error}</p>
        </div>

    </div>
</div>


                    <div className="logint-form__actions">
                        <button onClick={() =>sucess(title,tag,detail,url)} >Preview</button>
                    </div>


            </Card>
            <br/>
            <Card>
                <h1>
                    {title}

                </h1>
                {url ? (
                    <img src={url} alt="logo" />
                ) : (
                    <img className="App-logo" alt="logo" />
                )}
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