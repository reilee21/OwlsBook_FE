import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function TooltipLabel({label,className}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
            <div className={`font-semibold truncate  ${className ? className : 'max-w-[400px]'}`}>
                {label}
            </div>
        </TooltipTrigger>
        <TooltipContent>
            <div className='font-semibold text-wrap max-w-[500px]'>
                {label}
            </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
