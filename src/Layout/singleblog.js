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
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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
                altText: 'Flex Message',
                contents: {
                    type: 'bubble',
                    hero: {
                        type: 'image',
                        url: 'https://d2v9ipibika81v.cloudfront.net/uploads/sites/269/750x450_covid.jpg',
                        size: 'full',
                        aspectRatio: '20:13',
                        aspectMode: 'cover',
                        action: {
                            type: 'uri',
                            label: 'Line',
                            uri: 'https://linecorp.com/'
                        }
                    },
                    body: {
                        type: 'box',
                        layout: 'vertical',
                        contents: [
                            {
                                type: 'text',
                                text: 'Covid19 Cases',
                                size: 'xxl',
                                align: 'center',
                                weight: 'bold',
                                color: '#0F9265'
                            },
                            {
                                type: 'box',
                                layout: 'vertical',
                                spacing: 'sm',
                                margin: 'lg',
                                contents: [
                                    {
                                        type: 'box',
                                        layout: 'baseline',
                                        spacing: 'sm',
                                        contents: [
                                            {
                                                type: 'text',
                                                text: 'ผู้ป่วยใหม่',
                                                flex: 0,
                                                size: 'xl',
                                                weight: 'bold',
                                                color: '#D80F41',
                                                wrap: true
                                            },
                                            {
                                                type: 'text',
                                                text: "dsfds",
                                                flex: 1,
                                                size: 'xl',
                                                align: 'end',
                                                weight: 'bold',
                                                color: '#009619',
                                                wrap: true
                                            }
                                        ]
                                    },
                                    {
                                        type: 'box',
                                        layout: 'baseline',
                                        spacing: 'sm',
                                        contents: [
                                            {
                                                type: 'text',
                                                text: 'รักษาหายแล้ว',
                                                flex: 0,
                                                size: 'xl',
                                                weight: 'bold',
                                                color: '#0400A8'
                                            },
                                            {
                                                type: 'text',
                                                text: "dsf",
                                                flex: 5,
                                                size: 'lg',
                                                align: 'end',
                                                weight: 'bold',
                                                color: '#666666',
                                                wrap: true
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    footer: {
                        type: 'box',
                        layout: 'vertical',
                        flex: 0,
                        spacing: 'sm',
                        contents: [
                            {
                                type: 'spacer',
                                size: 'sm'
                            },
                            {
                                type: 'button',
                                action: {
                                    type: 'uri',
                                    label: 'รายงาน/Report',
                                    uri: 'https://www.worldometers.info/coronavirus/country/thailand/'
                                },
                                color: '#1B7445',
                                height: 'sm',
                                style: 'primary'
                            },
                            {
                                type: 'button',
                                action: {
                                    type: 'uri',
                                    label: 'สวัสดิการ/Benefits',
                                    uri: 'https://sproutstory.co/en/online-shop/store-front'
                                },
                                color: '#740812',
                                height: 'sm',
                                style: 'primary'
                            },
                        ]
                    }
                }
            }
        ]);
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