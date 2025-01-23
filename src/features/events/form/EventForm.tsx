
import { Link,  useNavigate,  useParams } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../../app/folder/store";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { categoryOptions } from "./categoryOptions";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from "react-datepicker";
import { createId } from "@paralleldrive/cuid2";
import { createEvent, updateEvent } from "../eventSlice";

export default function EventForm() {
    let { id } = useParams();
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors, isValid,isSubmitting}
    } = useForm({
        mode:'onTouched'
    }
        
    );
   
    const event = useAppSelector(state => state.events.events.find(e => e.id === id));
    const dispatch=useAppDispatch();
    const navigate=useNavigate();

    function onSubmit(data: FieldValues) {
        id=id ?? createId();
        event ? dispatch(updateEvent({...event,...data, date:data.date.toString()})) :
        dispatch(createEvent({...data,id,hostedBy:'bob',attendees :[],hostPhotoURL:'',date: data.date.toString()}))
        navigate(`/events/${id}`);
        console.log(data);
    }
    return (
        <Segment clearing>
            <Header content='Event details' sub color='teal'/>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Input
                    placeholder="Event title"
                    defaultValue={event?.title || ""}
                    {...register('title', { required:'Tile is required' })}
                    error={errors.title ? { content: errors.title.message } : null}
                    onChange={(e) => {
                        // Update value and trigger validation
                        setValue('title', e.target.value, { shouldValidate: true });
                    }}
                    // error={errors.title && 'Title is required'}
                   
                />
               
                   <Controller
                   name='category'
                   control={control} 
                   rules={{required:'Category is required'}}
                   defaultValue={event?.category }
                   render={({field})=>(
                    <Form.Select
                    options={categoryOptions}
                        placeholder="Category"
                        clearable
                        {...field}
                        onChange={(_,d)=> setValue('category',d.value,{shouldValidate : true})}
                       
                        error={errors.category && errors.category.message}
                    />
                   )}
                   />
                   
               
                <Form.TextArea
                    placeholder="Description"
                    defaultValue={event?.description || ''}
                    {...register('description' ,{required:'Description is required'})}
                    error={errors.description && errors.description.message}
                    onChange={(e) => {
                        // Update value and trigger validation
                        setValue('description', e.target.value, { shouldValidate: true });
                    }}

                />
                <Header sub content='Location details' color='teal'/>
                <Form.Input
                    placeholder="City"
                    defaultValue={event?.city || ''}
                    {...register('city',{required:'City is required'} )}
                    error={errors.city && errors.city.message}
                    onChange={(e) => {
                        // Update value and trigger validation
                        setValue('city', e.target.value, { shouldValidate: true });
                    }}

                />

                <Form.Input
                    placeholder="Venue"
                    defaultValue={event?.venue || ''}
                    {...register('venue',{required:'Venue is required'})}
                    error={errors.venue && errors.venue.message}
                    onChange={(e) => {
                        // Update value and trigger validation
                        setValue('venue', e.target.value, { shouldValidate: true });
                    }}

                />
                 <Form.Field>
                    <Controller 
                    name='date'
                    control={control}
                    rules={{required: 'Date is required'}}
                    defaultValue={event && new Date(event.date) || null}
                    render={({field})=>(
                        <DatePicker
                        selected={field.value}
                        onChange={value => setValue('date',value,{shouldValidate:true})}
                        showTimeSelect
                        timeCaption="time"
                        dateFormat='MMM d,yyyy h:mm aa'
                        placeholderText="Event date and time "
                        />
                    )}
                    />
                 </Form.Field>




                <Button 
                loading={isSubmitting
                } 
                disabled={!isValid && !id || isSubmitting}
                type='submit' floated="right" positive content='Submit'
                
                />
                <Button 
                disabled={isSubmitting}

                as={Link} to={'/events'} type='button' floated="right" content="Cancel" />
            </Form>
        </Segment>
    );
}
