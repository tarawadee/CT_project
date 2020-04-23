
import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { createPost,storage } from '../Firebase/Base'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import cx from "clsx";
import firebase from "firebase";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    card: {
        borderRadius: 12,
        minWidth: 256,
        textAlign: 'center',
    },
});
function Home() {

    const classes = useStyles();
    const [title, settitle] = useState('');
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [user, setuser] = useState('');
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState("");
    const [tag, settag] = useState('');
    const [detail, setdetail] = useState('');
    const history = useHistory();
    const sucess = (title,tag,detail,url,photoURL,uid,displayName) => {
        createPost(title,tag,detail,url,photoURL,uid,displayName)
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
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            setuser(user);
            console.log("user", user)

        })
    });



    return (
        <div className="login-form">

            <Card className={cx(classes.card)}  style={{marginTop:5}}>

                <CardActionArea>

                    <CardMedia
                        className={classes.media}
                        image={url}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                    <div className="form-control">
                        <label htmlFor="title">หัวข้อ</label>
                        <input type="text" id="title" onChange={e =>settitle(e.target.value)} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="tag">tag</label>
                        <input type="text" id="title" onChange={e =>settag(e.target.value)} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="tag">Detail</label>
                        <textarea type="text" id="title" onChange={e =>setdetail(e.target.value)}  rows="4" cols="50"/>
                    </div>
                        <div>
                            <input type="file" onChange={handChange} />{" "}
                            <Button onClick={handleUpdate}> Upload</Button>
                        </div>
                        <div style={{ height: "100px" }}>
                            {progress > 0 ? <progress value={progress} max="100" /> : ""}
                            <p style={{ color: "red" }}>{error}</p>
                        </div>
                    </CardContent>
                </CardActionArea>



                    <div className="logint-form__actions">
                        <button onClick={() =>sucess(title,tag,detail,url,user.photoURL,user.uid,user.displayName)} >Preview</button>
                    </div>


            </Card>
            <br/>


        </div>
    );
}

export default Home;