'use client'
import { useGetSingleTrip } from '@/hooks/trip'
import { ChevronLeft, Clock, Truck } from 'lucide-react'
import React from 'react'
import ELDTruckLogChart from '../chart'
import DetailsMap from './map'
import { useRouter } from 'next/navigation'


const TripDetails = ({ id }: { id: number }) => {
    const { data: trip } = useGetSingleTrip(id)
    const router = useRouter()
    function handleBack(){
        router.push('/')
    }
    return (
        <div className='xl:w-4/5 w-11/12 mx-auto bg-white   text-gray-700  rounded-xl p-10 max-lg:px-5  text-sm flex justify-center max-lg:flex-col xl:gap-20 gap-10 items-center xl:h-[90vh] min-h-[90vh]'>
            <div className=' space-y-6 xl:w-1/2 w-full'>
                <button onClick={handleBack} className='border cursor-pointer p-2 flex items-center text-xs gap-0.5 pr-1 rounded-full bg-gray-100 text-gray-500'>
                    <ChevronLeft className='w-4 h-4'/>
                    Create new trip
                </button>
                <p className='font-semibold text-xl'>Details</p>
                <div className='space-y-4'>
                    <p className='flex flex-col gap-1'> 
                        <span className='text-xs text-gray-500 flex items-center gap-2'>
                        <PulsingIndicator/> Pickup
                        </span>
                        <span className=''>
                            {trip?.pickup_location.formatted }
                        </span>
                    </p>
                    <p className='flex flex-col gap-1'> 
                        <span className='text-xs text-gray-500 flex items-center gap-2'>
                        <PulsingIndicator/> Dropoff
                        </span>
                        <span className='flex items-center gap-1'>
                            {trip?.dropoff_location.formatted }
                        </span>
                    </p>
                    <div className='flex gap-5 '>
                        <div className='space-y-1'>
                            <p className='text-xs text-gray-500 flex items-center gap-2'><Clock className='w-3 h-3'/>Cycle used</p>
                            <p>{trip?.current_cycle_used}hrs</p>
                        </div>
                        <div className='space-y-1'>
                            <p className='text-xs text-gray-500 flex items-center gap-2'><Clock className='w-3 h-3'/>Trip duration</p>
                            <p>2hrs</p>
                        </div>
                        <div className='space-y-1'>
                            <p className='text-xs text-gray-500 flex items-center gap-2'><Truck className='w-3 h-3'/>Fuel stops</p>
                            <p>1000miles</p>
                        </div>
                    </div>
                </div>
               <div className='pt-5 space-y-6 '>
               <p className='font-semibold text-xl'>ELD Logging</p>
               <ELDTruckLogChart/>
                </div> 
            </div>
            {
                trip && <DetailsMap trip={trip}/>
            }
        </div>
    )
}


function PulsingIndicator(){
    return(
        <span className='w-2.5 h-2.5 border border-green-500 rounded-full flex justify-center items-center'>
            <span className='w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse'/>
        </span>
    )
}
export default TripDetails