import { GetTrip, SaveTrip } from "@/actions/trips";
import { SaveTripBody } from "@/actions/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useSaveTrip(){
    return useMutation({
        mutationFn:async(body:SaveTripBody) => SaveTrip(body)
    })
}

export function useGetSingleTrip(id:number){
    return useQuery({
        queryKey:[`trip-${id}`],
        queryFn:async()=>GetTrip(id)
    })
}