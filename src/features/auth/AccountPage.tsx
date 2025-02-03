import { FieldValues, useForm } from "react-hook-form"
import { Link } from "react-router-dom";
import { Button, Form, Header, Icon, Segment } from "semantic-ui-react";
import { useAppSelector } from "../../app/store/store";
import { useEffect } from "react";
export default function AccountPage() {
    const {currentUser}=useAppSelector(state => state.auth);
        const { register, handleSubmit,getValues, setValue,watch,trigger,formState: { errors, isSubmitting, isValid } } = useForm({
        mode: 'onTouched'
    })
    
    const password1=watch('password1');
    const password2=watch('password2');

    useEffect (()=>{
         
        if(password2) trigger('password2');

    },[password2,trigger,password1])
    function onSubmit(data: FieldValues) {
        console.log(data);
    }
    return (
        <Segment>
            <Header dividing size="large" content='Account' />
            {currentUser?.providerId==='password' && 
            <div>
                <Header color='teal' sub content='Change password' />
                <p>Use this form to change your password</p>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Input
                        type='password'
                        defaultValue=''
                        placeholder='Password'
                        {...register('password1', { required: 'Password is required',
                          })}
                        error={errors.password1 && errors.password1.message} 
                        onChange={(e) => {

                            setValue('password1', e.target.value, { shouldValidate: true });
                        }}
                    />

                    <Form.Input
                        type='password'
                        defaultValue=''
                        placeholder='Confirm Password'
                        {...register('password2', { required: 'Confirm password is required',
                            validate:{
                                passwordMatch: value=> (value===getValues().password1) || 'Password do not match'
                           } 
                         })}
                        error={errors.password2?.type==='required' && errors.password2.message || 
                            errors.password2?.type==='passwordMatch' && errors.password2.message
                        } 
                        onChange={(e) => {

                            setValue('password2', e.target.value, { shouldValidate: true });
                        }}
                    /> 

                    <Button loading={isSubmitting} 
                    type='submit'
                    disabled={!isValid || isSubmitting}
                    positive
                    size="large"
                    content='Update password'
                    />
                </Form>
            </div>
}

                  {currentUser?.providerId==='github.com' && 
            <div>
                <Header  color='teal' sub content='GitHub account'/>
                <p> Please visit GitHub to update your account settings </p>
                <Button as={Link} to='https://github.com' color='black'>
                  <Icon name='github'/> Go to GitHub
                  </Button>
            </div>

                  }

            {currentUser?.providerId==='google.com' && 
            <div>
                <Header  color='teal' sub content='Google account'/>
                <p> Please visit Google to update your account settings </p>
                <Button as={Link} to='https://google.com'  color="google plus">

                  <Icon name='google'/> Go to Google
                  </Button>
            </div>}
        </Segment>
    )
}
