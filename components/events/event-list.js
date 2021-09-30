import EventItem from "./event-item";
import classes from "./event-list.module.css";
export default function EventList(props) {
    console.log("");
  return (
    <ul className={classes.list}>
      {props.items.map((item) => (
        <EventItem
          key={item.id}
          id={item.id}
          title={item.title}
          location={item.location}
          date={item.date}
          image={item.image}
        />
      ))}
    </ul>
  );
}
