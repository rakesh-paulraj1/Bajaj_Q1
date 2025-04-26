

import { useEffect,useMemo, useState} from 'react';
interface Doctor {
  id: string;
  name: string;
}
interface SearchBarProps {
  doctors: Doctor[];
  initialQuery?: string;
  onSearch: (query: string) => void; 
}
export const SearchBar: React.FC<SearchBarProps> = ({ doctors, initialQuery = '', onSearch }) => {
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
 
 //for handlig large amount of data
  const filteredDoctors = useMemo(() => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return [];
    const searchLower = trimmedQuery.toLowerCase();
    return doctors.filter(doctor => doctor.name.toLowerCase().includes(searchLower));
  }, [query, doctors]);

//for providing time delay in search
 useEffect(()=>{
  const debouncesearch = setTimeout(() => {
    if(query.trim()){
      onSearch(query.trim())
     
     setSuggestions(filteredDoctors)
      setShowSuggestions(true)
    }else{
      setSuggestions([]);
      setShowSuggestions(false)
    }
  },300)
  return () => clearTimeout(debouncesearch)
 },[query, doctors, onSearch])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleSuggestionClick = (name: string) => {
    setQuery(name);
    setShowSuggestions(false);
    onSearch(name); 
    
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false);
      onSearch(query);
      
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto" data-testid="search-container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search by doctor name..."
        className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        data-testid="search-input"
      />
      {showSuggestions && suggestions.length > 0 && (
        <div
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg"
          data-testid="suggestions-dropdown"
        >
          {suggestions.map(doctor => (
            <div
              key={doctor.id}
              className="px-4 py-2 hover:bg-blue-50 text-black cursor-pointer"
              onClick={() => handleSuggestionClick(doctor.name)}
            >
              {doctor.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};