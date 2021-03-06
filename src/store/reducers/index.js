import * as actionTypes from '../actionTypes';

const initialState = {
	username: null,
	modal: false,
	posts: [],
	userPosts: [],
	selectedPost: {},
	error: null,
	chat: []
  }
  
export default function reducer(state = initialState, action) {
	switch (action.type) {
		case actionTypes.LOGIN_USER:
			return {...state, username: action.payload}
		case actionTypes.LOGOUT_USER:
			return {...state, username: null}
		case actionTypes.SIGN_UP_USER:
			return {...state, username: action.payload}
		case actionTypes.SUBMIT_POST:
			return {...state, posts: action.payload}
		case actionTypes.GET_POSTS:
			return {...state, posts: action.payload}
		case actionTypes.GET_USER_POSTS:
			return {...state, userPosts: action.payload}
		case actionTypes.DELETE_USER_POST:
			return {...state, userPosts: action.payload}
		case actionTypes.GET_ONE_POST:
			return {...state, selectedPost: action.payload}
		case actionTypes.ADD_ERROR:
			return {...state, error: action.payload}
		case actionTypes.CLEAR_ERROR:
			return {...state, error: null}
		case actionTypes.DELETE_POST:
			return {...state, posts: action.payload}
		case actionTypes.ADD_COMMENT:
			return {...state, selectedPost: action.payload}
		case actionTypes.ADD_USER_COMMENT:
			return {...state, userPosts: action.payload}
		case actionTypes.DELETE_COMMENT:
			return {...state, selectedPost: action.payload}
		case actionTypes.DELETE_USER_COMMENT:
			return {...state, userPosts: action.payload}
		case actionTypes.SUBMIT_CHAT:
			return {...state, chat: action.payload}
		default:
			return state;
	}
}