export type AppEvent={
    id:string
    title:string
    date:string
    description:string
    category:string
    city:string 
    venue:string 
    hostedBy:string
    hostPhotoURL:string
    attendees: Attendee[]
    isCancelled: boolean

}

export type Attendee ={
    id:string
    name:string
    photoURL:string
}