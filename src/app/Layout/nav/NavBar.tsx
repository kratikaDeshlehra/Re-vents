import { NavLink } from "react-router-dom";
import { Button, Container, Menu, MenuItem } from "semantic-ui-react";
import SignedInMenu from "./SignedInMenu";
import SignedOutButton from "./SignedOutButton";
import { useAppSelector } from "../../store/store";

export default function NavBar(){
  
    const {authenticated}=useAppSelector(state => state.auth);
   
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
                 
                    {authenticated ? <SignedInMenu/>:<SignedOutButton/>}
                    

                </Container>
            </Menu>
        </div>
    )
}
