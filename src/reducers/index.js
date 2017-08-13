import {
  LOAD_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  UPVOTE_POST,
  DOWNVOTE_POST,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
  POST_PAGE_LOAD,
  BUILD_COMMENTS,
  LOAD_CATEGORIES
} from '../actions'


export function posts(state = null, action) {
  let newPosts = state;
  let posts = {}

  switch(action.type) {
    case LOAD_POSTS:
      for(let num in action.posts) {
        posts[ action.posts[num].id ] = action.posts[num]
      }
      return posts

    case ADD_POST:
      newPosts[action.id] = {};
      newPosts[action.id].id = action.id;
      newPosts[action.id].author = action.author;
      newPosts[action.id].title = action.title;
      newPosts[action.id].body = action.body;
      newPosts[action.id].timestamp = action.timestamp;
      newPosts[action.id].category = action.category;
      newPosts[action.id].deleted = action.deleted;
      newPosts[action.id].voteScore = action.voteScore;
      return newPosts

    case EDIT_POST:
      newPosts[action.id].title = action.title;
      newPosts[action.id].body = action.body;
      return newPosts

    case DELETE_POST:
      newPosts[action.id].deleted = action.deleted;
      return newPosts

    case UPVOTE_POST:
      newPosts[action.id].voteScore = action.voteScore;
      return newPosts

    case DOWNVOTE_POST:
      newPosts[action.id].voteScore = action.voteScore;
      return newPosts

    default:
      return state
  }
}

export function comments(state = null, action) {
  let comments;
  let newComments;


  switch(action.type) {
    case BUILD_COMMENTS:
      comments = state == null ? {} : state;
      if(Array.isArray(action.comments) && action.comments.length > 0) {
        for(let comment of action.comments) {
          comments[ comment.id ] = comment
        }
      }
      return comments

    case POST_PAGE_LOAD:
      comments = {}
      for(let num in action.comments) {
        comments[ action.comments[num].id ] = action.comments[num]
      }
      return comments

    case ADD_COMMENT:
      newComments = state == null ? {} : state;
      newComments[action.id] = {};
      newComments[action.id].id = action.id;
      newComments[action.id].author = action.author;
      newComments[action.id].title = action.title;
      newComments[action.id].parentId = action.parentId;
      newComments[action.id].timestamp = action.timestamp;
      newComments[action.id].parentdeleted = action.parentdeleted;
      newComments[action.id].deleted = action.deleted;
      newComments[action.id].voteScore = action.voteScore;
      return newComments

    case EDIT_COMMENT:
      newComments = state;
      newComments[action.id].body = action.body;
      return newComments

    case DELETE_COMMENT:
      newComments = state;
      newComments[action.id].deleted = action.deleted;
      newComments[action.id].parentDeleted = action.parentDeleted;
      return newComments

    case UPVOTE_COMMENT:
      newComments = state;
      newComments[action.id].voteScore = action.voteScore;
      return newComments

    case DOWNVOTE_COMMENT:
      newComments = state;
      newComments[action.id].voteScore = action.voteScore;
      return newComments

    default:
      return state
  }
}

export function categories(state = null, action){
  switch(action.type) {
    case LOAD_CATEGORIES:
      var categories = action.categories.map((category) => (category.name));
      return categories

    default:
      return state
  }
}
