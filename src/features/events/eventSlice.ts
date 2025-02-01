import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppEvent } from "../../app/types/event"
import { Timestamp } from "firebase/firestore"

type State={
    events:AppEvent[]
} 

const initialState: State={
    events:[]
} 

export const eventSlice=createSlice({
    name:'events',
    initialState,
    reducers:{
        setEvents:{
            reducer : (state,action: PayloadAction<AppEvent[]>)=>{
                state.events=action.payload;
            } ,
            prepare :(events : any)=>{
                let eventArray:AppEvent[]=[];
                eventArray =Array.isArray(events)?events: [...eventArray,events];
                const mapped=eventArray.map((e: any)=>{
                   return {...e,date:(e.date as Timestamp).toDate().toISOString()}
                });
                return {payload : mapped}
            }
        },
    
    }
}) 


export const {setEvents}=eventSlice.actions