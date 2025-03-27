import TripDetails from '@/components/trip'
import React from 'react'

const TripDetailsPage = async ({params}:{params:Promise<{id:number}>}) => {
    const {id} = await params
  return (
    <div className='bg-gray-50 min-h-screen flex items-center'>
        <TripDetails id={id}/>
    </div>
  )
}

export default TripDetailsPage