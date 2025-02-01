import { NavLink } from "react-router-dom";
import { Button, Container, Menu, MenuItem } from "semantic-ui-react";
import SignedInMenu from "./SignedInMenu";
import SignedOutButton from "./SignedOutButton";
import { useAppSelector } from "../../store/store";
import { sampleData } from "../../api/sampleData";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/Firebase";

export default function NavBar(){
  
    const {authenticated}=useAppSelector(state => state.auth);
    function seedData(){
        sampleData.forEach(async event =>{
            const {id,...rest}= event;
            await setDoc(doc(db,'events',id),{
                ...rest
            })
        })
    }
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
                    {import.meta.env.DEV && (
                        <MenuItem>
                        <Button inverted={true} color="teal" content='Seed data' onClick={seedData}/>
                        </MenuItem>
                    )}
                    {authenticated ? <SignedInMenu/>:<SignedOutButton/>}
                    

                </Container>
            </Menu>
        </div>
    )
}
