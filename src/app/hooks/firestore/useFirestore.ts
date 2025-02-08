import { useCallback, useEffect, useRef } from "react"
import { useAppDispatch } from "../../store/store";
import { GenericActions } from "../../store/genericSlice";
import { collection, deleteDoc, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/Firebase";
import { DocumentData } from "firebase/firestore";
import { toast } from "react-toastify";
import { CollectionOptions } from "./types";
import { getQuery } from "./getQuery";
type ListnerState ={
    name ?: string,
    unsubscribe :()=> void
}

export const useFirestore =<T extends DocumentData>(path : string)=>{
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

       const loadCollections=useCallback((actions : GenericActions<T>,options?: CollectionOptions)=>{
            dispatch(actions.loading());

            const query=getQuery(path,options);

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

     
       const loadDocument =useCallback((id:string,actions: GenericActions<T>)=>{
           dispatch(actions.loading());
           const docRef=doc(db,path,id);
           const listener=onSnapshot(docRef,{
            next: doc=>{
                if(!doc.exists){
                    dispatch(actions.error('Document does not exist'));
                    return ;
                } 
                dispatch(actions.success({id:doc.id,...doc.data()} as unknown as T))
            }
           }) 

           listenerRef.current.push({name: path+'/'+ id, unsubscribe:listener})
       },[dispatch,path])

       const create= async (data: T )=>{
        try{
            const ref=doc(collection(db,path));
            await setDoc(ref,data);
            return ref; 
        }
         catch(error : any ){
            console.log(error);
            toast.error(error.message);
         }
       } 

       const update=async (id : string, data : T)=>{
        const docRef=doc(db,path,id);
       
        console.log(" Firestore Update Request:", { id, data });
        try{
            return await updateDoc(docRef,data);
        }
        catch(error: any){
            console.log(error);
            toast.error(error.message);
        } 
       } 

       const remove = async (id: string)=>{
        try{
            return await deleteDoc(doc(db,path,id))
        } 
        catch(error : any){
            console.log(error);
            toast.error(error.message);
        }
       } 

       const set =async (id: string,data : any)=>{
        try{
              
            return await setDoc(doc(db,path,id),data);

        } 
        catch(error : any ){
            console.log(error);
            toast.error(error.message);
        }
       }
       return{loadCollections,loadDocument,create,update,remove,set}
} 

