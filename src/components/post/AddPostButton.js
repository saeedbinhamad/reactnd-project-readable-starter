import React from 'react'
import { Link } from 'react-router-dom'

const AddPostButton = () => (
  <Link className="button" to="/new">
    <span className="icon"><i></i></span>
    &nbsp; Add new post
  </Link>
)

export default AddPostButton
