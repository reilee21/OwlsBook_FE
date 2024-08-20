"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface Props{
  width : string;
  defaultValue:number | null;
  onChange:(year:number)=>void;
}
const getYears = (startYear: number) => {
    const currentYear = new Date().getFullYear()
    const years = []
    for (let year = startYear; year <= currentYear; year++) {
      years.push(year)
    }
    return years
  }


export default function YearPicker({ width,defaultValue,onChange}:Props) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<number | null>(defaultValue)
  const years = getYears(1800)
  
  const handleSelect = (currentValue: string) => {
    const newValue = parseInt(currentValue)
    setValue(newValue)
    setOpen(false)
    onChange(newValue)
  }


  return (
    <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className={`${width ? width : 'w-[250px]'} justify-between`}
      >
        {value ? value.toString() : "Chọn năm xuất bản..."}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className={`${width ? width : 'w-[250px]'} p-0`}>
      <Command>
        <CommandInput placeholder="Search year..." />
        <CommandEmpty>Không có năm cần tìm.</CommandEmpty>
        <CommandGroup>
          <CommandList>
            {years.map((year) => (
              <CommandItem
                key={year.toString()}
                value={year.toString()}
                onSelect={(currentValue) => {
                  handleSelect(currentValue)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === year ? "opacity-100" : "opacity-0"
                  )}
                />
                {year}
              </CommandItem>
            ))}
          </CommandList>
        </CommandGroup>
      </Command>
    </PopoverContent>
  </Popover>
  )
}
