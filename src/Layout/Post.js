import cx from 'clsx';
import React, { useState,useEffect } from 'react';
import { getdataPost,Delete } from '../Firebase/Base';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Covid from "../components/covid";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import firebase from "firebase";
import {useHistory} from "react-router-dom";
const liff = window.liff;
const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    media: {
        height: 140,
    },
    card: {
        borderRadius: 12,
        minWidth: 256,
        textAlign: 'center',
    },
    av: {
        display: 'flex',

    }
});
function Post(props) {
    const classes = useStyles();
    const history = useHistory();
    const [ Post, setPost ] = useState({ post: [] });
    const [checkuser, setcheckuser] = useState( [ { uid: 'Bob' } ]);



    const readmore = (documentId) => {
        history.push(`/posts/${documentId}`);
        const idToken = liff.getDecodedIDToken();
        console.log(idToken)
    };
    useEffect(() => {

        const unsubscribe = getdataPost.onSnapshot(ss => {

            let Post = [];

            ss.forEach(document => {

               Post[document.id] = document.data()
            })


            setPost(Post)
        })

        return () => {

            unsubscribe()
        }
    }, [])
    useEffect(() => {

        firebase.auth().onAuthStateChanged(user => {
            if(user!=null) {
                setcheckuser(user);
            }

        })
console.log(checkuser)
    });

    const post = Object.entries(Post).map(([key, value]) => ({key, ...value}));

    const Deletepost = (id) => {
        Delete(id)
        console.log(id)
    };


    return (

        <div className="post-form">

            <Covid/>

            <Grid container spacing={1} style={{marginTop:5}} >

                { post.map( post => (
                    <Grid item xs={12} sm={3} >
                    <Card className={cx(classes.card)} key={post}  style={{marginTop:5}} >
                        <CardActionArea>
                            <div className={classes.av}>
                            <Avatar alt="Remy Sharp" src={post.photoURL}  style={{margin:5}}/>
                            <p style={{margin:10}}>{post.displayName}</p>
                            </div>
                            <CardMedia
                                className={classes.media}
                                image={post.url}
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {post.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {post.tag}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>

                            {post.uid==checkuser.uid ? (
                                <Button onClick={() => Deletepost(post.key)} size="small" color="secondary">
                                ลบ
                                </Button>
                                ) : (
                                <p></p>
                                )}


                            <Button size="small" color="primary"
                                    onClick={ () => readmore(post.key)}
                                    aria-label="show more"
                            >
                                Learn More
                            </Button>
                        </CardActions>


                    </Card>
                    </Grid>
                    ))}


            </Grid>


        </div>


    );
}

export default Post;