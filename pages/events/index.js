import { getAllEvents } from "../../dummy-data";
// import { useEffect, useState } from "react";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-search";
import { useRouter } from "next/router";
import NewsletterRegistration from "../../components/input/newsletter-registration";
export default function EventsPage() {
  // const [sevents, setSevents] = useState(props.events);
  // useEffect(() => {
  //   fetch("https://nextjs-first-69a6e-default-rtdb.firebaseio.com/events.json").then((response) => {
  //     response.json().then((data) => {
  //       const transformedData = [];
  //       for (const key in data) {
  //         console.log(key);
  //         transformedData.push({
  //           id: key,
  //           ...data[key],
  //         });
  //       }
  //       setSevents(transformedData);
  //     });
  //   });
  // }, []);
  const router = useRouter();
  const events = getAllEvents();
  // console.log(props.events);
  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }
  return (
    <div>
      <EventSearch onSearch={findEventsHandler} />
      <NewsletterRegistration/>
      <EventList items={events} />
    </div>
  );
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
