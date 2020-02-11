import React, { Component } from 'react';
import { connect } from 'react-redux';

import PostCard from '../card/PostCard';
import CommentCard from '../card/CommentCard';
import Spinner from '../spinner/Spinner';

import * as actions from '../../store/actions/index';

import './Profile.css';


class Profile extends Component {

    logOutFunction = event => {
        event.preventDefault();
        this.props.userLogout();
    }

    componentDidMount() {
        this.props.getUserPostsAndComments()
    }

    render() {
        return (
            <div className="profile">
                <div className="userInfo">
                    <h1>{this.props.username.toUpperCase()}</h1>
                    <button className="danger" onClick={this.logOutFunction}>Logout</button>
                </div>
                {this.props.userPosts.length > 0 ? this.props.userPosts.map(card => {
                    if (card.type === "post") {
                        return <PostCard {...card} loggedInUser={this.props.username} key={card._id} />
                    } else {
                        return <CommentCard {...card} loggedInUser={this.props.username} key={card._id} />
                    }                       
                }) : <Spinner />}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userPosts: state.index.userPosts,
        username: state.index.username
    }
}

const mapDispatchToProps = dispatch => ({
    getUserPostsAndComments: () => dispatch(actions.getUserPostsAndComments()),
    userLogout: () => dispatch(actions.userLogout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
