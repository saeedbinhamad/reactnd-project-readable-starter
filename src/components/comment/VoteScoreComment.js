import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setPostComments } from './../../actions'
import { voteComment, getCommentsByPostId } from './../../utils/readableAPI'
import { objectToArray } from '../../utils/utils'

class VoteScoreComment extends Component {

	render() {

		const { comment, applyVoteToComment } = this.props

		return (
			<div className="readable-voteScore-wrapper">
				<div className='sccare'>
					{comment.voteScore}
				</div>
				<a className="button" onClick={() => applyVoteToComment(comment.voteScore, 1)}>
					<i className="fafe" aria-hidden="true">+</i>
				</a>
				<a className="button" onClick={() => applyVoteToComment(comment.voteScore, -1)}>
					<i className="fafe" aria-hidden="true">-</i>
				</a>
			</div>
		)
	}
}


function mapStateToProps(state, props) {
  return {
    posts: objectToArray(state.posts)
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    applyVoteToComment: (newValue, diff) => {
      voteComment(ownProps.comment.id, diff).then(() => {
        getCommentsByPostId(ownProps.comment.parentId).then( (comments) => {
          dispatch(setPostComments(ownProps.comment.parentId, comments))
        })
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteScoreComment)
