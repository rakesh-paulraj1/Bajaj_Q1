import { useEffect, useState } from 'react';
import { Sortoptions } from './sortboxoption';
import { Doctor } from '../utils/types';

interface FilterPanelProps {
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
  doctors: Doctor[]; 
}

export const FilterPanel = ({ searchParams, setSearchParams, doctors }: FilterPanelProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [specialties, setSpecialties] = useState<string[]>([]);

  useEffect(() => {
    const availableSpecialties = [
      ...new Set(
        doctors.flatMap(doc => doc.specialities?.map((spec: { name: string; }) => spec.name).filter(Boolean))
      ),
    ];
    setSpecialties(availableSpecialties);
  }, [doctors]);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const updateParam = (key: string, value: string, multi: boolean = false) => {
    const newParams = new URLSearchParams(searchParams);
    if (multi) {
      newParams.append(key, value);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const handleConsultationChange = (type: string) => {
    const current = searchParams.get('mode');
    const newParams = new URLSearchParams(searchParams);
    if (current === type) {
      newParams.delete('mode');
    } else {
      newParams.set('mode', type);
    }
    setSearchParams(newParams);
  };
  

  const toggleSpecialty = (specialty: string) => {
    const all = searchParams.getAll('specialty');
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('specialty');
    if (all.includes(specialty)) {
      all.filter(spec => spec !== specialty).forEach(spec => newParams.append('specialty', spec));
    } else {
      all.concat(specialty).forEach(spec => newParams.append('specialty', spec));
    }
    setSearchParams(newParams);
  };

  const currentConsultation = searchParams.get('mode') || '';
  const selectedSpecialties = searchParams.getAll('specialty');
  const currentSort = searchParams.get('sort') || '';

  return (
    <div className="w-full md:w-64 bg-white p-4 rounded-lg shadow-md">
      <div className="mb-6">
        <h3 
          className="font-semibold text-lg mb-2 p-2 bg-gray-100 text-black rounded-md cursor-pointer"
          onClick={() => toggleSection('consultation')}
        >
          Consultation Type
        </h3>
        {['Video Consult', 'In Clinic'].map(type => (
  <label key={type} className="flex items-center space-x-2">
    <input
      type="radio"
      name="mode"
      className="h-4 w-4 text-blue-600"
      checked={currentConsultation === type}
      onChange={() => handleConsultationChange(type)}
    />
    <span className="text-black">{type}</span>
  </label>
))}

      </div>

      <div className="mb-6">
        <h3 
          className="font-semibold text-lg mb-2 p-2 bg-gray-100 text-black rounded-md cursor-pointer"
          onClick={() => toggleSection('specialities')}
        >
          Specialities
        </h3>
        {expandedSection === 'specialities' && (
          <div className="space-y-2 pl-2 max-h-60 overflow-y-auto">
            {specialties.map(speciality => (
              <label key={speciality} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 rounded"
                  checked={selectedSpecialties.includes(speciality)}
                  onChange={() => toggleSpecialty(speciality)}
                />
                <span className="text-black">{speciality}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 
          className="font-semibold text-lg mb-2 p-2 text-black bg-gray-100 rounded-md cursor-pointer"
          onClick={() => toggleSection('sort')}
        >
          Sort By
        </h3>
        {expandedSection === 'sort' && (
          <Sortoptions 
            currentSort={currentSort}
            onSortChange={(sort) => updateParam('sort', sort)}
          />
        )}
      </div>
    </div>
  );
};
