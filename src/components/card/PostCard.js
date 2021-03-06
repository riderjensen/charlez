import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck, faChevronUp, faComment } from '@fortawesome/free-solid-svg-icons';
import { CircularProgressbar } from 'react-circular-progressbar';

import './Card.css';
import 'react-circular-progressbar/dist/styles.css';

import * as actions from '../../store/actions/index';

class PostCard extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    state = {
        editing: false,
        deleting: false,
        postContent: this.props.content,
        votes: this.props.votes,
        username: this.props.username,
        edited: this.props.edited,
        votedUp: this.props.votedUp || false,
    }

    startEditing = _ => {
        this.setState({
            editing: true
        })
    }

    endEditing = _ => {
        this.setState({
            editing: false,
            postContent: this.props.content
        })
    }

    toggleDeleting = _ => {
        this.setState({
            deleting: !this.state.deleting
        })
    }

    handleChange(event) {
        // change the inputs in the state
        const myStateObj = {};
        myStateObj[event.target.name] = event.target.value;
        this.setState(myStateObj);
    }

    editPost = event => {
        event.preventDefault();
        this.setState({
            editing: false
        });
        this.props.editPost({
            content: this.state.postContent,
            id: this.props._id
        });
    }

    votePost = event => {
        event.preventDefault();
        let newVotes = this.state.votes;
        newVotes++;
        this.setState({
            votes: newVotes,
            votedUp: true,
        })
        this.props.votePost({
            id: this.props._id
        });
    }

    unVotePost = event => {
        event.preventDefault();
        let newVotes = this.state.votes;
        newVotes--;
        this.setState({
            votes: newVotes,
            votedUp: false,
        })
        this.props.unVotePost({
            id: this.props._id
        });
    }

    deletePost = event => {
        event.preventDefault();
        this.setState({
            deleting: false
        });
        this.props.deletePost({
            id: this.props._id
        });
    }

    render() {

        return (
            <div className="card">
                {this.state.editing   
                ? 
                <div className="content edit">
                    <div className="utilButtons">
                        {this.state.postContent.length <= 250 ? <FontAwesomeIcon className="icon editIcons" icon={faCheck} onClick={this.editPost} /> : <FontAwesomeIcon className="icon editIcons disabled" icon={faCheck} />}
                        <CircularProgressbar className={this.state.postContent.length > 250 ? 'svgerror' : null} value={this.state.postContent.length} maxValue={250} minValue={0} strokeWidth={25} />
                        <FontAwesomeIcon className="icon editIcons" icon={faTimes} onClick={this.endEditing} />  
                    </div>
                    <textarea name="postContent" value={this.state.postContent} onChange={this.handleChange} />
                </div> : this.state.deleting ?
                    <div className="content edit delete">
                        <p>Are you sure you want to delete this post?</p>
                        <button className="danger" onClick={this.deletePost}>Confirm</button>
                        <button onClick={this.toggleDeleting}>Cancel</button>
                    </div>
                : this.props.user === this.props.loggedInUser && this.state.username 
                    ? 
                    <div className="content">
                        <div className="utilButtons">
                            <span className="votes">{this.state.votes}</span>
                        </div>
                        <h5 className="card-title"><NavLink  to={'/post/'+this.props._id}>{this.state.postContent}</NavLink></h5>
                        <div className="postInfo">
                            {this.state.edited ? "Edited  -  " : null}<FontAwesomeIcon className="icon" icon={faComment} /> {this.props.comments.length} - <span className="clickable" onClick={this.startEditing}>Edit</span> <span className="clickable" onClick={this.toggleDeleting}>Delete</span>
                        </div>
                    </div>
                    : this.state.username && this.props.user !== this.props.loggedInUser
                    ? 
                    <div className="content">
                        <div className="utilButtons">
                            <FontAwesomeIcon className={this.state.votedUp ? 'icon votedUp' : 'icon'} onClick={this.state.votedUp ? this.unVotePost : this.votePost} icon={faChevronUp} />
                            <span className="votes">{this.state.votes}</span>
                        </div>
                        <h5 className="card-title"><NavLink  to={'/post/'+this.props._id}>{this.state.postContent}</NavLink></h5>
                        <div className="postInfo">
                            {this.state.edited ? "Edited  -  " : null}<FontAwesomeIcon className="icon" icon={faComment} /> {this.props.comments.length}
                        </div>
                    </div> 
                    : <div className="content">
                        <div className="utilButtons">
                            <span className="votes">{this.state.votes}</span>
                        </div>
                        <h5 className="card-title"><NavLink  to={'/post/'+this.props._id}>{this.state.postContent}</NavLink></h5>
                        <div className="postInfo">
                            {this.state.edited ? "Edited  -  " : null}<FontAwesomeIcon className="icon" icon={faComment} /> {this.props.comments.length}
                        </div>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.index.username
    }
}

const mapDispatchToProps = dispatch => ({
    editPost: editObj => dispatch(actions.editPost(editObj)),
    votePost: id => dispatch(actions.votePost(id)),
    deletePost: id => dispatch(actions.deletePost(id)),
    unVotePost: id => dispatch(actions.unVotePost(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostCard);
