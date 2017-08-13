import React, { Component } from 'react';
import './App.css';
import * as actions from './actions'
import { connect } from 'react-redux'
import Post from './components/post'

class App extends Component {
  state = {
    posts: null,
    comments: null
  }


  render() {
    var keys = Object.keys(this.props.posts);
    return (
      <div className="App">
        <div className="Main">
          {keys.map((key) => (
            <Post key={key} post={this.props.posts[key]} />
          ))}
          </div>
      </div>

    );
  }
}

function mapStateToProps ({ posts, comments }) {
  return {
    posts,
    comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addPost: (data) => dispatch(actions.addPost(data)),
    editPost: (data) => dispatch(actions.editPost(data)),
    deletePost: (data) => dispatch(actions.deletePost(data)),
    upvotePost: (data) => dispatch(actions.upvotePost(data)),
    downvotePost: (data) => dispatch(actions.downvotePost(data)),
    addComment: (data) => dispatch(actions.addComment(data)),
    editComment: (data) => dispatch(actions.editComment(data)),
    deleteComment: (data) => dispatch(actions.deleteComment(data)),
    upvoteComment: (data) => dispatch(actions.upvoteComment(data)),
    downvoteComment: (data) => dispatch(actions.downvoteComment(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
