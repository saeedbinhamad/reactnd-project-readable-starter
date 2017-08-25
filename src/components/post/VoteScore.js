import React, { Component } from 'react'
import { connect } from 'react-redux'
import { applyVote } from './../../actions'
import * as ReadableAPI from './../../utils/readableAPI'
import { objectToArray } from '../../utils/utils'

class VoteScore extends Component {

	render() {

		const { post, applyVote } = this.props

		return (
			<div className="readable-voteScore-wrapper">
				<div className="catt">
					{post.voteScore}
				</div>
				<a className="button" onClick={() => applyVote(post.voteScore, 1)}>
					<i className="fafe" aria-hidden="true">+</i>
				</a>
				<a className="button" onClick={() => applyVote(post.voteScore, -1)}>
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
    applyVote: (newValue, diff) => {
      ReadableAPI.votePost(ownProps.post.id, diff).then(()=>
        dispatch(applyVote(ownProps.post.id, newValue+diff))
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteScore)
