import React, { Component } from 'react';
import { connect } from 'react-redux';

import PostCard from '../../components/card/PostCard';
import Spinner from '../../components/spinner/Spinner';
import CreatePostButton from '../../components/createPostButton/CreatePostButton';

import * as actions from '../../store/actions/index';

import './HomeContainer.css';


class Home extends Component {

    componentDidMount() {
        if (this.props.posts.length < 1) {
            this.props.getPosts()
        }
    }

    render() {
        return (
            <div>
                <div className="main-header">
                    {this.props.posts.length > 0 ? this.props.posts.map(post => (
                        <PostCard {...post} loggedInUser={this.props.username} key={post._id} />
                    )) : <div>
                            <p className="load-warning">Please be patient while our backend wakes up.</p>
                            <Spinner />
                        </div>}
                    {this.props.username ? <CreatePostButton /> : null}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.index.posts,
        username: state.index.username
    }
}

const mapDispatchToProps = dispatch => ({
    getPosts: () => dispatch(actions.getPosts())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);