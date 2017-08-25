import React, { Component } from 'react'
import { connect } from 'react-redux'
import { displayDeleteModal, deletePost, setToastMessage } from './../../actions'
import * as ReadableAPI from './../../utils/readableAPI'
import Modal from 'react-modal'
import AnimatedWrapper from './../../utils/AnimatedWrapper';

class PostDeleteModal extends Component {

	render() {

    const {
      deletePostModal,
      displayDeleteModal,
      deletePost
    } = this.props

		return (
        <Modal
          isOpen={deletePostModal.isActive}
          onRequestClose={() => displayDeleteModal(false)}
          contentLabel="some content"
        >
          <div className="container">
            <h1 className="title">
              seriously?
            </h1>
            <p>
             are you sure?
            </p>
            <br />
            <div style={{marginRight:'12px'}}className="button" onClick={() => displayDeleteModal(false)}>Cancel</div>
            <div className="button"
                onClick={() => {
                  deletePost(deletePostModal.postId)
                  displayDeleteModal(false)
                }} >
              yeah delete it!
            </div>
          </div>
        </Modal>
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
    deletePost: (postIdToDelete) => {
      ReadableAPI.deletePostById(postIdToDelete).then(() => dispatch(deletePost(postIdToDelete)))
      dispatch(setToastMessage('Post Deleted!'))
      if (ownProps.redirectAfterDelete)
        ownProps.history.push('/')
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnimatedWrapper(PostDeleteModal))
