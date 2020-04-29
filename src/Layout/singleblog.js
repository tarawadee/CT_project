import React, {useEffect, useState} from 'react';
import { getpostbyid } from '../Firebase/Base'
import { useLocation } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import {createMuiTheme, makeStyles} from '@material-ui/core/styles';
import firebase from "firebase";
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import liffHelper from "../components/liffHelper";
import Button from "@material-ui/core/Button";

const liff = window.liff;
const useStyles = makeStyles((theme) => ({
    root: {

    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));



function Singleblog(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);


   const sendMessage =() => {
            liff.sendMessages([{
                type: 'text',
                text: "Hi LIFF"
            }]).then(() => {
                liff.closeWindow();
            });
        };


    const location = useLocation();
    const { match } = props;
    const [Params, setParams] = useState('');
    const [Post, setPost] = useState('');
    let { documentId } = match.params

    useEffect(() => {
        getpostbyid(documentId).then((docRef) => {
            setPost(docRef.data())
        })
            .catch((error) => {
            })
    });

    return (

        <Container fixed style={{marginTop:10}}>
            <Card >

                <CardMedia
                    className={classes.media}
                    image={Post.url}
                    title="Paella dish"
                />
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar} src={Post.photoURL}>

                        </Avatar>
                    }

                    title={Post.displayName}
                    // subheader={Post.created}
                />
                <CardContent>
                    <h1>{Post.title}</h1>
                    <Typography variant="body2" color="textSecondary" component="p">
                       <p>{Post.detail}</p>
                    </Typography>
                </CardContent>
                <Button size="small" color="primary"
                        onClick={sendMessage}
                        aria-label="show more"
                >
                    line share
                </Button>
            </Card>

        </Container>





    );
}

export default Singleblog;