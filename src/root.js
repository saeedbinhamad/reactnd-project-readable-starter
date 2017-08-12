import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Route, BrowserRouter } from 'react-router-dom'
import PostPage from './components/postPage'
import MainPage from './components/mainPage'
import CreatePage from './components/createPage'
import CreateComment from './components/createComment'
import PostsByCategory from './components/postsByCategory'
import PostByCategory from './components/postByCategory'

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path='/' component={MainPage} />
        <Route exact path='/posts/:id' component={PostPage} />
        <Route exact path='/create/post' component={CreatePage} />
        <Route exact path='/posts/:id/create_comment' component={CreateComment} />
        <Route exact path='/:category' component={PostsByCategory} />
        <Route exact path='/:category/:post_id' component={PostByCategory} />
      </div>
    </BrowserRouter>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
