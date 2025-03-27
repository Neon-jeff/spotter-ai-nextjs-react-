// 'use server'
import { endpoints } from "@/api/endpoints";
import { SaveTripBody, Trip } from "./types";



export async function SaveTrip(body: SaveTripBody): Promise<Trip> {
    try {
        const response = await fetch(endpoints.save_trip, {
            method: 'POST',
            body: JSON.stringify(body),
            headers:{
                "Content-type":'application/json'
            }
        })
        if (!response.ok) {
            console.log(response.statusText)
            const error = await response.json() || {}
            throw new Error(error || "Failed to save trip")
        }
        const data = await response.json()
        return data.data
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
        throw new Error('An error occurred while fetching the places')
    }
}

export async function GetAllTrips():Promise<Trip[]>{
    try {
        const response = await fetch(endpoints.save_trip, {
            method: 'GET',
        })
        if (!response.ok) {
            const error = await response.json() || {}
            throw new Error(error || "Failed to get trip")
        }
        const data = await response.json()
        return data.data
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
        throw new Error('An error occurred while fetching the places')
    }
}

export async function GetTrip(id:number):Promise<Trip>{
    try {
        const response = await fetch(endpoints.get_trip(id), {
            method: 'GET',
        })
        if (!response.ok) {
            const error = await response.json() || {}
            throw new Error(error || "Failed to get trip")
        }
        const data = await response.json()
        return data.data
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
        throw new Error('An error occurred while fetching the places')
    }
}