'use client'

import React, { useState, useEffect, useRef } from 'react'
import { getStudents, getAttendance } from '../../server/S_Stock/S_Stock'
import { parseISO, isSameWeek } from 'date-fns'
import { updateStateStudents } from '../../server/S_Stock/S_Stock'


// Styles
import '../Stock/StockComponent.css'
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import AdbIcon from '@mui/icons-material/Adb';

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
      });

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
          ref={searchInputRef}  // Asocia la referencia al input.
        />
      </div>
      <div className="containerStock">
        <div className="tittles">
          <div>Rol</div>
          <div>Identidad</div>
          <div>Sección</div>
          <div>Becado</div>
        </div>
        <div className="students">
          {filteredStudents.map((student) => {
            return (
              <div key={student.estudiante_id} className="student">
                <div>{student.rol == 'prof' ? <AdbIcon className='profIcon' style={{ fontSize: 22 }} /> : <PersonIcon className='estuIcon' style={{ fontSize: 22 }} /> }</div>
                <div>
                  <div className='name_s'>{student.nombre}</div>
                  <div className='cedula_s'>{student.estudiante_id}</div> 
                </div>
                <div className='seccion_s'>{student.seccion}</div>
                <div className={`becado_${student.becado ? 'yes' : 'no'}`}>{student.becado ? <div>Sí</div> : <div>No</div>}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default StockComponent
