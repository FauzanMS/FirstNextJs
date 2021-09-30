import classes from './event-content.module.css';

function EventContent(props) {
  return (
    <section className={classes.content}>
      {props.description}
    </section>
  );
}

export default EventContent;
