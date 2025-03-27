import z from 'zod';

const IpLocationSchema = z.object({
  ip: z.string().ip({ version: "v4" }).or(z.string().ip({ version: "v6" })), // IPv4 & IPv6 validation
  country: z.string().min(1, "Country is required"), 
  city: z.string().min(1, "City is required"), 
  lat: z.number().min(-90).max(90, "Invalid latitude"),  // Changed to number
  lon: z.number().min(-180).max(180, "Invalid longitude"), // Changed to number
});

export const DriverLocationSchema = z.object({
  country: z.string().min(1, "Country is required"),
  country_code: z.string().min(2).max(3, "Invalid country code"), 
  state: z.string().optional(),
  city: z.string().optional(), 
  lon: z.number().min(-180).max(180, "Invalid longitude"),
  lat: z.number().min(-90).max(90, "Invalid latitude"), 
  postcode: z.string().optional(),
  formatted:z.string()
});

export const FormSchema = z.object({
  current_location: IpLocationSchema,
  pickup_location: DriverLocationSchema,
  dropoff_location: DriverLocationSchema,
  current_cycle_used: z.string().nonempty({ message: 'Cycle time is required' }),
});

export type FormSubmitData = z.infer<typeof FormSchema>;
