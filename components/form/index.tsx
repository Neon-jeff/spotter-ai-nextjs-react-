'use client'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormSchema, FormSubmitData } from './validator'
import { zodResolver } from '@hookform/resolvers/zod'
import { Clock, LoaderCircle, MapPin } from 'lucide-react'
import { useCurrentLocation } from '@/hooks/location'
import { AutoCompleteLocation } from '../ui/autocomplete'
import { useSaveTrip } from '@/hooks/trip'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const RouteForm = () => {
  const router = useRouter()
  const mutation = useSaveTrip()
  const form = useForm<FormSubmitData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
    }
  })
  const onSubmit = (data: FormSubmitData) => {
    mutation.mutate(data)
  }
  const { data: current_location } = useCurrentLocation()

  useEffect(() => {
    if (current_location) {
      form.setValue('current_location', {...current_location,lat:Number(current_location.lat),lon:Number(current_location.lon)})
    }
  }, [current_location])

  useEffect(()=>{
    if(mutation.isSuccess){
      form.setValue('pickup_location', {
        country: '',
        lat: 0,
        lon: 0,
        country_code: '',
        formatted: '',
        city: undefined,
        state: undefined,
        postcode: undefined,
      })
      form.setValue('dropoff_location', {
        country: '',
        lat: 0,
        lon: 0,
        country_code: '',
        formatted: '',
        city: undefined,
        state: undefined,
        postcode: undefined,
      })
      form.setValue('current_cycle_used','')
      toast.success("Trip saved successfully, loading your results")
      router.push(`trips/${mutation.data.id}`)
    }
    if(mutation.isError){
      toast.error("Failed to save trip")
    }
  },[mutation.isSuccess,mutation.isError])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 xl:w-1/3 w-full bg-white  rounded-3xl">
        <div>
          <div className='space-y-2 lg:w-4/5'>
            <h1 className='text-xl font-semibold '>Enter Trip Information</h1>
            <p className='text-xs text-gray-500'>Enter the correct informations in the fields below to get your trip map and ELD log</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-gray-50 p-3 rounded-xl'>
          <span className='border p-2 rounded-full border-green-100'><MapPin size={18} className='text-green-600' /></span>
          <div className='space-y-.5'>
            <p className=' text-[.7rem] text-gray-500 font-medium'> Current Location</p>
            <p className='text-sm text-green-600'>{current_location?.city},{current_location?.country}</p>
          </div>

        </div>

        <AutoCompleteLocation
          label='Pick up'
          name='pickup_location'
          form={form}
          placeholder='enter pickup location'
          emptyMessage='Search for location'
        />

        <AutoCompleteLocation
          label='Drop off'
          name='dropoff_location'
          form={form}
          placeholder='enter dropoff location'
          emptyMessage='Search for location'
        />

        <FormField
          control={form.control}
          name="current_cycle_used"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='lg:text-sm'>Current cycles  (Hours)</FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input placeholder="enter cycles used" className='ps-10' {...field} type='number' />
                  <span className='absolute top-1/2 -translate-y-1/2 left-4'><Clock size={15} className='text-gray-400' /></span>
                </div>
              </FormControl>
          
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={mutation.isPending} className='w-full h-12 disabled:opacity-60 text-sm rounded-full'>
          {
            mutation.isPending ? <LoaderCircle className='w-4 h-4 animate-spin text-white'/> : "Get trip details"
          }
        </Button>
      </form>
    </Form>

  )
}

export default RouteForm