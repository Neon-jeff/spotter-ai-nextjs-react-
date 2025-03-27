export interface Properties {
    country: string
    country_code: string
    state?: string
    city?: string
    lon: number
    lat: number
    postcode?: string
    formatted:string
  }

export interface SaveTripBody{
  current_location:{ip:string, country:string, city:string,lat:string | number,lon:string | number}
  pickup_location: Properties
  dropoff_location:Properties
  current_cycle_used:string
}

export interface Trip extends SaveTripBody{
  id : number
}