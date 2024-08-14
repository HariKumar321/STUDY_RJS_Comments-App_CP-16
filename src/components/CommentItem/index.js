// Write your code here
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {
    eachObj,
    initialContainerBackgroundClassNames,
    toggleIsLike,
    deleteComment,
  } = props
  const {id, name, comment, isLike} = eachObj

  const likeImgUrl = isLike
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const isLikeText = isLike ? 'Liked' : 'Like'

  const onClickFavoriteItem = () => {
    toggleIsLike(id)
  }

  const onDeleteComment = () => {
    deleteComment(id)
  }

  return (
    <li>
      <div className="username-container">
        <p className="username-initial">{name.slice(0, 1).toUpperCase()}</p>
        <p className="username"> {name} </p>
        <p className="comment-time">{formatDistanceToNow(new Date())}</p>
      </div>
      <p className="comment"> {comment} </p>
      <div className="buttons-container">
        <button
          onClick={onClickFavoriteItem}
          className="like-btn"
          type="button"
        >
          <img src={likeImgUrl} alt="like" />
          <span> {isLikeText} </span>
        </button>

        <button
          className="delete-btn"
          onClick={onDeleteComment}
          type="button"
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr className="seperator" />
    </li>
  )
}

export default CommentItem
