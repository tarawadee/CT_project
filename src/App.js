
import React, { Component } from 'react'
import Login from "./Layout/Login";
import Home from "./Layout/Home";
import Post from "./Layout/Post";
import { Route } from 'react-router-dom'
import Header from "./components/UI/Header";


class App extends Component {
    render() {
        return (

            <div>
                <Header/>
                <Route exact path="/login" component={Login} />
                <Route exact path="/post" component={Home} />
                <Route exact path="/" component={Post} />



            </div>
        )
    }
}

export default App