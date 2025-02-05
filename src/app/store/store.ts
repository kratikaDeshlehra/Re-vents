import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { eventSlice } from "../../features/events/eventSlice";
import { modalSlice } from "../common/modals/modalSlice";
import { authSlice } from "../../features/auth/authSlice";
import { ProfileSlice } from "../../features/profiles/ProfileSlice";

 export const store =configureStore({
    reducer:{
      events:eventSlice.reducer,
      modals:modalSlice.reducer,
      auth:authSlice.reducer,
      profiles: ProfileSlice.reducer,
    }
 })


 //creating custom hooks for working with redux toolkit 
 export type RootState=ReturnType<typeof store.getState>

 export type AppDispatch=typeof store.dispatch

 export const useAppDispatch:()=> AppDispatch=useDispatch
 export const useAppSelector: TypedUseSelectorHook<RootState>=useSelector