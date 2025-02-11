import { FieldValues, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import {  Form, Loader } from "semantic-ui-react";
import { KeyboardEvent } from "react";
import { push, ref, set } from "firebase/database";
import { auth, fb } from "../../../app/config/Firebase";

type Props={
    eventId : string
}
export default function ChatForm({eventId}:Props) {

    const {register,handleSubmit,setValue, watch ,reset,formState:{isSubmitting}}=useForm({
        mode:'onTouched',
        defaultValues: {comment: ''}
    })

    const commentValue = watch("comment");

    async function onSubmit(data : FieldValues){
        try{
             const chatRef=ref(fb,`chat/${eventId}`);
             const newChatRef= push(chatRef);
             await set(newChatRef,{
                 displayName:auth.currentUser?.displayName,
                 photoURL : auth.currentUser?.photoURL,
                 uid: auth.currentUser?.uid,
                 text : data.comment,
                 date : Date.now()
             })
             reset();
             setValue('comment','');
        } 
        catch(error : any){
           toast.error(error.message);
        }
    }
  return (
      
    <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.TextArea 
        {...register('comment', {required : true})}
        placeholder ='Enter your comment (Enter to submit, shift + enter to add new line )'
        value={commentValue} // ✅ Bind `watch()` value
                onChange={(e) => setValue("comment", e.target.value, { shouldValidate: true })} 
        onKeyDown={(e : KeyboardEvent<HTMLTextAreaElement>)=>{
            console.log("Key Pressed:", e.key)
            if(e.key==='Enter' && e.shiftKey){
                return ;
            } 
            if(e.key==='Enter' && !e.shiftKey){
                e.preventDefault();
               handleSubmit(onSubmit)(); 
            
            }
        }}
        /> 
        <Loader active={isSubmitting}/>


    </Form>
  )
}
