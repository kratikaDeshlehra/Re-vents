
import { AppEvent } from "../../app/types/event"
import { Timestamp } from "firebase/firestore"
import { createGenericSlice, GenericActions, GenericState } from "../../app/store/genericSlice"
import { PayloadAction } from "@reduxjs/toolkit"
import { auth } from "../../app/config/Firebase"
type State={
    data:AppEvent[]
} 

const initialState: State={
   data : []
} 

export const eventSlice=createGenericSlice({
    name:'events',
    initialState : initialState as GenericState<AppEvent []>,
    reducers:{
        success :{
            reducer : (state,action: PayloadAction<AppEvent[]>)=>{
                state.data=action.payload;
                state.status='finished'
            } ,
            prepare :(events : any)=>{
                let eventArray:AppEvent[]=[];
                eventArray =Array.isArray(events)?events: [...eventArray,events];
                const mapped=eventArray.map((e: any)=>{
                   return {
                    ...e,
                    date:(e.date as Timestamp).toDate().toISOString(),
                    isHost:auth.currentUser?.uid ===e.hostUid,
                    isGoing : e.attendeeIds.includes(auth.currentUser?.uid)

                }
                });
                return {payload : mapped}
            }
        },
    
    }
}) 


export const actions=eventSlice.actions as GenericActions<AppEvent[]>