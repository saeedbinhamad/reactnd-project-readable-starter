import React, { Component } from 'react';
import '../App.css';
import * as actions from '../actions'
import { connect } from 'react-redux'
import * as api from '../api'
import { Link } from 'react-router-dom'

import Comment from '../components/comment'

class Post extends Component {
  constructor(props) {
    super(props);
    this.sortChanged = this.sortChanged.bind(this);
    this.childChanged = this.childChanged.bind(this);
    this.buildComments();
  }

  state = {
    sort: '',
    displayEditor: 'none',
    titleInput: this.props.post.title,
    bodyInput: this.props.post.body,
    opacity: 0,
    visibility: "hidden"
  }

  buildComments() {
    fetch("http://localhost:5001/posts/" + this.props.post.id + "/comments",
    {method: "GET", headers: api.headers_one()})
    .then((resp) => {
      resp.json().then((data) => {
        if(data.length > 0) {
          var obj = {
            type: actions.BUILD_COMMENTS,
            posts: this.props.posts,
            comments: data
          }
          this.props.buildComments(obj);
          this.setState({
            titleInput: this.props.post.title,
            bodyInput: this.props.post.body
          });
        }
      })
    })
  }

  getCommentsLength() {
    var num;
    var array;

    if(Array.isArray(this.props.comments)){
      array = this.props.comments.filter((comment) => {
        return comment.parentId === this.props.post.id && comment.deleted === false;
      });
      num = array.length;
    }
    else {
      var keys = Object.keys(this.props.comments);
      array = keys.filter((comment_id) => {
        return this.props.comments[comment_id].parentId === this.props.post.id && this.props.comments[comment_id].deleted === false;
      });
      num = array.length;
    }

    return num;
  }

  toggleEditor() {
    var value = this.state.displayEditor === 'none' ? "block" : "none";
    this.setState({displayEditor: value});
  }

  updateTitleInput(input) {
    this.setState({titleInput: input});
  }

  updateBodyInput(input) {
    this.setState({bodyInput: input});
  }

  confirmPostEdits() {
    if(this.state.titleInput < 5) {
      alert("Title Must Be At Least 5 Characters");
      return;
    }
    if(this.state.bodyInput < 5) {
      alert("Body Must Be At Least 5 Characters");
      return;
    }

    fetch("http://localhost:5001/posts/" + this.props.post.id,
    {method: "PUT", body:JSON.stringify({title: this.state.titleInput.trim(), body: this.state.bodyInput.trim()}), headers: api.headers_one()})
    .then((resp) => {
      resp.json().then((data) => {
        var obj = {
          type: actions.EDIT_POST,
          id: this.props.post.id,
          title: data.title,
          body: data.body
        }

        this.props.editPost(obj);
        this.toggleEditor();
        this.success();
      })
    })
  }

  success() {
    this.setState({opacity: 1, visibility: "visible"}, () => {
      setTimeout(() => {
        this.setState({opacity: 0, visibility: "hidden"});
      } , 2000);
    })
  }

  upvotePost() {
    fetch("http://localhost:5001/posts/" + this.props.post.id,
    {method: "POST", body:JSON.stringify({option: "upVote"}), headers: api.headers_one()})
    .then((resp) => {
      resp.json().then((data) => {
        var obj = {
          type: actions.UPVOTE_POST,
          id: this.props.post.id,
          voteScore: data.voteScore
        }

        this.props.upvote_post(obj);
        this.forceUpdate();
        if(this.props.sortChanged){
          this.props.sortChanged();
        }
      })
    })
  }

  downvotePost() {
    fetch("http://localhost:5001/posts/" + this.props.post.id,
    {method: "POST", body:JSON.stringify({option: "downVote"}), headers: api.headers_one()})
    .then((resp) => {
      resp.json().then((data) => {
        var obj = {
          type: actions.DOWNVOTE_POST,
          id: this.props.post.id,
          voteScore: data.voteScore
        }

        this.props.downvote_post(obj);
        this.forceUpdate();
        if(this.props.sortChanged){
          this.props.sortChanged();
        }
      })
    })
  }

  deletePost() {
    var ask = window.confirm("Delete This Post?");
    if(ask === false) {
      return;
    }

    fetch("http://localhost:5001/posts/" + this.props.post.id,
    {method: "DELETE", headers: api.headers_one()})
    .then((resp) => {
      console.log(resp);
      var obj = {
        type: actions.DELETE_POST,
        id: this.props.post.id,
        deleted: true
      }

      this.props.deletePost(obj);
      if(this.props.alertParent){
        this.props.alertParent();
      }
    })
  }

  sort_comments_byScore_asc() {
    if(this.state.sort === 'ASC') {
      return;
    }

    var keys = Object.keys(this.props.comments);
    var comments = keys.map(key => this.props.comments[key]);
    comments.sort((a, b) => {
      if (a.voteScore < b.voteScore) {
        return -1;
      }
      if (a.voteScore > b.voteScore) {
        return 1;
      }
      // a.voteScore must be equal to b.voteScore
      return 0;
    });

    this.setState({sort: 'ASC', sorted_comments: comments})
  }

  sort_comments_byScore_desc() {
    if(this.state.sort === 'DESC') {
      return;
    }

    var keys = Object.keys(this.props.comments);
    var comments = keys.map(key => this.props.comments[key]);
    comments.sort((a, b) => {
      if (a.voteScore > b.voteScore) {
        return -1;
      }
      if (a.voteScore < b.voteScore) {
        return 1;
      }
      // a.voteScore must be equal to b.voteScore
      return 0;
    });

    this.setState({sort: 'DESC', sorted_comments: comments})
  }

  sortChanged() {
    this.setState({sort: "CHANGED"});
  }

  childChanged(){
    this.forceUpdate();
  }

  getRenderKeys() {
    if(this.state.sorted_comments){
      return this.state.sorted_comments.length > 0 ? this.state.sorted_comments.filter(comment => comment.deleted === false && comment.parentId === this.props.post.id) : false;
    }

    if(this.props.comments) {
      var array = [];
      Object.keys(this.props.comments).forEach((item, index) => {
        if( this.props.comments[item].parentId === this.props.post.id && this.props.comments[item].deleted === false ) {
          array.push(this.props.comments[item]);
        }
      });
      return array.length > 0 ? array : false;
    }
    else {
      return false;
    }
  }

  render(){
    var keys = this.getRenderKeys();
    return (
      <div className="post">

        <h3><Link to={"/posts/" + this.props.post.id}>{this.props.post.title}</Link></h3>
        <p>{this.props.post.body}</p>
        <br/>
        <p>
          Vote Score: {this.props.post.voteScore}<br />
          Comments: {this.props.comments && this.getCommentsLength()}<br />
          Category: <Link to={"/" + this.props.post.category}>{this.props.post.category}</Link>
        </p>
        <br/>
        <p>
          By: <em>{this.props.post.author}</em><br />
          {"Date"}: {new Date(this.props.post.timestamp).toString().substr(0,16)}<br/><br />
        </p>
        <button className="post-buttons btn btn-info btn-sm transition"><Link to={"/posts/" + this.props.post.id + "/create_comment"}>Create Comment</Link></button>
        {this.props.showComments && keys && keys.length > 0 && (
          <div className="text-center">
            <br/><hr/>
            <p>Sort Comments by Vote Score</p>
            <button className="post-buttons btn btn-default btn-sm transition" style={{margin: "10px"}} onClick={() => {this.sort_comments_byScore_asc()}}>Ascending</button>
            <button className="post-buttons btn btn-default btn-sm transition" style={{margin: "10px"}} onClick={() => {this.sort_comments_byScore_desc()}}>Descending</button>
            <hr/>
          </div>
        )}

        <div style={{display: this.state.displayEditor}}>
        <p className="text-center">Title</p>
        <textarea className="editor" value={this.state.titleInput}
          onChange={(event) => this.updateTitleInput(event.target.value)}></textarea>

        <p className="text-center">Body</p>
        <textarea className="editor" value={this.state.bodyInput}
          onChange={(event) => this.updateBodyInput(event.target.value)}></textarea>

          <button className="middlr btn btn-success btn-sm transition" onClick={() => {this.confirmPostEdits()}}>Confirm Edit</button>
          <hr />
        </div>

        <div className="post-buttons-div">
          <button className="post-buttons btn btn-info btn-sm transition" onClick={() => {this.toggleEditor()}}>Edit</button>
          <button className="post-buttons btn btn-info btn-sm transition" onClick={() => {this.deletePost()}}>Delete</button>
          <button className="post-buttons btn btn-info btn-sm transition" onClick={() => {this.upvotePost()}}>UpVote</button>
          <button className="post-buttons btn btn-info btn-sm transition" onClick={() => {this.downvotePost()}}>DownVote</button>
        </div>
        <hr />

        {this.props.showComments && keys && keys.length > 0 && (
          <h2 className="text-center">Comments</h2>
        )}
        {this.props.showComments && keys && keys.length > 0 && keys.map((comment) => (
          <Comment key={comment.id} alertParent={this.childChanged} sortChanged={this.sortChanged} comment={comment} />
        ))}
      </div>
    )
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
    buildComments: (data) => dispatch(actions.buildComments(data)),
    editPost: (data) => dispatch(actions.editPost(data)),
    deletePost: (data) => dispatch(actions.deletePost(data)),
    upvotePost: (data) => dispatch(actions.upvotePost(data)),
    downvotePost: (data) => dispatch(actions.downvotePost(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)
