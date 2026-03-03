'use client';

import { useIsMobile } from '@shared/hooks/use-mobile';
import { CloseIcon } from '@shared/icons/close-icon';
import { SlidersHorizontal } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import FilterDropdown from './filter-drop-down';
import { FILTER_OPTIONS } from './filter-options';
import SelectedFilters from './selected-filter';

export default function TemplateFilter({ results }: { results: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();


 
  const formatQueryValue = (value: string) =>
    value.toLowerCase().trim().replace(/\s+/g, '_');

  const getLabelFromValue = (category: keyof typeof FILTER_OPTIONS, urlValue: string) => {
    const options = (FILTER_OPTIONS as any)[category] as { label: string; value: string }[];
    const option = options.find((opt) => formatQueryValue(opt.value) === urlValue);
    return option ? option.label : urlValue;
  };

  
  const getValueFromLabel = (category: keyof typeof FILTER_OPTIONS, label: string) => {
    const options = (FILTER_OPTIONS as any)[category] as { label: string; value: string }[];
    const option = options.find((opt) => opt.label === label);
    return option ? option.value : label;
  };


  const isMobile = useIsMobile();

  const [isFilterOpen, setIsFilterOpen] = useState(false);


  
  const style =
    searchParams.get('style')?.split(',').filter(Boolean) || [];
  const column =
    searchParams.get('column')?.split(',').filter(Boolean) || [];
  const role =
    searchParams.get('role')?.split(',').filter(Boolean) || [];


  const updateFilter = (key: string, values: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (values.length > 0) {
      params.set(
        key,
        values.map((v) => formatQueryValue(v)).join(',')
      );
    } else {
      params.delete(key);
    }
    params.delete('offset');

   router.replace(`?${params.toString()}`, { scroll: false});
  };

  
  const clearAll = () => router.replace('?', { scroll: false});

  return (
   <>



    <div className="hidden md:flex flex-col gap-3">
      <div className="w-full bg-white rounded-3xl md:px-6 md:py-4 flex items-center gap-4 border p-0">
        <span className="text-md font-semibold text-black">
          Filter by
        </span>

        {/* STYLE */}
        <FilterDropdown
          label="Style"
          options={FILTER_OPTIONS.style}
          selectedValues={style.map((s) => getLabelFromValue('style', s))}
          onSelect={(vals) => updateFilter('style', vals)}
        />

        {/* COLUMN */}
        <FilterDropdown
          label="Column"
          options={FILTER_OPTIONS.column}
          selectedValues={column.map((c) => getLabelFromValue('column', c))}
          onSelect={(vals) => updateFilter('column', vals)}
        />

        {/* ROLE */}
        <FilterDropdown
          label="Role"
          options={FILTER_OPTIONS.role}
          selectedValues={role.map((r) => getLabelFromValue('role', r))}
          onSelect={(vals) => updateFilter('role', vals)}
        />
      </div>


         

      {/* SELECTED FILTERS DISPLAY */}
      <SelectedFilters
        style={style.map((s) => getLabelFromValue('style', s))}
        column={column.map((c) => getLabelFromValue('column', c))}
        role={role.map((r) => getLabelFromValue('role', r))}
        results={results}
        onClearAll={clearAll}
        onRemoveStyle={(label) =>
          updateFilter(
            'style',
            style
              .filter((s) => getLabelFromValue('style', s) !== label)
              .map((s) => getValueFromLabel('style', getLabelFromValue('style', s)))
          )
        }
        onRemoveColumn={(label) =>
          updateFilter(
            'column',
            column
              .filter((c) => getLabelFromValue('column', c) !== label)
              .map((c) => getValueFromLabel('column', getLabelFromValue('column', c)))
          )
        }
        onRemoveRole={(label) =>
          updateFilter(
            'role',
            role
              .filter((r) => getLabelFromValue('role', r) !== label)
              .map((r) => getValueFromLabel('role', getLabelFromValue('role', r)))
          )
        }
      />
    </div>

   {    

    isMobile && (
      <div className='w-fit'>
     <div className='bg-white border-2 border-gray-200 rounded-lg px-4 py-2'>
      <button onClick={() => setIsFilterOpen(!isFilterOpen)} className='flex items-center gap-2'>
        <SlidersHorizontal className="w-4 h-4" />
        <span className='text-md font-semibold text-black'>
          filter
        </span>
      </button>
     </div>
    </div>
    )
    

}
      {
        isFilterOpen && isMobile && (

       
         <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl px-6 pt-4 pb-8 animate-in slide-in-from-bottom duration-300 h-[60vh]">
          <div className='flex flex-col gap-2 p-4'>

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Filter Templates</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>

      <FilterDropdown
          label="Style"
          options={FILTER_OPTIONS.style}
          selectedValues={style.map((s) => getLabelFromValue('style', s))}
          onSelect={(vals) => updateFilter('style', vals)}
        />

        {/* COLUMN */}
        <FilterDropdown
          label="Column"
          options={FILTER_OPTIONS.column}
          selectedValues={column.map((c) => getLabelFromValue('column', c))}
          onSelect={(vals) => updateFilter('column', vals)}
        />

        {/* ROLE */}
        <FilterDropdown
          label="Role"
          options={FILTER_OPTIONS.role}
          selectedValues={role.map((r) => getLabelFromValue('role', r))}
          onSelect={(vals) => updateFilter('role', vals)}
        />



        {/* <SelectedFilters
        style={style.map((s) => getLabelFromValue('style', s))}
        column={column.map((c) => getLabelFromValue('column', c))}
        role={role.map((r) => getLabelFromValue('role', r))}
        results={results}
        onClearAll={clearAll}
        onRemoveStyle={(label) =>
          updateFilter(
            'style',
            style
              .filter((s) => getLabelFromValue('style', s) !== label)
              .map((s) => getValueFromLabel('style', getLabelFromValue('style', s)))
          )
        }
        onRemoveColumn={(label) =>
          updateFilter(
            'column',
            column
              .filter((c) => getLabelFromValue('column', c) !== label)
              .map((c) => getValueFromLabel('column', getLabelFromValue('column', c)))
          )
        }
        onRemoveRole={(label) =>
          updateFilter(
            'role',
            role
              .filter((r) => getLabelFromValue('role', r) !== label)
              .map((r) => getValueFromLabel('role', getLabelFromValue('role', r)))
          )
        }
      /> */}
        

        




    </div>
     </div>
   

        )
    }
    



</>

  );
}