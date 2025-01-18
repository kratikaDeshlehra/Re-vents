import { NavLink } from "react-router-dom";
import { Button, Container, Menu, MenuItem } from "semantic-ui-react";

export default function NavBar(){
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
                    <MenuItem position="right">
                        <Button basic inverted content='Login' />
                        <Button basic inverted content='Register' style={{ marginLeft: '0.5em' }} />

                    </MenuItem>
                </Container>
            </Menu>
        </div>
    )
}
