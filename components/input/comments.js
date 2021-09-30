import { useState , useEffect , useContext} from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments(props) {
  const { eventId } = props;
  const notificationCtx = useContext(NotificationContext);
  
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
 useEffect(()=>{
    if(showComments){
     fetch('/api/comments/'+eventId).then(response=>response.json()).then(data => setComments(data.comments))
 } 
},[showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title : 'Adding Comment....',
      message : 'Please Wait',
      status : 'pending'
    })
     fetch('/api/comments/'+eventId , {
         method : 'POST' ,
         body : JSON.stringify({email : commentData.email , name : commentData.name , text : commentData.text}),
         headers: {
             'Content-Type' : 'application/json',
         },
     }).then(response=>{
      if(response.ok){
        return response.json(); 
      }
      response.json().then(data=>{
        throw new Error(data.message || 'Something went wrong')
      });
    })
    .then(data=>{    notificationCtx.showNotification({
      title : 'Success...',
      message : 'Comment Added Successfully',
      status : 'success'
    });
  })
  .catch((error)=>{
    notificationCtx.showNotification({
      title : 'Error..',
      message : 'Adding Comment failed',
      status : 'error'
    });
  });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items= {comments} />}
    </section>
  );
}

export default Comments;