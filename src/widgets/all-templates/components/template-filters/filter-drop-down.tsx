'use client';
import { cn } from "@shared/lib/utils";
import { Badge } from "@shared/ui/badge";
import { Button } from "@shared/ui/button";
import { Command, CommandGroup, CommandItem, CommandSeparator } from "@shared/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@shared/ui/popover";
import { Check, ChevronDown } from "lucide-react";


export interface FilterDropdownProps {
    label: string;
    options: Option[];
    selectedValues: string[];
    onSelect: (values: string[]) => void;
}


export default function FilterDropdown({
    label,
    options,
    selectedValues,
    onSelect,




}: FilterDropdownProps) {

 

  const getLabel = (value :string) => options.find((o) => o.value === value)?.label ?? value;


  const toggleOption = (value:string) =>{
    if(selectedValues.includes(value)){
      onSelect(selectedValues.filter((v) => v !== value));
    
    }
    else{
      onSelect([...selectedValues,value])
    }
  }
  

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center justify-between min-w-[140px] rounded-xl px-4 py-3 font-medium text-gray-700 border-gray-300 gap-6">
          <div className="flex items-center gap-2">
            {selectedValues.length > 0 ? (
              <>
                <span>{label}:</span>
                <span>{getLabel(selectedValues[0])}</span>
                {selectedValues.length > 1 && (
                  <Badge variant="secondary">+{selectedValues.length - 1}</Badge>
                )}
              </>
            ) : (
              <span>{label}</span>
            )}
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-56 p-0 rounded-2xl" align="start">
        <Command>
          <CommandGroup>
            {options.map((option) => {
              if (option.disabled) {
                return <CommandSeparator key={option.label} className="my-1" />;
              }
              const isSelected = selectedValues.includes(option.value);
              return (
                <CommandItem
                  key={option.value}
                  onSelect={() => toggleOption(option.value)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2.5 cursor-pointer',
                    isSelected ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  )}
                >
                  <div className={cn(
                    'w-5 h-5 rounded border flex items-center justify-center',
                    isSelected ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'
                  )}>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                  </div>
                  <span className="text-sm">{option.label}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
    

