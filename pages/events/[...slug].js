import { useRouter } from 'next/router'
import React from 'react'
import EventList from '../../components/events/event-list';
import {  getFilteredEvents } from '../../dummy-data';

export default function FilteredEvents() {
    const router = useRouter();
    const filterData = router.query.slug;
    console.log(filterData);
    if(!filterData){
        return<p className="center">Loading......</p>
    }
    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear;
    const numMonth =+filteredMonth;
    if(
        isNaN(numYear) || isNaN(numMonth) || numMonth>12 || numMonth<1 || numYear>2030 || numYear<2020
    ){
        return <p>Invalid</p>
    }

    const filteredEvents= getFilteredEvents({
        year:numYear,
        month:numMonth
    })
    if(!filteredEvents || filteredEvents.length===0){
        return <p>Not found</p>
    }

    return (
        <div>
           <EventList items={filteredEvents} />
        </div>
    )
}
