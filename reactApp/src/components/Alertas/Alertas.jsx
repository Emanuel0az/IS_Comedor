import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function Alertas() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [alertas, setAlertas] = useState([]);
  const [semanaActual, setSemanaActual] = useState({ inicio: null, fin: null });
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const [responseAsistencias, responseEstudiantes] = await Promise.all([
          axios.get('http://localhost:8000/api/asistencias/'),
          axios.get('http://localhost:8000/api/estudiantes/')
        ]);

        const asistencias = responseAsistencias.data;
        const estudiantesData = responseEstudiantes.data;

        const estudiantesMap = new Map(
          estudiantesData.map(estudiante => [
            estudiante.estudiante_id,
            { ...estudiante, asistencias: [] }
          ])
        );

        asistencias.forEach(asistencia => {
          const estudiante = estudiantesMap.get(asistencia.estudiante_id_id);
          if (estudiante) {
            estudiante.asistencias.push(new Date(asistencia.fecha_asistencia));
          }
        });

        const estudiantesProcesados = Array.from(estudiantesMap.values());
        setEstudiantes(estudiantesProcesados);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    obtenerDatos();
  }, []);

  useEffect(() => {
    const hoy = new Date('2024-10-02');
    const inicioSemana = new Date(hoy);
    inicioSemana.setDate(hoy.getDate() - hoy.getDay() + 1); // Ajusta al lunes
    inicioSemana.setHours(0, 0, 0, 0);
    const finSemana = new Date(inicioSemana);
    finSemana.setDate(finSemana.getDate() + 4); // Ajusta al viernes
    finSemana.setHours(23, 59, 59, 999);

    setSemanaActual({ inicio: inicioSemana, fin: finSemana });

    const nuevasAlertas = estudiantes.filter(estudiante => {
      const asistenciasSemana = estudiante.asistencias.filter(fecha =>
        fecha >= inicioSemana && fecha <= finSemana
      );
      return asistenciasSemana.length < 3;
    });

    setAlertas(nuevasAlertas);
  }, [estudiantes]);

  const toggleModal = () => setModalOpen(!modalOpen);

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
          <p className="text-red-600 font-bold mb-4">
            ⚠️ Hay estudiantes que han faltado más de 3 días.
          </p>
          <button
            onClick={toggleModal}
            className="px-3 py-1 bg-transparent text-blue-600 border border-blue-600 rounded hover:bg-blue-50 focus:outline-none"
          >
            Mostrar
          </button>
          {modalOpen && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[80vh] overflow-y-auto">
                <h3 className="text-xl font-semibold mb-4">Estudiantes con Alertas de Asistencia</h3>
                <ul className="space-y-3">
                  {alertas.map(estudiante => (
                    <li key={estudiante.estudiante_id} className="bg-red-50 p-3 rounded-lg border border-red-200">
                      <span className="font-semibold">{estudiante.nombre}</span> ha faltado más de 3 días esta semana.
                    </li>
                  ))}
                </ul>
                <button
                  onClick={toggleModal}
                  className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 border border-gray-300 rounded hover:bg-gray-300 focus:outline-none"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-green-600 font-bold">No hay alertas de asistencia esta semana.</p>
      )}
    </div>
  );
}
