import { Button, Grid, Header, Tab } from "semantic-ui-react";
import { Profile } from "../../app/types/profile";
import { useState } from "react";

type Props={
    profile: Profile
}
export default function ProfileAbout({profile}:Props) {
    const [editMode,setEditMode]=useState(false);
  return (
       <Tab.Pane>
        <Grid>
            <Grid.Column width={16}>
                <Header floated="left" icon='user' content={`About ${profile.displayName}`}/>
                <Button floated="right"
                basic content={editMode?'Cancel' : 'Edit Profile'}
                onClick={()=> setEditMode(!editMode)}
                />
            </Grid.Column> 

            <Grid.Column width={16}>
                {editMode ? <p>Profile form</p> :(
                    <>
                    <div style={{marginBottom: 10}}>
                        <strong>Member Since : {profile.createdAt}</strong> 
                        <div style={{marginTop:10}}>{profile.description}</div>
                    </div>
                    </>
                )}
            </Grid.Column>
        </Grid>
       </Tab.Pane>
  )
}
