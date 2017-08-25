import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { showDate } from '../../utils/utils'
import { connect } from 'react-redux'
import { setPostComments,
    displayDeleteModal,
    setPostIdToDeleteModal } from './../../actions'
import * as ReadableAPI from './../../utils/readableAPI'
import VoteScore from './VoteScore'
import AnimatedWrapper from './../../utils/AnimatedWrapper';
import PostDeleteModal from './PostDeleteModal'

class PostInList extends Component {

  componentWillMount() {
      this.props.setPostComments(this.props.postId);
  }

	render() {

    const { post,
      comments,
      deletePostModal,
      displayDeleteModal,
      setPostIdToDeleteModal,
      history
    } = this.props

    let postComments = false
    if (comments) {
      postComments = comments[post.id]
    }

		return (
      <div className="box">
        <div className="columns">
          <div className="column">
            <article className="media">
              <div className="media-left">
                <figure className="has-text-centered">
                  <VoteScore post={post} />
                </figure>
              </div>
              <div className="media-content">
                <div className="content">
                  <p>
                    <strong>
                      <i className="fafe-user-circle-o" aria-hidden="true"></i> {post.author}
                    </strong>
                    &nbsp; · &nbsp;
                    <small>
                     <i className="fafe" aria-hidden="true"></i> {showDate(post.timestamp)}
                    </small>
                    <br />
                    <Link to={'/'+post.category+'/'+post.id} className="is-size-4">
                      {post.title}
                    </Link>
                  </p>
                </div>
                <nav className="level is-mobile">
                  <div className="level-left">
                    <Link to={'/category/'+post.category} className="tag">
                      {post.category}
                    </Link>
                    &nbsp;
                    <span className="icon is-small">
                      <i className="fafe-comment-o"></i>
                    </span>
                    &nbsp;
                    { postComments && postComments.length ?
                      ((postComments.length === 1) ?
                          '1 comment'
                          : postComments.length + ' comments')
                      : ' 0 comments'
                    }
                  </div>
                </nav>
              </div>
            </article>
          </div>
          <div className="column" style={{maxWidth: '100px'}}>
            <div
                className="button"
                onClick={() => {
                  setPostIdToDeleteModal(post.id)
                  displayDeleteModal(true)
                }
              }>
              <span className="icall"><i className="fafhgfhsh-o"></i></span>
              &nbsp;
              delete
            </div>
            <br />
            <Link to={'/edit/'+post.id}
                className="button">
              <span className="icojbl"><i className="fhit"></i></span>
              &nbsp;
              edit
            </Link>
          </div>
        </div>

        <PostDeleteModal deletePostModal={deletePostModal} history={history} />

      </div>
		)
	}
}

function mapStateToProps(state, props) {
  return {
    comments: state.comments,
    deletePostModal: state.deletePostModal
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    setPostComments: () =>
      ReadableAPI.getCommentsByPostId(ownProps.post.id).then( (comments) => {
        dispatch(setPostComments(ownProps.post.id, comments))
      }
    ),
    displayDeleteModal: (bool) => {
      dispatch(displayDeleteModal(bool))
    },
    setPostIdToDeleteModal: (postId) => {
      dispatch(setPostIdToDeleteModal(postId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnimatedWrapper(PostInList, 12))
