import { Search } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ searchQuery, setSearchQuery, placeholder }: SearchBarProps) {
  return (
    <div className="relative w-full sm:min-w-[350px] max-w-[450px]">
      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>

      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-5 pr-11 py-2.5 sm:py-3 text-sm sm:text-base 
                   bg-white border border-gray-100 rounded-[17.85px]
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   transition-all duration-200
                   shadow-[0_70.763px_19.763px_0_rgba(148,148,148,0),0_45.263px_17.85px_0_rgba(148,148,148,0.01),0_25.5px_15.3px_0_rgba(148,148,148,0.05),0_11.475px_11.475px_0_rgba(148,148,148,0.09),0_2.55px_6.375px_0_rgba(148,148,148,0.1)]"
      />
    </div>
  );
}
