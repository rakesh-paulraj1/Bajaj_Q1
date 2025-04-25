

import  { useEffect, useState, useCallback } from 'react'
import { Layout } from '../components/Layout'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { DoctorCard } from '../components/doctorcard'
import { FilterPanel } from '../components/filterbox'
import { SearchBar } from '../components/searchbox'
import { Doctor } from '../utils/types'
const Dashboard = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)

  const [searchParams, setSearchParams] = useSearchParams()

  const applyFilters = useCallback((allDoctors: Doctor[]) => {
    let result = [...allDoctors]

    const search = searchParams.get('search') || ''
    const mode = searchParams.get('mode')
    const specialties = searchParams.getAll('specialty')
    const sort = searchParams.get('sort')

    if (search) {
      result = result.filter(doc =>
        doc.name?.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (mode) {
      if (mode === 'Video Consult') {
        result = result.filter(doc => doc.video_consult === true)
      } else if (mode === 'In Clinic') {
        result = result.filter(doc => doc.in_clinic === true)
      }
    }

    if (specialties.length > 0) {
      result = result.filter(doc =>
        Array.isArray(doc.specialities) &&
        specialties.some(spec => doc.specialities.map(s => s.name).includes(spec))
      )
    }

    if (sort === 'fees-asc') {
      result.sort((a, b) => {
        const feeA = parseInt((a.fees || '').replace(/[^\d]/g, '')) || 0
        const feeB = parseInt((b.fees || '').replace(/[^\d]/g, '')) || 0
        return feeA - feeB
      })
    } else if (sort === 'experience-desc') {
      result.sort((a, b) => {
        const expA = parseInt((a.experience || '').replace(/[^\d]/g, '')) || 0
        const expB = parseInt((b.experience || '').replace(/[^\d]/g, '')) || 0
        return expB - expA
      })
    }

    setFilteredDoctors(result)
  }, [searchParams])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json')
        console.log("data fetched")
        setDoctors(response.data)
        applyFilters(response.data)
        setLoading(false)
      } catch (e) {
        console.log("Data fetch error" + e)
      }
    }
    fetchData()
  }, [applyFilters])

  useEffect(() => {
    if (doctors.length) {
      applyFilters(doctors)
    }
  }, [searchParams, doctors, applyFilters])

  const handleSearch = (query: string) => {
    searchParams.set('search', query)
    setSearchParams(searchParams)
  }

  

  return (
    <Layout>
    
    <main className="p-4">
  <SearchBar 
    doctors={doctors} 
    onSearch={handleSearch} 
    initialQuery={searchParams.get('search') || ''}
  />

  <div className="flex flex-col md:flex-row gap-8 mt-8 h-[calc(100vh-120px)]">
    {/* Filter Panel - Fixed width and not scrollable */}
    <div className="w-full md:w-64 shrink-0 overflow-visible">
      <FilterPanel 
        doctors={doctors} 
        setSearchParams={setSearchParams}
        searchParams={searchParams}
      />
    </div>

    {/* Doctors List - Scrollable */}
    <div className="flex-1 overflow-y-auto pr-2">
      {loading ? (
        <p className="text-center py-8">Loading doctors...</p>
      ) : filteredDoctors.length === 0 ? (
        <p className="text-center py-8 text-gray-500">No doctors found matching your criteria.</p>
      ) : (
        <div className="space-y-6">
          {filteredDoctors.map(doctor => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  </div>
</main>

    </Layout>
  )
}

export default Dashboard
