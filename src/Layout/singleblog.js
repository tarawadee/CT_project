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

    const line = () => {

        liff.sendMessages([
            {
                type: 'flex',
                altText: 'Food Delivery',
                contents: {
                    type: 'bubble',
                    hero: {
                        type: 'image',
                        url: 'https://s3-ap-southeast-1.amazonaws.com/img-in-th/17bdc2efae15a634fdbc1d586d958f4c.jpg',
                        size: 'full',
                        aspectRatio: '1:1',
                        backgroundColor: '#d6cd29',
                        action: {
                            type: 'uri',
                            label: 'Action',
                            uri: 'https://sproutstory.co/en/eating'
                        }
                    },
                    body: {
                        type: 'box',
                        layout: 'horizontal',
                        spacing: 'md',
                        contents: [
                            {
                                type: 'box',
                                layout: 'vertical',
                                flex: 1,
                                contents: [
                                    {
                                        type: 'image',
                                        url: 'https://s3-ap-southeast-1.amazonaws.com/img-in-th/68987007116cf02b0da2be98db7a9cc4.jpg',
                                        gravity: 'bottom',
                                        size: 'sm',
                                        aspectRatio: '4:3',
                                        aspectMode: 'cover'
                                    },
                                    {
                                        type: 'image',
                                        url: 'https://s3-ap-southeast-1.amazonaws.com/img-in-th/c3b90b94e8c605558c02c9a42773ff19.png',
                                        margin: 'md',
                                        size: 'sm',
                                        aspectRatio: '4:3',
                                        aspectMode: 'cover'
                                    }
                                ]
                            },
                            {
                                type: 'box',
                                layout: 'vertical',
                                flex: 2,
                                contents: [
                                    {
                                        type: 'text',
                                        text: 'ร้านอาหารหลากหลาย',
                                        flex: 1,
                                        size: 'xs',
                                        gravity: 'top'
                                    },
                                    {
                                        type: 'separator'
                                    },
                                    {
                                        type: 'text',
                                        text: 'มีเมนูให้เลือกไม่ซ้ำ',
                                        flex: 2,
                                        size: 'xs',
                                        gravity: 'center'
                                    },
                                    {
                                        type: 'separator'
                                    },
                                    {
                                        type: 'text',
                                        text: 'ไม่ต้องโหลดแอพ',
                                        flex: 2,
                                        size: 'xs',
                                        gravity: 'center'
                                    },
                                    {
                                        type: 'separator'
                                    },
                                    {
                                        type: 'text',
                                        text: 'บริการรวดเร็ว',
                                        flex: 1,
                                        size: 'xs',
                                        gravity: 'bottom'
                                    }
                                ]
                            }
                        ]
                    },
                    footer: {
                        type: 'box',
                        layout: 'horizontal',
                        contents: [
                            {
                                type: 'button',
                                action: {
                                    type: 'uri',
                                    label: 'Order now',
                                    uri: 'https://lin.ee/36M5ly2'
                                },
                                color: '#032250',
                                style: 'primary'
                            }
                        ]
                    }
                }
            }
        ])

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
                        onClick={ () => line()}
                        aria-label="show more"
                >
                    line share
                </Button>
            </Card>

        </Container>





    );
}

export default Singleblog;