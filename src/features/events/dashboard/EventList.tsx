import { AppEvent } from "../../../app/types/event";
import EventListItem from "./EventListItem";

type Props = {
  events: AppEvent[]
}

export default function EventList({ events }: Props) {
  return (
    <>
      {events.map((event) => (
        <div key={event.id} style={{marginBottom:'2em'}}>
           <EventListItem key={event.id} event={event} />
        </div>
       
      ))}

    </>
  )
}
