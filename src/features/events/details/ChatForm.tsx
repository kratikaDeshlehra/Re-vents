import { FieldValues, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import {  Form, Loader } from "semantic-ui-react";
import { KeyboardEvent } from "react";

export default function ChatForm() {
    const {register,handleSubmit,setValue, reset,formState:{isSubmitting}}=useForm({
        mode:'onTouched',
        defaultValues: {comment: ''}
    })

    function onSubmit(data : FieldValues){
        try{
             console.log(data);
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
        onKeyDown={(e : KeyboardEvent<HTMLTextAreaElement>)=>{
            console.log("Key Pressed:", e.key)
            if(e.key==='Enter' && e.shiftKey){
                return ;
            } 
            if(e.key==='Enter' && !e.shiftKey){
                e.preventDefault();
                setValue("comment", e.currentTarget.value, { shouldValidate: true });
               handleSubmit(onSubmit)(); 
            
            }
        }}
        /> 
        <Loader active={isSubmitting}/>


    </Form>
  )
}
