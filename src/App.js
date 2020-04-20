
import React, { Component } from 'react'
import Login from "./Layout/Login";
import Home from "./Layout/Home";
import { Route } from 'react-router-dom'



class App extends Component {
    render() {
        return (
            <div>

                <Route exact path="/admin" component={Login} />
                <Route exact path="/home" component={Home} />



            </div>
        )
    }
}

export default App