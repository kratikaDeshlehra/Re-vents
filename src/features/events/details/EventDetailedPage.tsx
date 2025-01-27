import { Grid } from "semantic-ui-react";
import EventDetailHeader from "./EventDetailHeader";
import EventDetailInfo from "./EventDetailInfo";
import EventDetailChats from "./EventDetailChats";
import EventDetailSidebar from "./EventDetailSidebar";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/folder/store";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../app/config/Firebase";
import { setEvents } from "../eventSlice";
import { toast } from "react-toastify";
import LoadingComponent from "../../../app/Layout/LoadingComponent";

export default function EventDetailedPage() {

  const {id}=useParams();
  const event=useAppSelector(state => state.events.events.find(e=> e.id===id));
  const dispatch=useAppDispatch();
  const [loading,setLoading]=useState(true);


  useEffect(()=>{
         if(!id)return ;
         const unsubscribe=onSnapshot(doc(db,'events',id),{
          next: doc=>{
            dispatch(setEvents({id:doc.id,...doc.data()}))
            setLoading(false); 
          },
          error:err=>{
            console.log(err);
            toast.error(err.message);
            setLoading(false);
          }
         }) 
         return ()=> unsubscribe()
  },[id,dispatch])

  if(loading) return <LoadingComponent/>

  if(!event) return <h2>Event not found</h2>

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader event={event}/>
        <EventDetailInfo event={event}/>
        <EventDetailChats/>
      </Grid.Column> 
      <Grid.Column width={6}>
        <EventDetailSidebar/>
      </Grid.Column>
    </Grid>
  )
}
