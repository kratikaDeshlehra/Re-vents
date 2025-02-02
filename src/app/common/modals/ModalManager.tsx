import LoginForm from "../../../features/auth/LoginForm";
import RegisterForm from "../../../features/auth/RegisterForm";
import { useAppSelector } from "../../store/store"


export default function ModalManager() {
  console.log('ModalManager component is loaded');

  const modalLookup={
       LoginForm,
       RegisterForm
  };
  
  const {open,type,data}=useAppSelector(state => state.modals);
  let renderdModal;
  console.log("ModalManager state:", {open,type,data});
  
  if(open && type){
    const ModalComponent=(modalLookup as any)[type]; 
    renderdModal= <ModalComponent data={data}/>
  }

  console.log("Rendering modal:", renderdModal);
    return (
     <span>{renderdModal}</span>
  )
}
