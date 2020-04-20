
import React, { Component } from 'react'
import Login from "./Layout/Login";
import Home from "./Layout/Home";
import Post from "./Layout/Post";
import { Route } from 'react-router-dom'



class App extends Component {
    render() {
        return (
            <div>

                <Route exact path="/admin" component={Login} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/" component={Post} />



            </div>
        )
    }
}

export default App