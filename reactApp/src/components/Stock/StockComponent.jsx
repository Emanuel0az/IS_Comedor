import React, { useState, useEffect, useRef } from 'react';
import { getStudents } from '../../server/S_Stock/S_Stock';
import 'react-datepicker/dist/react-datepicker.css';
import '../Stock/StockComponent.css';
import NoMealsIcon from '@mui/icons-material/NoMeals';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { postAsistencia } from '../../server/Asistencia/PostAsistencia';

export default function StockComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroBeca, setFiltroBeca] = useState('');
  const searchInputRef = useRef(null);
  const [students, setStudents] = useState([]);
  const [almorzados, setAlmorzados] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date(localStorage.getItem('selectedDate') || new Date()).toISOString().split('T')[0]);

  useEffect(() => {
    extractData();

    // Add event listener for storage changes
    const handleStorageChange = (e) => {
      if (e.key === localStorage.getItem('selectedDate')) { // Corregido aquí
        setSelectedDate(new Date(e.newValue).toISOString().split('T')[0]);
        extractData(); // Llama a extractData al cambiar la fecha
        verificarAlmuerzos(students)
        console.log('Fecha actualizada desde localStorage');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [students]);

  useEffect(() => {
    if (students.length > 0) {
      verificarAlmuerzos(students); // Verifica almuerzos al cambiar students
    }
  }, [students]);

  const traerAlmorzados = (student) => {
    return student.pagos.some(pago => 
      pago.fecha_pago_prueba === selectedDate
    );
  };

  const verificarAlmuerzos = (studentsData) => {
    let almuerzoStatus = {};
    studentsData.forEach(student => {
      almuerzoStatus[student.estudiante_id] = traerAlmorzados(student);
    });
    setAlmorzados(almuerzoStatus);
  };

  const envAsistencia = async (student, estudiante_id_id) => {
    let monto;
    if (student.rol === 'prof') {
      monto = 1000;
    } else if (student.becado) {
      monto = 0;
    } else {
      monto = 600;
    }
    const fecha = new Date(localStorage.getItem('selectedDate'));
    const newRegistro = {
      estudiante_id: estudiante_id_id,
      fecha_pago_prueba: fecha.toLocaleDateString('en-CA'),
      monto: monto
    };
    await postAsistencia(newRegistro);
    extractData(); // Recarga los datos después de registrar la asistencia
  };

  const extractData = async () => {
    const newSelectedDate = new Date(localStorage.getItem('selectedDate') || new Date()).toISOString().split('T')[0];
    setSelectedDate(newSelectedDate);
    const studentsData = await getStudents();
    setStudents(studentsData);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangeBecaFilter = (event) => {
    setFiltroBeca(event.target.value);
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.seccion.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filtroBeca === 'estu' ? !student.rol.includes('prof') :
      filtroBeca === 'prof' ? student.rol.includes('prof') : true;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="containerAll">
      <div className="containerFormStock">
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar por nombre o sección..."
            value={searchTerm}
            onChange={handleSearch}
            className="search_input"
            ref={searchInputRef}
          />
          <div>
            <select className='selectBeca' value={filtroBeca} onChange={handleChangeBecaFilter}>
              <option value="">Todos</option>
              <option value="estu">Estudiantes</option>
              <option value="prof">Profesores</option>
            </select>
          </div>
        </div>
      </div>
      <div className="containerStock">
        <div className="tittles">
          <div>ID</div>
          <div>Nombre</div>
          <div>Sección</div>
          <div>Rol</div>
          <div>Almuerzo</div>
          <div>Acción</div>
        </div>
        <div className="students">
          {filteredStudents.map((student) => (
            <div key={student.estudiante_id} className="student">
              <div>{student.estudiante_id}</div>
              <div>
                <div className='name_s'>{student.nombre}</div>
                <div className='cedula_s'>{student.estudiante_id}</div>
              </div>
              <div className='seccion_s'>{student.seccion}</div>
              <div>{student.rol}</div>
              <div onClick={() => envAsistencia(student, student.estudiante_id)} className='almuerzoIcon'>
                {almorzados[student.estudiante_id] ? 
                  <LocalDiningIcon style={{ color: '#3b82f6', fontSize: 25 }} /> : 
                  <NoMealsIcon style={{ color: 'grey', fontSize: 25 }} />
                }
              </div>
              <div>
                <MoreVertIcon style={{ color: 'gray' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
