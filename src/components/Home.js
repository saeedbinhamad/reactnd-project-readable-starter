import React, { Component } from 'react'
import Header from './Header'
import HomeCategories from './category/HomeCategories'
import PostList from './post/PostList'

class Home extends Component {

  componentWillMount() {
    window.scrollTo(0, 0)
  }

  render() {

    const { categories, posts, history } = this.props

    return (
      <div>
        <Header />
        <div className="readable-body-wrapper">
          <HomeCategories categories={categories} posts={posts} />
          <PostList posts={posts} history={history} />
        </div>
      </div>
    )
  }
}

export default Home
