import React from 'react';

import Card from "../components/UI/Card";
import './Login.css'

function Login() {
    return (
        <div className="login-form">
           <Card>
               <form >
                   <div className="form-control">
                       <label htmlFor="title">Name</label>
                       <input type="text" id="title" />
                   </div>
                   <div className="form-control">
                       <label htmlFor="amount">Password</label>
                       <input type="password" id="amount" />
                   </div>
                   <div className="logint-form__actions">
                       <button type="submit">Login</button>
                   </div>

               </form>
           </Card>
        </div>
    );
}

export default Login;