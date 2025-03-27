import {
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "./command";
import { Command as CommandPrimitive } from "cmdk";
import {
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { Controller } from "react-hook-form";
import { CircleAlert, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Properties } from "@/actions/types";
import { useFindLocation } from "@/hooks/location";
import { FormLabel } from "./form";


type AutoCompleteProps = {
  emptyMessage: string;
  name: string; // Required for react-hook-form
  form: any; // React Hook Form's control
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  label: string
};

export const AutoCompleteLocation = ({
  placeholder,
  emptyMessage,
  name,
  form,
  disabled,
  label
}: AutoCompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setOpen] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [internalOptions, setInternalOptions] = useState<Properties[]>([]);
  // const [selectedOption, setSelectedOption] = useState<Properties | null>(null);
  const [inputValue, setInputValue] = useState<string>(""); // New state for input
  const mutation = useFindLocation();

  // Handle search and update options
  const handleSearch = useCallback(async (search: string) => {
    setFetching(true);
    try {
      const data = await mutation.mutateAsync(search);
      setInternalOptions(data || []); // Ensure array fallback
    } catch (error) {
      console.error("Error fetching options:", error);
    }
    setFetching(false);
  }, [mutation]);

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field }) => {
        const { value, onChange } = field;
        // Sync selected option to the input field
        useEffect(() => {
          if (value) {
            setInputValue(`${value.formatted}`);
          }
          if (!value) {
            form.setError(name, {
              type: 'manual',
              message: "Pick up location is required"
            })

          }
        }, [value]);

        return (
          <CommandPrimitive>
            <div className="space-y-3">
              <FormLabel>{label}</FormLabel>
              <CommandInput
                ref={inputRef}
                value={inputValue}
                onValueChange={(val) => {
                  setInputValue(val);
                  setOpen(true);
                  handleSearch(val); // Fetch options dynamically
                }}
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
                placeholder={placeholder}
                disabled={disabled}
                className="text-sm border w-full"
              />
              {
                form.formState.errors[name] &&   <p
                data-slot="form-message"
                className={cn("text-pink-700 bg-pink-50 flex items-center gap-1 p-3 rounded-md text-[.7rem] ", )}
              >
                <CircleAlert size={15} /> Location is required
              </p>
              }
            </div>
            <div className="relative mt-1">
              <div
                className={cn(
                  "absolute top-0 z-10 w-full rounded-xl  bg-white outline-none",
                  isOpen ? "block animate-in fade-in-0 zoom-in-95" : "hidden"
                )}
              >
                <CommandList className="rounded-lg ring-1 ring-slate-200">
                  {isFetching && (
                    <CommandPrimitive.Loading>
                      <div className="p-5 text-center text-sm">
                        <LoaderCircle className="animate-spin w-4 h-4" />
                      </div>
                    </CommandPrimitive.Loading>
                  )}
                  {internalOptions.length > 0 && !isFetching ? (
                    <CommandGroup className="p-5">
                      {internalOptions.map((option, index) => {
                        const isSelected = value?.city === option.city;
                        return (
                          <CommandItem
                            key={option.city + "-" + index}
                            value={option.city}
                            onMouseDown={(e) => e.preventDefault()}
                            onSelect={() => {
                              onChange(option);
                              setInputValue(`${option.city}, ${option.country}`);
                              setOpen(false);
                            }}
                            className={cn(
                              "flex w-full items-center gap-2",

                            )}
                          >
                            {option.city && <span>{option.city}</span>}
                            {option.country && <span>{option.country}</span>}
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  ) : null}
                  {!isFetching && internalOptions.length === 0 && (
                    <CommandPrimitive.Empty className="select-none px-2 py-3 text-center text-sm">
                      {emptyMessage}
                    </CommandPrimitive.Empty>
                  )}
                </CommandList>
              </div>
            </div>
          </CommandPrimitive>
        );
      }}
    />
  );
};
