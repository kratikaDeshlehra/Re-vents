import { Grid } from "semantic-ui-react";
import EventDetailHeader from "./EventDetailHeader";
import EventDetailInfo from "./EventDetailInfo";
import EventDetailChats from "./EventDetailChats";
import EventDetailSidebar from "./EventDetailSidebar";

export default function EventDetailedPage() {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventDetailHeader/>
        <EventDetailInfo/>
        <EventDetailChats/>
      </Grid.Column> 
      <Grid.Column width={6}>
        <EventDetailSidebar/>
      </Grid.Column>
    </Grid>
  )
}
