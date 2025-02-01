import { useCallback, useEffect, useRef } from "react"
import { useAppDispatch } from "../../store/store";
import { GenericActions } from "../../store/genericSlice";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../config/Firebase";
import { DocumentData } from "firebase/firestore";
type ListnerState ={
    name ?: string,
    unsubscribe :()=> void
}

export const useFirestore =<T>(path : string)=>{
       const listenerRef=useRef<ListnerState[]> ([]);

       useEffect(()=>{

            let  listenerRefValue : ListnerState[] | null=null;
            if(listenerRef.current){
                listenerRefValue=listenerRef.current;
            }
             return (()=>{
                if(listenerRefValue){
                   listenerRefValue.forEach(listener =>{
                      listener.unsubscribe();
                   })
                
                }
             })
       },[])

       const dispatch=useAppDispatch();

       const loadCollections=useCallback((actions : GenericActions<T>)=>{
            dispatch(actions.loading());

            const query=collection(db,path);

            const listener =onSnapshot(query,{
                next: querySnapshot =>{
                    const data: DocumentData[]=[];

                    if(querySnapshot.empty){
                        dispatch(actions.success([] as unknown as T))
                        return ;
                    } 

                    querySnapshot.forEach(doc =>{
                        data.push({id: doc.id, ...doc.data()})
                    }) 

                    dispatch(actions.success(data as unknown as T))
                },
                error: error =>{
                    dispatch(actions.error(error.message));
                    console.log('Collection error :',error.message);
                }
            })  

            listenerRef.current.push({name: path, unsubscribe: listener });

       },[dispatch,path])
       return{loadCollections}
} 

