'use server'
import { headers } from "next/headers"

export async function GetIP():Promise<{ip:string, country:string, city:string,lat:string,lon:string}> {
    try {
        const response = await fetch('http://ip-api.com/json/')
        const data = await response.json()
        return {
            ip: data.query,
            country: data.country,
            city: data.city,
            lat: data.lat,
            lon: data.lon
        }
    }
    catch (error) {
        if (error instanceof Error) {
           throw new Error(error.message)
        }
        throw new Error('An error occurred while fetching the IP')
    }
}