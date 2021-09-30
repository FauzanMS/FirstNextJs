import React, { Fragment } from 'react'
import { useRouter } from 'next/router'
import { getEventById } from '../../dummy-data';
import EventSummary from '../../components/events/event-summary';
import EventLogistics from '../../components/events/event-logistics';
import EventContent from '../../components/events/event-content';
import Comments from '../../components/input/comments';

export default function EventDetails(props) {
    const router = useRouter();
    const eventId= router.query.eventid;
    // const events = props.events.find((event) => event.id === eventId);
    const events = getEventById(eventId);

console.log(eventId);
    return (
<Fragment>
    <EventSummary  title={events.title}/>
   <EventLogistics date = {events.date} address={events.location} image={events.image} imageAlt = {events.title}/>
   <EventContent description = {events.description} />
   <Comments eventId={events.id}/>
   </Fragment>
    )
}

export async function getStaticProps() {
    const fetchedData = await fetch(
      "https://nextjs-first-69a6e-default-rtdb.firebaseio.com/events.json"
    );
    const data = fetchedData.json();
    const transformedData = [];
    for (const key in data) {
      transformedData.push({
        id: key,
        ...data[key],
      });
    }
    return{
        props:{
            events : transformedData,
        },
    }
  }

export async function getStaticPaths(){
  return {
    paths :[
      {params : {eventid : 'e1'}},
      {params : {eventid : 'e2'}},
      {params : {eventid : 'e3'}},
    ],
    fallback : true,
  }

}