import { Button, Icon, Item, ItemGroup, Label, List, Segment, SegmentGroup } from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import { AppEvent } from "../../../app/types/event";
import { Link } from "react-router-dom";

type Props={
    event : AppEvent
}
export default function EventListItem({event}:Props) {
  
  return (
    <div >
      <SegmentGroup>
        <Segment style={{borderTopLeftRadius: '7px',borderTopRightRadius : '60px'}}>
            <ItemGroup>
                <Item>
                    <Item.Image size="tiny" circular src={event.hostPhotoURL || './categoryImages/user.png'}/>
                    <Item.Content>
                        <Item.Header>{event.title}</Item.Header> 
                        <Item.Description>{event.hostedBy}</Item.Description>
                   {event.isCancelled  && (
                    <Label style={{top:'-40px'}}
                     ribbon='right'
                     color="red"
                     content='This Event has been cancelled ! '
                    />
                   )}
                   
                    </Item.Content>
                </Item>
            </ItemGroup>
        </Segment> 

        <Segment>
            <span>
                <Icon name='clock'/>{event.date}
                <Icon name='marker'/>{event.venue}
                </span>
        </Segment> 
        <Segment secondary>
            <List horizontal>
                {event.attendees.map((attendee)=>(
                    <EventListAttendee key={attendee.id} attendee={attendee} />
                ))}
            </List>
        </Segment>
        <Segment>
        <span>{event.description}</span> 
        </Segment>
        <Segment clearing  style={{borderBottomLeftRadius: '80px',borderBotomRightRadius : '40px',height :'4.5em'}}> 
          <Button as={Link} to={`/events/${event.id}`} color="teal" floated='right' content='View' />
        </Segment>
      </SegmentGroup>
    </div>
  )
}


