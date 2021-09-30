import Image from 'next/image';
import classes from './event-item.module.css';
import Button from '../ui/button';
export default function EventItem(props) {
    const { title,image , date , location , id} = props;
    const humanReadableDate = new Date(date).toLocaleDateString("en-US" , {
        day : "numeric",
        month : "long",
        year:"numeric"
    })
    const addrest = location.replace(', ' , '\n');
    const exploreLink = `/events/${id}`;
    return (
       <li className={classes.item}>
           <Image src={image} alt="ft" />
           <div className={classes.content}>
               <div className={classes.summary}>
                 <h2>{title}</h2>
                </div>
                <div className={classes.date}>
                <time>{humanReadableDate}</time>
                </div>
           <div className={classes.address}>
               <address>{addrest}</address>
           </div>
           <div className={classes.actions}>
          <Button link = {exploreLink}> Explore Event</Button>
           </div>
           </div>
       </li>
    )
}
