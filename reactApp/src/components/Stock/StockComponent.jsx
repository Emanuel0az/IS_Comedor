'use client'

import React, { useState, useEffect, useRef } from 'react'
import { getStudents, getAttendance } from '../../server/S_Stock/S_Stock'
import { parseISO, isSameWeek } from 'date-fns'
import '../Stock/StockComponent.css'
import SearchIcon from '@mui/icons-material/Search';

const StockComponent = () => {
  const [students, setStudents] = useState([])
  const [attendance, setAttendance] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  
  const searchInputRef = useRef(null) // Crear la referencia

  useEffect(() => {
    extractData()
  }, [])

  const extractData = async () => {
    try {
      const studentsData = await getStudents()
      const attendanceData = await getAttendance()
      
      const referenceDate = new Date(2024, 9, 1)

      const attendanceMap = {}
      studentsData.forEach(student => {
        attendanceMap[student.estudiante_id] = {
          attended: 0,
          absent: 5
        }
      })

      attendanceData.forEach(record => {
        const recordDate = parseISO(record.fecha_asistencia)
        if (isSameWeek(recordDate, referenceDate, { weekStartsOn: 1 })) {
          if (attendanceMap[record.estudiante_id]) {
            attendanceMap[record.estudiante_id].attended++
            attendanceMap[record.estudiante_id].absent--
          }
        }
      })
      
      console.log('Mapa de asistencia:', attendanceMap)
      
      setStudents(studentsData)
      setAttendance(attendanceMap)
    } catch (error) {
      console.error('Error al obtener los datos:', error)
    }
  }

  const getAttendanceColor = (daysAttended) => {
    if (daysAttended >= 4) return 'text-green-600'
    if (daysAttended >= 2) return 'text-yellow-600'
    return 'text-red-600'
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredStudents = students.filter(student =>
    student.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.seccion.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const focusSearchInput = () => {
    searchInputRef.current.focus(); // Forzar el foco en el input
  }

  return (
    <div className="containerAll">

      <div className="containerFormStock">
        <SearchIcon className="lupa" onClick={focusSearchInput}/> {/* Asocia el evento onClick */}
        <input
          type="text"
          placeholder="Buscar por nombre o sección..."
          value={searchTerm}
          onChange={handleSearch}
          className="search_input"
          aria-label="Buscar por nombre o sección"
          ref={searchInputRef}  // Asocia la referencia al input
        />
      </div>
      <div className="containerStock">
        <div className="tittles">
          <div>Cédula</div>
          <div>Nombre</div>
          <div>Sección</div>
          <div>Asistencia</div>
        </div>
        <div className="students">
          {filteredStudents.map((student) => {
            const attendanceInfo = attendance[student.estudiante_id] || { attended: 0, absent: 5 }
            return (
              <div key={student.estudiante_id} className="student">
                <div className='cedula_s'>{student.estudiante_id}</div>
                <div className='name_s'>{student.nombre}</div>
                <div className='seccion_s'>{student.seccion}</div>
                <div className={`asistencia_s ${getAttendanceColor(attendanceInfo.attended)}`}>
                  Asistió {attendanceInfo.attended} días, Faltó {attendanceInfo.absent} días

      <div>Alertas</div>
        <div className="containerFormStock"></div>
        <div className="containerStock">
            <div className="tittles">
              <div>Cédula</div>
              <div>Nombre</div>
              <div>Sección</div>
            </div>
            <div className="students">
              {students.map((student, index) => (
                <div key={index} className="student">
                  <div className='cedula_s'>{student.estudiante_id}</div>
                  <div className='name_s'>{student.nombre}</div>
                  <div className='seccion_s'>{student.seccion}</div> 
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default StockComponent
