
import React, { Component } from 'react'
import Login from "./Layout/Login";
import Home from "./Layout/Home";
import Post from "./Layout/Post";
import Singleblog from "./Layout/singleblog";
import { Route } from 'react-router-dom'
import EditPost from "./Layout/Editpost";
import Header from "./components/UI/Header";


class App extends Component {

    render() {
        return (

            <div>
                <Header/>
                <Route exact path="/login" component={Login} />
                <Route exact path="/post" component={Home} />
                <Route exact path="/posts/:documentId" component={Singleblog}/>
                <Route exact path="/editpost/:documentId" component={EditPost}/>
                <Route exact path="/" component={Post} />



            </div>
        )
    }
}

export default App