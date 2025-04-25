// types.ts
export interface Speciality {
    name: string;
  }
  
  export interface Address {
    locality: string;
    city: string;
    address_line1: string;
    location: string;
    logo_url: string;
  }
  
  export interface Clinic {
    name: string;
    address: Address;
  }
  
  export interface Doctor {
    id: string;
    name: string;
    name_initials: string;
    photo: string;
    doctor_introduction: string;
    specialities: Speciality[];
    fees: string;
    experience: string;
    languages: string[];
    clinic: Clinic;
    video_consult: boolean;
    in_clinic: boolean;
  }
  
  export interface Filters {
    consultationType: string;
    specialities: string[];
    sort: string;
  }
  
  export interface FilterChangeParams {
    consultationType?: string;
    specialities?: string[];
    sort?: string;
  }