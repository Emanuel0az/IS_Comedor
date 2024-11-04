import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './StudentManagement.css';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    cedula: '',
    apellidos: '',
    nombre: '',
    seccion: '',
    fecha_nacimiento: '',
    edad: '',
    telefono: '',
    rol: 'Estudiantes',
    becado: false
  });
  const [editingStudent, setEditingStudent] = useState(null);
  const [currentView, setCurrentView] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');

  const token3 = Cookies.get('token2');

  useEffect(() => {
    fetchStudents();
    checkViewCookies();
  }, []);

  const checkViewCookies = () => {
    const addCookie = Cookies.get('add_student');
    const seeCookie = Cookies.get('see_student');
    if (addCookie) {
      setCurrentView('add');
    } else if (seeCookie) {
      setCurrentView('list');
    } else {
      setCurrentView('add');
    }
  };

  const ver_añadir = () => {
    Cookies.set('add_student', 'true');
    Cookies.remove('see_student');
    setCurrentView('add');
  };

  const ver_students = () => {
    Cookies.set('see_student', 'true');
    Cookies.remove('add_student');
    setCurrentView('list');
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/estudiantes/');
      const data = await response.json();
      const formattedData = data.map(student => ({
        ...student,
        becado: Boolean(student.becado)
      }));
      setStudents(formattedData);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const addStudent = async () => {
    try {
      const studentToAdd = {
        ...newStudent,
        becado: Number(newStudent.becado)
      };
      await fetch('http://localhost:8000/api/estudiantes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentToAdd),
      });
      setNewStudent({
        cedula: '',
        apellidos: '',
        nombre: '',
        seccion: '',
        fecha_nacimiento: '',
        edad: '',
        telefono: '',
        rol: 'Estudiantes',
        becado: false
      });
      fetchStudents();
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const updateStudent = async (student) => {
    try {
      const studentToUpdate = {
        ...student,
        becado: Number(student.becado)
      };
      await fetch(`http://localhost:8000/api/estudiantes/${student.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentToUpdate),
      });
      setEditingStudent(null);
      fetchStudents();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await fetch(`http://localhost:8000/api/estudiantes/${id}/`, {
        method: 'DELETE',
      });
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const filteredStudents = students.filter((student) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      student.nombre &&
      student.nombre.length > 0 &&
      ((student.nombre && student.nombre.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (student.cedula && student.cedula.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (student.seccion && student.seccion.toLowerCase().includes(lowerCaseSearchTerm)))
    );
  });

  return (
    <div className="student-management">
      <div className="header">
        <h1 className="title">Sistema de Manejo de Estudiantes</h1>
        <div className="nav-buttons">
          <button
            className={`nav-button ${currentView === 'add' ? 'active' : ''}`}
            onClick={ver_añadir}
          >
            Añadir Estudiante
          </button>
          <button
            className={`nav-button ${currentView === 'list' ? 'active' : ''}`}
            onClick={ver_students}
          >
            Ver Lista
          </button>
        </div>
      </div>
      {currentView === 'add' && (
        <div className="add-student-form">
          {/* Código del formulario de agregar estudiante */}
        </div>
      )}
      {currentView === 'list' && (
        <div className="student-list">
          <hr />
          <div className="search-container">
            <h2 className="list-title">Lista de Estudiantes</h2>
            <input
              type="text"
              className="search-input"
              placeholder="Buscar Estudiantes ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <hr />
          <div className="table-container">
            <table className="student-table">
              <thead>
                <tr>
                  <th>Cedula</th>
                  <th>Nombre</th>
                  <th>Seccion</th>
                  <th>Telefono</th>
                  <th>Rol</th>
                  <th>Becado</th>
                  {token3 && <th>Acciones</th>}
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.cedula}</td>
                    <td>{student.nombre}</td>
                    <td>{student.seccion}</td>
                    <td>{student.telefono}</td>
                    <td>{student.rol === 'Estudiantes' ? 'Estudiante' : 'Profesor'}</td>
                    <td>
                      <span className={`status-badge ${student.becado ? 'becado' : 'no-becado'}`}>
                        {student.becado ? 'Si' : 'No'}
                      </span>
                    </td>
                    {token3 && (
                      <td>
                        <div className="action-buttons">
                          <button
                            className="edit-button"
                            onClick={() => setEditingStudent(student)}
                          >
                            Editar
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => deleteStudent(student.id)}
                          >
                            Borrar
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;