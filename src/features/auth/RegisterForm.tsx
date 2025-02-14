import { Button, Form, Label } from "semantic-ui-react";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import { FieldValues, useForm } from "react-hook-form";
import { auth } from "../../app/config/Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { closeModal } from "../../app/common/modals/modalSlice";
import { useAppDispatch } from "../../app/store/store";
import { useFirestore } from "../../app/hooks/firestore/useFirestore";
import { Timestamp } from "firebase/firestore";

export default function RegisterForm() {

    const {set}=useFirestore('profiles');

    const dispatch=useAppDispatch();
    const { register, handleSubmit, setError, setValue,formState: { isSubmitting, isDirty, isValid, errors } } = useForm({
        mode: 'onTouched'
    });


    async function onSubmit(data: FieldValues) {
         try{
            const userCreds=await createUserWithEmailAndPassword(auth,data.email,data.password)
           await updateProfile(userCreds.user,{
            displayName: data.displayName,
           })
            await set(userCreds.user.uid,{
                displayName: data.displayName,
                email : data.email,
                createdAt: Timestamp.now()
            })
            dispatch(closeModal());
          }
         catch(error : any ){
            setError('root.serverError',{
                type:'400',
                message:error.message
            })
         }
     

    }
    return (
        <ModalWrapper header='Register to re-events'>
            <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Input
                    defaultValue=''
                    placeholder='Display name '
                    {...register('displayName',{required:'Display name  is required'} )}
                    error={errors.displayName && errors.displayName.message}
                    onChange={(e) => {
                        // Update value and trigger validation
                        setValue('displayName', e.target.value, { shouldValidate: true });
                    }}
                /> 
                <Form.Input
                    defaultValue=''
                    placeholder='Email address'
                    {...register('email',{required:'Email is required'} )}
                    error={errors.email && errors.email.message}
                    onChange={(e) => {
                        
                        setValue('email', e.target.value, { shouldValidate: true });
                    }}
                />

                <Form.Input
                    type='password'
                    defaultValue=''
                    placeholder='Password'
                    {...register('password',{required:'Password is required'} )}
                    error={errors.password && errors.password.message}
                    onChange={(e) => {
                        // Update value and trigger validation
                        setValue('password', e.target.value, { shouldValidate: true });
                    }}
                /> 

                {errors.root && (
                    <Label basic  color='red' style={{display: 'block',marginBottom:10}}
                    content={errors.root.serverError.message}
                    />
                )}
                <Button 
                loading={isSubmitting}
                disabled={!isValid || !isDirty || isSubmitting} 
                type='submit'
                fluid
                size='large'
                color='teal'
                content='Register'
                />


            </Form>
        </ModalWrapper>
    )
}
