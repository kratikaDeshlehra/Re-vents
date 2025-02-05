import { Timestamp } from "firebase/firestore"
import { createGenericSlice, GenericState } from "../../app/store/genericSlice"
import { Profile } from "../../app/types/profile"
import { PayloadAction } from "@reduxjs/toolkit"
type State={
    data : Profile[]
}

const initialState : State ={
    data : []
} 

export const ProfileSlice =createGenericSlice({
    name : 'profile',
    initialState : initialState as GenericState<Profile[]>,
    reducers :{
        success : {
            reducer : (state,action: PayloadAction<Profile[]> )=>{
                state.data=action.payload;
                state.status='finished'
            } 
            ,
            prepare : (profiles) =>{
                let profileArray: Profile[]=[];
                if(Array.isArray(profiles)){
                    profileArray=profiles;
                } 
                else {
                    profileArray.push(profiles);
                } 

                const mapped=profileArray.map(profile =>{
                    return {...profile, createdAt:(profile.createdAt as unknown as Timestamp).toDate().toISOString()}
                })  

                return {payload:mapped}
            }
        }
    }
})

export const actions=ProfileSlice.actions;