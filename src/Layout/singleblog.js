import React, {useEffect, useState} from 'react';
import { getpostbyid } from '../Firebase/Base'
import { useLocation } from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';

import {createMuiTheme, makeStyles} from '@material-ui/core/styles';
import firebase from "firebase";
import Card from "@material-ui/core/Card";
import cx from "clsx";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";



const customTheme = createMuiTheme({
    palette: { primary: { main: '#ff5252' } },
});

const config = {
    sidebar: {
        anchor: 'left',
        width: 256,
        variant: 'persistent',
        collapsible: true,
        collapsedWidth: 64,
    },
    header: {
        position: 'relative',
        offsetHeight: 64,
        clipped: false,
        persistentBehavior: 'fit',
    },
    content: {
        persistentBehavior: 'fit',
    },
    footer: {
        persistentBehavior: 'flexible',
    },
};
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
function Singleblog(props) {

    const location = useLocation();
    const { match } = props;
    const [Params, setParams] = useState('');
    const [Post, setPost] = useState('');
    let { documentId } = match.params
    const classes = useStyles();
    useEffect(() => {
        getpostbyid(documentId).then((docRef) => {
            setPost(docRef.data())
        })
            .catch((error) => {
            })
    });

    return (
        <div>
            <Card className={cx(classes.card)}  style={{marginTop:5}}>

                <CardActionArea>

                    <CardMedia
                        className={classes.media}
                        image={Post.url}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <h1>{Post.title}</h1>
                        <p>{Post.detail}</p>
                    </CardContent>
                </CardActionArea>






            </Card>
        </div>
    );
}

export default Singleblog;