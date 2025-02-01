import { Button, MenuItem } from "semantic-ui-react";
import { useAppDispatch } from "../../store/store";
import { openModal } from "../../common/modals/modalSlice";

export default function SignedOutButton() {
  const dispatch=useAppDispatch()
  return (
    <MenuItem position="right">
    <Button basic inverted content='Login' onClick={()=>{
        console.log('button is clicked');
        dispatch(openModal({type:'LoginForm',data:{}}));
    }} />
    <Button basic inverted content='Register' style={{ marginLeft: '0.5em' }} />

</MenuItem>
  )
}
