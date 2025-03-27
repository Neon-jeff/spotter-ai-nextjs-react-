'use client'
import React from 'react'
import Map, { Marker, NavigationControl} from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css';
import { Truck } from 'lucide-react';
import { Trip } from '@/actions/types';




const DetailsMap = ({ trip }: { trip: Trip }) => {

    const token = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN

    return (
        <div className='xl:w-1/2 w-full rounded-3xl h-4/5 '>
            <div className='w-full xl:h-full h-[50vh]'>
                {
                    <Map
                        mapboxAccessToken={token}
                        mapStyle="mapbox://styles/mapbox/streets-v12"
                        initialViewState={{ latitude: Number(trip.pickup_location?.lat), longitude: Number(trip.pickup_location?.lon), zoom: 10 }}
                        maxZoom={20}
                        minZoom={3}
                        style={{ borderRadius: 20, height: '100%' }}
                    >
                        <Marker className='' latitude={Number(trip.current_location?.lat)} longitude={Number(trip.current_location?.lon)} >
                            <div className='bg-white p-2 text-[.6rem] border-2 border-blue-500 flex gap-1 items-center   rounded-full space-y-0'>
                                <Truck size={15} className='text-green-600' />
                                <span className='text-[.7rem] inset-0 text-gray-600'>Current Location</span>
                                <span className='font-bold'>{trip.current_location.city}, {trip.current_location.country}</span>
                            </div>
                            
                        </Marker>
                        <Marker latitude={Number(trip.pickup_location.lat)} longitude={Number(trip.pickup_location.lon)} >
                            <div className='bg-white p-2 text-[.6rem] border-2 border-blue-500 flex gap-1 items-center   rounded-full space-y-0'>
                                <Truck size={15} className='text-green-600' />
                                <span className='text-[.7rem] inset-0 text-gray-600'>Pickup</span>
                                {/* <span className='font-bold'>{trip.pickup_location.formatted}</span> */}
                            </div>
                        </Marker>
                        <Marker latitude={Number(trip.dropoff_location.lat)} longitude={Number(trip.dropoff_location.lon)} >
                            <div className='bg-white p-2 text-[.6rem] border-2 border-blue-500 flex gap-1 items-center   rounded-full space-y-0'>
                                <Truck size={15} className='text-green-600' />
                                <span className='text-[.7rem] inset-0 text-gray-600'>Dropoff</span>
                                {/* <span className='font-bold'>{trip.pickup_location.formatted}</span> */}
                            </div>
                        </Marker>
                     
                        <NavigationControl />
                        {/* <PolylineOverlay points={[[Number(trip.current_location.lon), Number(trip.current_location.lat)], [Number(trip.pickup_location.lon), Number(trip.pickup_location.lat)], [Number(trip.dropoff_location.lon),Number(trip.dropoff_location.lat)]]} /> */}
                    </Map>
                }
            </div>
        </div>
    )
}

// const PolylineOverlay = ({ points, color = 'red', lineWidth = 2, renderWhileDragging = true }: { points: [number, number][]; color?: string; lineWidth?: number; renderWhileDragging?: boolean }) => {
//     const redraw = useCallback(({ width, height, ctx, project }:any) => {
//       ctx.clearRect(0, 0, width, height)
//       ctx.globalCompositeOperation = 'lighter'
  
//       if (points) {
//         ctx.lineWidth = lineWidth
//         ctx.strokeStyle = color
//         ctx.beginPath()
//         points.forEach(([lng, lat], index) => {
//           const [x, y] = project([lng, lat])
//           if (index === 0) ctx.moveTo(x, y)
//           else ctx.lineTo(x, y)
//         })
//         ctx.stroke()
//       }
//     }, [points, color, lineWidth])
  
//     return <CanvasOverlay redraw={redraw} />
//   }
  



export default DetailsMap