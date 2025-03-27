import { GetIP } from "@/actions/ip";
import { GetPlaces } from "@/actions/places";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useCurrentLocation(){
    return useQuery(
        {
            queryKey:['current-location'],
            queryFn: async () => await GetIP()
        }
    )
}


export function useFindLocation(){
    return useMutation({
        mutationFn:async(query:string)=>GetPlaces(query)
    })
}