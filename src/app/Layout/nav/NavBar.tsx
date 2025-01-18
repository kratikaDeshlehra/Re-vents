import { NavLink } from "react-router-dom";
import { Button, Container, Menu, MenuItem } from "semantic-ui-react";
import SignedInMenu from "./SignedInMenu";
import { useState } from "react";
import SignedOutButton from "./SignedOutButton";

export default function NavBar(){

   const [auth,setAuth]=useState(false);
    return (
        <div>
            <Menu inverted={true} fixed='top'>
                <Container>
                    <MenuItem header as={NavLink} to='/'>
                    < img src='./categoryImages/logo.png'/>
                         Re-vents
                    </MenuItem>
                    <MenuItem name='Events' as={NavLink} to='/events' />
                    <MenuItem>
                        <Button
                        as ={NavLink} to='/createEvent'
                        floated='right' positive={true} inverted={true} content='Create Event' />
                    </MenuItem>
                    {auth ? <SignedInMenu setAuth={setAuth}/>:<SignedOutButton setAuth={setAuth}/>}
                    
                </Container>
            </Menu>
        </div>
    )
}
