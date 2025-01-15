import { Grid } from "semantic-ui-react";
import EventList from "./EventList";

export default function EventDashboard() {
    return (
        <Grid>
            <Grid.Column width={10}>
                <EventList/>
            </Grid.Column>
            <Grid.Column width={6}>Right column</Grid.Column>
        </Grid>
    )
}
