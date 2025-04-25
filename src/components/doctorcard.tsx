import { Doctor } from '../utils/types';
// import Image from 'next/image';
interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex-shrink-0">
      {doctor.photo &&( <img
          src={doctor.photo} 
          alt={doctor.name} 
          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-blue-100"
         
        />)}  
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
        <p className="text-gray-600 italic mt-1">
          {doctor.specialities.map(s => s.name).join(', ')}
        </p>
        <p className="text-gray-700 mt-2">{doctor.experience}</p>
        
        <div className="flex flex-wrap gap-3 mt-3">
          {doctor.video_consult && (
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
              Video: {doctor.fees}
            </span>
          )}
          {doctor.in_clinic && (
            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
              Clinic: {doctor.fees}
            </span>
          )}
        </div>
        
        {doctor.clinic?.address && (
          <div className="mt-3 text-gray-600">
            <p>{doctor.clinic.name}</p>
            <p>{doctor.clinic.address.address_line1}</p>
            <p>{doctor.clinic.address.locality}, {doctor.clinic.address.city}</p>
          </div>
        )}

        {doctor.languages.length > 0 && (
          <div className="mt-3">
            <p className="text-sm text-gray-500">
              Speaks: {doctor.languages.join(', ')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};