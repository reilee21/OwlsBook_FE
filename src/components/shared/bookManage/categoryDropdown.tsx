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
import { useGetAllCatesQuery } from "@/services/cate/CateApi"

interface Props{
  width : string;
  defaultValue:string | null;
  onChange:(nameCate:string)=>void;
}
export default function CategoryDropdown({ width,defaultValue,onChange}:Props) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  

  const {data:cates,isLoading} = useGetAllCatesQuery();
  React.useEffect(()=>{
    if(cates && defaultValue){
      var defaultCate = cates.find((cate)=>cate.categoryId === defaultValue);
      if(defaultCate){
        setValue(defaultCate?.categoryName)
        onChange(defaultCate?.categoryName)
      }
    }
  },[cates,defaultValue])

  const handleSelect = (currentValue:string,prevalue) =>{
    const newValue =  currentValue === prevalue ? "" : currentValue;
    setValue(newValue)
    setOpen(false)
    onChange(newValue)

  }

  if(isLoading) return<>..Loading</>
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`${width ? width : 'w-[250px]'} justify-between`}
        >
          {value
            ? cates.find((cate) => cate.categoryName === value)?.categoryName
            : "Chọn danh mục..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`${width ? width : 'w-[250px]'} p-0`}>
        <Command>
          <CommandInput placeholder="Tìm danh mục..."/>
          <CommandEmpty>Không tìm thấy danh mục.</CommandEmpty>
          <CommandGroup>
             <CommandList>
                {cates.map((cate) => (
                <CommandItem
                    key={cate.categoryId.toString()}
                    value={cate.categoryName}
                    onSelect={(currentValue) => {
                      handleSelect(currentValue,value)
                    }}
                >
                    <Check
                    className={cn(
                        "mr-2 h-4 w-4",
                        value === cate.categoryName ? "opacity-100" : "opacity-0"
                    )}
                    />
                    {cate.categoryName}
                </CommandItem>
                ))}
              </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
