import { OrderByDirection, WhereFilterOp } from "firebase/firestore";

export type CollectionOptions={
    queries ?: QueryOptions [];
    sort ?: SortOptions 

}

export type QueryOptions={
    attribute : string,
    operator : WhereFilterOp,
    value: string | number | boolean | any | Date
} 

type SortOptions ={
    attribute : string,
    order : OrderByDirection
}