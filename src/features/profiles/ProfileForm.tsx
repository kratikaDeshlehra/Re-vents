import { FieldValues, useForm } from "react-hook-form";
import { useFirestore } from "../../app/hooks/firestore/useFirestore"
import { Profile } from "../../app/types/profile";
import { updateProfile } from "firebase/auth";
import { auth } from "../../app/config/Firebase";
import { Button, Form } from "semantic-ui-react";

type Props = {
    profile: Profile
    setEditMode: (value: boolean) => void
}

export default function ProfileForm({ profile, setEditMode }: Props) {

    const { update } = useFirestore('profiles');
    const { register, handleSubmit,setValue,formState: { errors, isSubmitting} } = useForm({
        mode: 'onTouched',
        defaultValues: {
            displayName: profile.displayName,
            description: profile.description || ""
        }
    })

    async function onSubmit(data: FieldValues) {
       
        await update(profile.id,{
            displayName: data.displayName,
            description: data.description ?? ""
        });
        if (profile.displayName !== data.displayName) {
            await updateProfile(auth.currentUser!, {
                displayName: data.displayName
            });
        } 
        setEditMode(false);
    }
    return (
        <Form onSubmit={handleSubmit(onSubmit)} >

            <Form.Input placeholder='Display Name'
                {...register('displayName', { required:'Display name is required' })}
                error={errors.displayName && errors.displayName.message}
                onChange={(e) => {
                    setValue('displayName', e.target.value, { shouldValidate: true });
                }}
            />

            <Form.TextArea placeholder='Tell us about yourself '
                {...register('description')}
                onChange={(e) => setValue('description', e.target.value)} 
            /> 

            <Button loading={isSubmitting} 
             floated="right"
             type="submit"
             size="large"
             positive
             content='Update Profile'
            />
        </Form>
    )
}
