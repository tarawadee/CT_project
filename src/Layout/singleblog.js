import React, {useEffect, useState} from 'react';
import { getpostbyid } from '../Firebase/Base'
import { useLocation } from 'react-router-dom';
import {
    Root,
    Header,
    Sidebar,
    CollapseBtn,
    CollapseIcon,
    SidebarTrigger,
    SidebarTriggerIcon,
    Content,
    Footer,
} from '@mui-treasury/layout';

import { createMuiTheme } from '@material-ui/core/styles';
import firebase from "firebase";


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

function Singleblog(props) {

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
        <Root theme={customTheme} config={config}>

                <>

                    <Content>
                    <h1>{Post.title}</h1>
                    </Content>

                </>

        </Root>
    );
}

export default Singleblog;