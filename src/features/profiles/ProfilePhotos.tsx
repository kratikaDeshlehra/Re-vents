import { useState } from "react";
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";

import { Profile } from "../../app/types/profile";
import { auth } from "../../app/config/Firebase";
import PhotoUpload from "./PhotoUpload";

type Props={
    profile: Profile
}
export default function ProfilePhotos({profile}:Props) {

    const [editMode,setEditMode]=useState(false);

    const isCurrentUser= auth.currentUser?.uid ===profile.id;
  return (
       <Tab.Pane>
        <Grid>
            <Grid.Column width={16}>
                <Header floated="left" icon='photo' content='Photos'/>

                {isCurrentUser && 
                <Button floated="right"
                basic content={editMode?'Cancel' : 'Add photo'}
                onClick={()=> setEditMode(!editMode)}
                /> }
            </Grid.Column> 

            <Grid.Column width={16}>
                 {editMode ? <PhotoUpload /> : (
                    <Card.Group itemsPerRow={5}>
                        <Card>
                            <Image src={'/categoryImages/user.png'}/>
                            {isCurrentUser && 
                            <Button.Group>
                                <Button  basic color="green">Main</Button>
                                <Button basic color="red" icon='trash'/>
                            </Button.Group> }
                        </Card>
                    </Card.Group>
                 )}
            
            </Grid.Column>
        </Grid>
       </Tab.Pane>
  )
}
