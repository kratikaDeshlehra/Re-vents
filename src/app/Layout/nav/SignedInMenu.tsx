import { Link, useNavigate } from "react-router-dom";
import { Menu, Image, Dropdown } from "semantic-ui-react";
import { signOut } from "firebase/auth";
import { auth } from "../../config/Firebase";
import { useAppSelector } from "../../store/store"; 

export default function SignedInMenu() {
    const {currentUser}=useAppSelector(state => state.auth);
  
    const navigate=useNavigate();

   async function handleSignOut(){
        await signOut(auth)
        navigate('/');
    }
    
    return (
        <Menu.Item >
            <Image  avatar spaced='right' src={currentUser?.photoURL || '/categoryImages/user.png' }/>
            <Dropdown pointing='top left' text={currentUser?.displayName as string }>
                <Dropdown.Menu >
                    <Dropdown.Item as={Link} to='/createEvent' text='Create event' icon='plus' />
                    <Dropdown.Item as={Link} to={`/profiles/${currentUser?.uid}`} text='My profile' icon='user' />
                    <Dropdown.Item  as={Link} to='/account' text='My Account' icon='settings' />
                    <Dropdown.Item onClick={handleSignOut}text='Sign out' icon='power'  />
                </Dropdown.Menu>

            </Dropdown>
        </Menu.Item>
    )
}
