'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, isWeekend } from 'date-fns'
import { es } from 'date-fns/locale'
import '../Alertas/Alerta.css'


export default function AttendanceAlert() {
  const [estudiantes, setEstudiantes] = useState([])
  const [alertas, setAlertas] = useState([])
  const [semanaActual, setSemanaActual] = useState({ inicio: null, fin: null })
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const [responseAsistencias, responseEstudiantes] = await Promise.all([
          axios.get('http://localhost:8000/api/asistencias/'),
          axios.get('http://localhost:8000/api/estudiantes/')
        ])

        const asistencias = responseAsistencias.data
        const estudiantesData = responseEstudiantes.data

        const estudiantesMap = new Map(
          estudiantesData.map(estudiante => [
            estudiante.estudiante_id,
            { ...estudiante, asistencias: [] }
          ])
        )

        asistencias.forEach(asistencia => {
          const estudiante = estudiantesMap.get(asistencia.estudiante_id_id)
          if (estudiante) {
            estudiante.asistencias.push(new Date(asistencia.fecha_asistencia))
          }
        })

        const estudiantesProcesados = Array.from(estudiantesMap.values())
        setEstudiantes(estudiantesProcesados)
      } catch (error) {
        console.error('Error al obtener los datos:', error)
      }
    }

    obtenerDatos()
  }, [])

  useEffect(() => {
    const hoy = new Date('2024-10-02')
    const inicioSemana = startOfWeek(hoy, { weekStartsOn: 1 })
    const finSemana = endOfWeek(hoy, { weekStartsOn: 1 })

    setSemanaActual({ inicio: inicioSemana, fin: finSemana })

    const nuevasAlertas = estudiantes.filter(estudiante => {
      const asistenciasSemana = estudiante.asistencias.filter(fecha =>
        fecha >= inicioSemana && fecha <= finSemana && !isWeekend(fecha)
      )
      const diasEscolares = eachDayOfInterval({ start: inicioSemana, end: finSemana }).filter(date => !isWeekend(date))
      return asistenciasSemana.length < diasEscolares.length - 2 // Alerta si falta más de 2 días escolares
    })

    setAlertas(nuevasAlertas)
  }, [estudiantes])

  const toggleModal = () => setIsModalOpen(!isModalOpen)

  const weekDates = semanaActual.inicio
    ? eachDayOfInterval({ start: semanaActual.inicio, end: semanaActual.fin }).filter(date => !isWeekend(date))
    : []

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Alertas de Asistencia</h2>
      {semanaActual.inicio && semanaActual.fin && (
        <p className="mb-4">
          Semana del {format(semanaActual.inicio, "d 'de' MMMM", { locale: es })} al{' '}
          {format(semanaActual.fin, "d 'de' MMMM", { locale: es })}
        </p>
      )}
      {alertas.length > 0 ? (
        <div>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">⚠️ Alerta! </strong>
            <span className="block sm:inline">Hay estudiantes que han faltado más de 4 días.</span>
          </div>
          <button
            onClick={toggleModal}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Ver Alertas de Asistencia
          </button>
        </div>
      ) : (
        <p className="text-green-600 font-bold">No hay alertas de asistencia esta semana.</p>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center" onClick={toggleModal}>
          <div 
            className="relative bg-white rounded-lg shadow-xl p-5 m-4"
            style={{ maxWidth: '700px', maxHeight: '550px', width: '100%', height: '100%' }}
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-2">Asistencias de la Semana</h3>
            <div className="overflow-hidden">
              <div className="overflow-x-auto">
                <div className="overflow-y-auto" style={{ maxHeight: 'calc(550px - 8rem)' }}>
                  <table className="min-w-full bg-white border-collapse">
                    <thead className="bg-gray-800 text-white">
                      <tr>
                        <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm sticky top-0 left-0 z-20 bg-gray-800">Nombre</th>
                        {weekDates.map((date, index) => (
                          <th key={index} className="w-1/6 text-left py-3 px-4 uppercase font-semibold text-sm sticky top-0 z-10 bg-gray-800">
                            {format(date, 'dd/MM/yyyy')}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      {alertas.map((estudiante, index) => (
                        <tr key={estudiante.estudiante_id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="w-1/4 text-left py-4 px-4 font-semibold sticky left-0 z-10" style={{ background: index % 2 === 0 ? '#F9FAFB' : '#FFFFFF' }}>
                            {estudiante.nombre}
                          </td>
                          {weekDates.map((date, dateIndex) => {
                            const asistio = estudiante.asistencias.some(
                              (asistencia) => isSameDay(asistencia, date)
                            )
                            return (
                              <td
                                key={dateIndex}
                                className={`w-1/6 text-left py-4 px-4 text-center ${
                                  asistio ? 'bg-green-200' : 'bg-red-200'
                                }`}
                              >
                                {asistio ? 'Asistió' : <span className="text-red-600">Faltó</span>}
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={toggleModal}
                className="w-full px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}