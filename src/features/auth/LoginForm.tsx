import { Button, Form } from "semantic-ui-react";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch } from "../../app/folder/store";
import { closeModal } from "../../app/common/modals/modalSlice";
import { signIn } from "./authSlice";

export default function LoginForm() {

    const { register, handleSubmit, setValue,formState: { isSubmitting, isDirty, isValid, errors } } = useForm({
        mode: 'onTouched'
    });

    const dispatch = useAppDispatch();

    function onSubmit(data: FieldValues) {
        dispatch(signIn(data));
        dispatch(closeModal());

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
