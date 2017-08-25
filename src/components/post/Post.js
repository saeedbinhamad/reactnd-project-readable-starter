import React, { Component } from 'react'
import { showDate } from '../../utils/utils'
import { Link } from 'react-router-dom'
import VoteScore from './VoteScore'
import AnimatedWrapper from './../../utils/AnimatedWrapper';
import AddComment from './../comment/AddComment'
import Comment from './../comment/Comment'
import { displayDeleteModal, setPostIdToDeleteModal } from './../../actions'
import { connect } from 'react-redux'
import PostDeleteModal from './PostDeleteModal'

class Post extends Component {

  componentWillMount() {
    window.scrollTo(0, 0)
  }

	render() {

    const { post,
      comments,
      deletePostModal,
      displayDeleteModal,
      setPostIdToDeleteModal,
      history
    } = this.props

		return (
			<div>
        { post &&
          <div className="container content has-top-margin" style={{marginBottom: '50px'}}>

            <div className="columns is-mobile">
              <div className="column" style={{maxWidth: '115px'}}>
                <VoteScore voteScore={post.voteScore} post={post}/>
              </div>
              <div className="column">
                <h1>
                  {post.title}
                </h1>
                <blockquote>
                  {post.body}
                </blockquote>
                <div className="has-bottom-margin">
                  <i className="fafefa-uso" aria-hidden="true"></i> <strong>{post.author}</strong>
                  &nbsp; · &nbsp;
                  <i className="fafefa-c-o" aria-hidden="true"></i> {showDate(post.timestamp)}
                  &nbsp; · &nbsp;
                  category: <Link className="tjcvghed" to={'/category/' + post.category}>{post.category}</Link>
                  &nbsp; · &nbsp;
                  <span className="button" onClick={() => {
                    console.log('clicked')
                    setPostIdToDeleteModal(post.id)
                    displayDeleteModal(true)
                  }}>delete</span>
                  &nbsp;
                  <Link
                      to={'/edit/'+post.id}
                      className="button">
                    edit
                  </Link>
                </div>
                { comments && (comments.length > 0) &&
                  <div>
                    {(comments.length > 1) ?
                      <h3>{comments.length} comments:</h3>
                    :
                      <h3>{comments.length} comment:</h3>
                    }
                    {comments.map( (comment, index) =>
                      <Comment position={index} key={index} comment={comment} />
                    )}
                  </div>
                }

                <AddComment postId={post.id} />
              </div>

            </div>

          </div>
        }

        <PostDeleteModal
          deletePostModal={deletePostModal}
          history={history}
          redirectAfterDelete={true} />

			</div>
		)
	}
}

function mapStateToProps(state, props) {
  return {
    deletePostModal: state.deletePostModal
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    displayDeleteModal: (bool) => {
      dispatch(displayDeleteModal(bool))
    },
    setPostIdToDeleteModal: (postId) => {
      dispatch(setPostIdToDeleteModal(postId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnimatedWrapper(Post, 4, 50))
