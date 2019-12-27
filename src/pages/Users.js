import React, { Component } from 'react';
import User from '../components/users/User';
import NoAuthNavigation from '../components/navigation/NoAuthNavigation';

import axios from 'axios';

import './Users.css';

class Users extends Component {

    state = {
        persons: []
    }

    componentDidMount() {
        axios.get('https://randomuser.me/api/?results=3').then(persons => {
            this.setState({
                persons: persons.data.results
            });
        })
    }

    render() {
        return (
            <div>
                <NoAuthNavigation />
                <h1>Users</h1>
                <div className="user-container">
                {this.state.persons.map(person => (
                    <User {...person} key={person.login.uuid} />
                ))}
                </div>
            </div>
        )
    }
}

export default Users;