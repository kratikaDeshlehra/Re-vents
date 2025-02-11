import { Grid } from "semantic-ui-react";
import EventDetailHeader from "./EventDetailHeader";
import EventDetailInfo from "./EventDetailInfo";
import EventDetailChats from "./EventDetailChats";
import EventDetailSidebar from "./EventDetailSidebar";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../app/store/store";
import { useEffect} from "react";
import { actions } from "../eventSlice";
import LoadingComponent from "../../../app/Layout/LoadingComponent";
import { useFirestore } from "../../../app/hooks/firestore/useFirestore";

export default function EventDetailedPage() {

  const {id}=useParams();
  const event=useAppSelector(state => state.events.data.find(e=> e.id===id));
  const {status}=useAppSelector(state => state.events);
  const {loadDocument}=useFirestore('events');


  useEffect(()=>{
         if(!id)return ;
         loadDocument(id,actions)
    
  },[id,loadDocument])

  if(status==='loading') return <LoadingComponent/>

  if(!event) return <h2>Event not found</h2>

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader event={event}/>
        <EventDetailInfo event={event}/>
        <EventDetailChats eventId={event.id}/>
      </Grid.Column> 
      <Grid.Column width={6}>
        <EventDetailSidebar event={event}/>
      </Grid.Column>
    </Grid>
  )
}
