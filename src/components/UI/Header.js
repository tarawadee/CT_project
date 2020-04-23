import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import firebase from "firebase";
import {useHistory} from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


export default function Header() {
    const classes = useStyles();
    const history = useHistory();


    const links = () => {
        history.push("/post");

    }
    const logout = () => {
        firebase.auth().signOut().then(response => {
            history.push("/login");
        })

    }
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <AddIcon onClick={links}/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        BlogBig
                    </Typography>
                    <Button color="inherit" onClick={logout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}