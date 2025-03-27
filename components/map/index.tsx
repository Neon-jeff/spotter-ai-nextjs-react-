'use client'
import React from 'react'
import Map, { Marker, Popup, NavigationControl, GeolocateControl } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css';
import { useCurrentLocation } from '@/hooks/location';
import { Truck } from 'lucide-react';

const OutputMap = () => {

  const {data:current_location} = useCurrentLocation()
  const token = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN

  return (
    <div  className='xl:w-1/2 w-full rounded-3xl h-4/5 '>
        <div className='w-full xl:h-full h-[50vh]'>
        {
        current_location &&   <Map
        mapboxAccessToken={token}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        // style={classes.mapStyle}
        initialViewState={{ latitude: Number(current_location?.lat), longitude: Number(current_location?.lon), zoom: 10 }}
        maxZoom={20}
        minZoom={3}
        style={{borderRadius:20,height:'100%'}}
        
        
    >
      <Marker latitude={Number(current_location?.lat)} longitude={Number(current_location?.lon)} >
        <div className='bg-white border-2 border-blue-500 p-2 text-[.6rem] flex gap-1 items-center   rounded-full space-y-0'>
          <Truck size={15} className='text-green-600'/>
          <span className='text-[.5rem] inset-0 text-gray-600'>Current Location</span>
          <span className='font-bold'>{current_location.city}, {current_location.country}</span>
        </div>
      </Marker>
      <NavigationControl />
    </Map>
       }
        </div>
    </div>
  )
}



export default OutputMap