import React, { Component } from 'react'
import Header from './../Header'
import { connect } from 'react-redux'
import { controlNewPostForm, addNewPost, setToastMessage } from '../../actions'
import faker from 'faker'
import { addPost, getAllPosts } from './../../utils/readableAPI'

class NewPost extends Component {

  componentWillMount() {
    window.scrollTo(0, 0)
    this.props.controlNewPostForm('showNotification', false)
    this.props.controlNewPostForm('title', '')
    this.props.controlNewPostForm('category', '')
    this.props.controlNewPostForm('username', '')
    this.props.controlNewPostForm('message', '')
    this.props.controlNewPostForm('category', 0)

  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (this.fieldsAreValid()) {
      this.props.newPostForm.id = faker.random.uuid()
      this.props.newPostForm.timestamp = Date.now()
      this.props.addNewPost(this.props.newPostForm)
    } else {
      this.props.controlNewPostForm('showNotification', true)
    }
    event.preventDefault()
  }

  fieldsAreValid = () => {
    const form = this.props.newPostForm
    if (form.title && form.title !== ''
      && form.category && form.category !== ''
      && form.username && form.username !== ''
      && form.message && form.message !== ''
      && form.category !== 0
      ) return true;
    return false;
  }

  handleChange = (event) => {
    this.props.controlNewPostForm(event.target.name, event.target.value)
  }

	render() {

    const { categories, newPostForm, controlNewPostForm } = this.props

		return (
		<div>

			<Header />

        <div className="container has-top-margin has-bottom-margin">
          <div className="columns">
            <div className="column">

              <form onSubmit={this.handleSubmit}>
                <div className="title">
                  add a new Post
                </div>

                <div className="field">
                  <label className="label">post title</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="title"
                      onChange={(event) => this.handleChange(event)}
                      placeholder="Title"/>
                  </div>
                </div>

                <div className="field">
                  <label className="label">username</label>
                  <div className="control">
                    <input
                      className="input {/*is-success*/}"
                      type="text"
                      name="username"
                      onChange={(event) => this.handleChange(event)}
                      placeholder="your username" />
          
                  </div>
                  <p className="usernameMessageError help is-success is-hidden">this username is not valid</p>
                </div>

                <div className="field">
                  <label className="label">category</label>
                  <div className="control">
                    <div className="select">
                      <select
                        name="category"
                        onChange={(event) => this.handleChange(event)}>
                        <option value="0">select category</option>
                        { categories && categories.map((category, index) =>
                          <option
                            key={index}
                            value={category.path}>
                              {category.name}
                          </option>
                        )}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="field">
                  <label className="label">message</label>
                  <div className="control">
                    <textarea
                      name="message"
                      onChange={(event) => this.handleChange(event)}
                      className="textarea"
                      placeholder="type message here" />
                  </div>
                </div>

                { newPostForm.showNotification &&
                  <div className="container notification is-danger">
                    <button className="delete" onClick={() => controlNewPostForm('showNotification', false)}></button>
                    <strong>Oops. Something is not right.</strong><br />
                    Please fill all the fields in this form, and select a category.
                  </div>
                }

                <div className="field is-grouped">
                  <div className="control">
                    <button type="submit" className="button">
                      &nbsp; &nbsp;
                      submit
                    </button>
                  </div>
                  <div className="control">
                    <a onClick={() => window.history.back()} className="button is-link">Cancel</a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

		</div>
		)
	}
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    newPostForm: state.newPostForm
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    controlNewPostForm: (name, value) =>
      dispatch(controlNewPostForm(name, value)),
    addNewPost: (formValues) => {
      addPost(formValues).then(() => {
        dispatch(addNewPost(formValues))
        getAllPosts().then( (posts) => {
          dispatch(setToastMessage('✅ New Post Added!'))
          ownProps.history.push('/')
        })
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPost)
