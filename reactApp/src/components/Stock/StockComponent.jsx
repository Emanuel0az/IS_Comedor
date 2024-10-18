import React, { useState, useEffect, useRef } from 'react';
import { getStudents } from '../../server/S_Stock/S_Stock';
import 'react-datepicker/dist/react-datepicker.css';
import '../Stock/StockComponent.css';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import NoMealsIcon from '@mui/icons-material/NoMeals';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalDiningIcon from '@mui/icons-material/LocalDining';

const StockComponent = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroBeca, setFiltroBeca] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    extractData();
  }, []);

  const extractData = async () => {
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
          <div className='filtroBeca'>
            <div className='BecaItem'>Todos</div>
            <ExpandMoreIcon className='BecaItem' />
          </div>
        </div>
      </div>
      <div className="containerStock">
        <div className="tittles">
          <div>ID</div>
          <div>Nombre</div>
          <div>Sección</div>
          <div>Becado</div>
          <div>Rol</div>
          <div>Almuerzo</div>
          <div></div>
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
              {student.becado ? <div className='becado_yes'>Sí</div> : <div className='becado_no'>No</div>}
              <div>{student.rol}</div>
              <div>{student.almuerzo ? <LocalDiningIcon style={{ color: '#3b82f6', fontSize: 25 }} /> : <NoMealsIcon style={{ color: 'grey' }} />}</div>
              <div></div>
              <div><MoreVertIcon style={{ color: 'gray' }} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockComponent;


