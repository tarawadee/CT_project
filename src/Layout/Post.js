
import React, { useState,useEffect } from 'react';
import { getdataPost } from '../Firebase/Base'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});
function Post(props) {
    const classes = useStyles();
    const [data, setData] = useState({ covid: [] });
    const [ Post, setPost ] = useState({ post: [] });

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://covid19.th-stat.com/api/open/today',
            );

            setData({
                covid: result.data
            });
        };

        fetchData();
    }, []);
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

        <div className="login-form">


            <Card>
                <h1>
                    NewConfirmed
                    {data.covid.NewConfirmed}

                </h1>
                <p>
                    Recovered
                    {data.covid.Recovered}
                </p>
                <p>
                    Confirmed
                    {data.covid.Confirmed}
                </p>
                <p>
                    {data.covid.Hospitalized}
                </p>

                <h5>
                    {data.covid.Deaths}
                </h5>
            </Card>

            <div>
                { post.map( post => (

                    <Card className={classes.root} key={post} h1 style={{margin:10}} >
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