import React from 'react'
import './Login.css'
import {Link} from "react-router-dom"
import { useStateValue } from './StateProvider'

function Login() {
    
    const [email, setEmail] = useStateValue ('');
    const [password, setPassword] = useStateValue ('');

    const signIn = e => {
        e.preventDefault();
    
        // firebase signin stuff happens here
    }
    const register = e => {
        e.preventDefault();

        // firebase register stuff happens here
    }

    return (
        <div className="login">
            <Link to= '/'>
            <img className="login__logo"  src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="" />
            </Link>
            
            <div className="login__container">
                <h1>Sign-In</h1>
                <form action="">
                    <h5>E-mail</h5>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />

                    <button type='submit' onClick={signIn} className="login__signInButton">Sign-In</button>
                </form>

                <p>
                    By signing-in you agree to thee AMAZON CLONE Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button onClick={register} className="login__registerButton">Create your Amazon Account </button>
            </div>

        </div>
    )
}

export default Login
