'use client'

import React, { useState, useEffect, useRef } from 'react'
import { getStudents } from '../../server/S_Stock/S_Stock'
import { parseISO, isSameWeek } from 'date-fns'
import { postAsistencia } from '../../server/Asistencia/PostAsistencia'


// Styles
import '../Stock/StockComponent.css'
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import AdbIcon from '@mui/icons-material/Adb';

const StockComponent = () => {
  const [students, setStudents] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const searchInputRef = useRef(null) // Crear la referencia

  useEffect(() => {
    extractData()
  }, [])

  const envAsistencia = async (student, estudiante_id_id, fecha_pago_prueba) => {
    let monto;

    if (student.rol === 'prof') {
        monto = 1000;
    } else if (student.becado) {
        monto = 0;
    } else {
        monto = 600;
    }

    const newRegistro = {
        estudiante_id: estudiante_id_id, // ID del estudiante
        fecha_pago_prueba: fecha_pago_prueba, // Puede ser null o una fecha válida
        monto: monto // Asegúrate de que sea un número
    };

    await postAsistencia(newRegistro); // Llama a la función con el objeto correcto
    console.log(student.becado ? 'becado' : 'NO becado', estudiante_id_id, monto, fecha_pago_prueba);
};


  const extractData = async () => {
    try {

      const studentsData = await getStudents()
      
      setStudents(studentsData)

    } catch (error) {
      console.error('Error al obtener los datos:', error)
    }
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredStudents = students.filter(student =>
    student.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.seccion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const focusSearchInput = () => {
    searchInputRef.current.focus(); // Forzar el foco en el input
  };

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
        <div>{new Date().toLocaleDateString()}</div>
      </div>
      <div className="containerStock">
        <div className="tittles">
          <div>Rol</div>
          <div>Identidad</div>
          <div>Sección</div>
          <div>Becado</div>
          <div>Asistencia</div>
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
                <div className='aprobarAsistencia' onClick={() => envAsistencia(student, student.estudiante_id, '2024-10-04')}>si o no</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default StockComponent

