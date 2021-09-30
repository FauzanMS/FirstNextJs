import classes from './newsletter-registration.module.css';
import {useRef , useContext} from 'react';
import NotificationContext from '../../store/notification-context';
function NewsletterRegistration() {
  
  const notificationCtx = useContext(NotificationContext);
  

  function registrationHandler(event) {
    event.preventDefault();
    const emailInput = emailInputRef.current.value;
    notificationCtx.showNotification({
      title : 'Signing up...',
      message : 'Registering for newsletter',
      status : 'pending'
    })
    fetch('/api/newsletter',{
        method:'POST',
        body: JSON.stringify({email:emailInput}),
        headers:{
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
      message : 'Registered for newsletter',
      status : 'success'
    });
  })
  .catch((error)=>{
    notificationCtx.showNotification({
      title : 'Error..',
      message : 'Registering for newsletter failed',
      status : 'error'
    });
  });
  }

  const emailInputRef = useRef();

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            ref={emailInputRef}
            id='email'
            placeholder='Your email'
            aria-label='Your email'
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;