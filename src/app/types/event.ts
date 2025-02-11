export type AppEvent={
    id:string
    title:string
    date:string
    description:string
    category:string
    city:string 
    venue:string 
    hostedBy:string
    hostUid: string
    hostPhotoURL:string
    attendees: Attendee[]
    isCancelled: boolean
    attendeeIds:string
    isHost ?: boolean
    isGoing ?: boolean

}

export type Attendee ={
    id:string
    displayName:string
    photoURL:string
} 

export type ChatComment ={
    id : string,
    displayName : string,
    photoURL : string,
    uid : string,
    text : string,
    date : string
}