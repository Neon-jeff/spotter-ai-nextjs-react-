import { endpoints } from "@/api/endpoints"
import { Properties } from "./types"

export async function GetPlaces(query:string):Promise<Properties[]> {
    try {
        const response = await fetch(`${endpoints.autocomplete_place(query)}`)
        const data = await response.json()
        return data.features.map((feature:any) => {
            const { properties } = feature
            return ({
                country: properties.country,
                country_code: properties.country_code,
                state: properties.state || "",
                city: properties.city || "",
                lon: properties.lon,
                lat: properties.lat,
                formatted: properties.formatted,
            })
        })
    }
    catch (error) {
        if (error instanceof Error) {
           throw new Error(error.message)
        }
        throw new Error('An error occurred while fetching the places')
    }
}