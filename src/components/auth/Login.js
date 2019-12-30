import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import NoAuthNavigation from '../navigation/NoAuthNavigation';

import './Auth.css';

class Login extends Component {
    render() {
        return (
            <div>
                <NoAuthNavigation />
                <div className="form-center">
                    <form>
                        <h1>Login</h1>
                        <input placeholder="Username" type="text" />
                        <input placeholder="Password" type="password" />
                        <input value="Submit" type="submit" />
                        <p>
                            Don't have an account? <NavLink to="/signup">Sign Up</NavLink>
                        </p>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;