import { Button, Form } from "semantic-ui-react";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import { FieldValues, useForm } from "react-hook-form";
import { auth } from "../../app/config/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { closeModal } from "../../app/common/modals/modalSlice";
import { useAppDispatch } from "../../app/store/store";

export default function LoginForm() {
    const dispatch=useAppDispatch();
    const { register, handleSubmit, setValue,formState: { isSubmitting, isDirty, isValid, errors } } = useForm({
        mode: 'onTouched'
    });


    async function onSubmit(data: FieldValues) {
         try{
            await signInWithEmailAndPassword(auth,data.email,data.password);  
            dispatch(closeModal());
          }
         catch(error ){
            console.log(error);
         }
     

    }
    return (
        <ModalWrapper header='Sign into re-events'>
            <Form onSubmit={handleSubmit(onSubmit)}>
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
                <Button 
                loading={isSubmitting}
                disabled={!isValid || !isDirty || isSubmitting} 
                type='submit'
                fluid
                size='large'
                color='teal'
                content='Login'
                />


            </Form>
        </ModalWrapper>
    )
}
