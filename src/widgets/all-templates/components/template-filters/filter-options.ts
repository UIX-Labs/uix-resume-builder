export interface FilterOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface FilterOptions {
  style: FilterOption[];
  layoutType: FilterOption[];
  role: FilterOption[];
  colors: string[];
}




export const FILTER_OPTIONS :FilterOptions = {
  style: [
    { label: 'Traditional', value: 'traditional' },
    { label: 'Creative', value: 'creative' },
    { label: 'Contemporary', value: 'contemporary' },
    { label: '── Photo ──', value: '', disabled: true },
    { label: 'With photo', value: 'with_photo' },
    { label: 'Without photo', value: 'without_photo' },
  ],

  layoutType: [
    { label: 'Single', value: 'single_column' },
    { label: 'Double', value: 'double_column' },
  ],

  role: [
    { label: 'Software Developer', value: 'software_developer' },
    { label: 'Retail And Sales', value: 'retail_and_sales' },
    { label: 'Management And Executive', value: 'management_and_executive' },
    { label: 'Finance', value: 'finance' },
  ],

  colors: ['#C5244E', '#F03126', '#3DB482', '#FFBE1B', '#6927B3', '#D52078', '#16C5F5', '#005FF2'],
};
