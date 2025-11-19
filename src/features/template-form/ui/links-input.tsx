import { Sortable, SortableItem } from '@shared/ui/components/sortable';
import { UrlInput } from './url';

export function LinksInput({ data, onChange, section }: { data: any; onChange: (data: any) => void; section: any }) {
  // Handle null/undefined data
  if (!data || typeof data !== 'object') {
    return null;
  }

  function handleDragEnd(data: any) {
    const transformedData = data.reduce((acc: any, item: any) => {
      const { key, ...rest } = item;
      acc[item.key] = rest;
      return acc;
    }, {});

    onChange(transformedData);
  }

  const transformedData = Object.entries(data).map(([key, value]) => ({
    ...value,
    key,
  }));

  return (
    <Sortable data={transformedData} getId={(item) => item.key} onDragEnd={handleDragEnd}>
      {(localData) => {
        return localData.map((item: any) => (
          <SortableItem id={item.key} key={item.key}>
            <UrlInput
              data={item}
              onChange={(newValue) => {
                const newData = { ...data, [item.key]: newValue };
                onChange(newData);
              }}
              section={section}
            />
          </SortableItem>
        ));
      }}
    </Sortable>
  );
}
