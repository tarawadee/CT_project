import cx from 'clsx';
import React, { useState,useEffect } from 'react';
import { getdataPost } from '../Firebase/Base'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Covid from "../components/covid";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
function Post(props) {
    const classes = useStyles();

    const [ Post, setPost ] = useState({ post: [] });


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


    const post = Object.entries(Post).map(([key, value]) => ({key, ...value}));



    return (

        <div className="post-form">

            <Covid/>

            <div>
                { post.map( post => (

                    <Card className={cx(classes.card)} key={post} h1 style={{marginTop:5}} >
                        <CardActionArea>
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
                                    {post.detail}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Share
                            </Button>
                            <Button size="small" color="primary">
                                Learn More
                            </Button>
                        </CardActions>
                    </Card>

                    ))}
            </div>


        </div>
    );
}

export default Post;