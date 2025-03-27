const API_URL = process.env.NEXT_PUBLIC_GEOAPI_URL;
const GEOAPI_KEY = process.env.NEXT_PUBLIC_GEOAPI_KEY;
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export const endpoints = {
    autocomplete_place:(query:string) => `${API_URL}?text=${query}&apiKey=${GEOAPI_KEY}`,
    save_trip:`${BACKEND_URL}/trips/`,
    get_trip:(id:number)=>`${BACKEND_URL}/trips/${id}`
}