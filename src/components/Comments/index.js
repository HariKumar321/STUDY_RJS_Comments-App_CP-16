import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
// https://harimern3.ccbp.tech/

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

const initialCommentsList = []

class Comments extends Component {
  state = {
    commentsList: initialCommentsList,
    name: '',
    comment: '',
    commentCount: 0,
  }

  toggleIsLike = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachObj => {
        if (id === eachObj.id) {
          return {...eachObj, isLike: !eachObj.isLike}
        }
        return eachObj
      }),
    }))
  }

  onSubmitComment = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const newComment = {id: uuidv4(), name, comment, isLike: false}

    if (name !== '' && comment !== '') {
      this.setState(prevState => ({
        commentsList: [...prevState.commentsList, newComment],
        name: '',
        comment: '',
      }))

      this.setState(prevState => ({
        commentCount: prevState.commentCount + 1,
      }))
    }
  }

  onNameInput = event => {
    this.setState({name: event.target.value})
  }

  onCommentInput = event => {
    this.setState({comment: event.target.value})
  }

  deleteComment = id => {
    const {commentsList} = this.state
    const filteredComment = commentsList.filter(eachObj => eachObj.id !== id)
    this.setState({commentsList: filteredComment})

    this.setState(prevState => ({
      commentCount: prevState.commentCount - 1,
    }))
  }

  render() {
    const {commentsList, name, comment, commentCount} = this.state
    return (
      <div className="bg-container">
        <h1 className="heading"> Comments </h1>
        <div className="app-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="comment-img"
          />
          <div>
            <p className="feedback-request">
              Say something about 4.0 Technologies
            </p>
            <form onSubmit={this.onSubmitComment}>
              <input
                type="text"
                placeholder="Your Name"
                onChange={this.onNameInput}
                className="name-input"
                value={name}
              />
              <textarea
                placeholder="Your Comment"
                onChange={this.onCommentInput}
                className="comment-input"
                value={comment}
              />
              <div>
                <button type="submit" className="button">
                  Add Comment
                </button>
              </div>
            </form>
          </div>
        </div>

        <hr className="seperator" />

        <div className="comment-container">
          <p className="comment-heading">
            <span className="comment-count"> {commentCount} </span> Comments
          </p>
          <ul className="comment-main-container">
            {commentsList.map(eachObj => (
              <CommentItem
                key={eachObj.id}
                eachObj={eachObj}
                initialContainerBackgroundClassNames={
                  initialContainerBackgroundClassNames
                }
                toggleIsLike={this.toggleIsLike}
                deleteComment={this.deleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
