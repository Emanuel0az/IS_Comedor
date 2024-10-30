import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './Ingredientes.css';



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
      (student.nombre && student.nombre.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (student.cedula && student.cedula.toLowerCase().includes(lowerCaseSearchTerm)) ||
      (student.seccion && student.seccion.toLowerCase().includes(lowerCaseSearchTerm))
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
          <h2 className="form-title">Añadir Nuevo Estudiante</h2>
          <div className="form-grid">
            <input
              type="text"
              className="form-input"
              placeholder="Nombre"
              value={newStudent.nombre}
              onChange={(e) => setNewStudent({ ...newStudent, nombre: e.target.value })}
            />
            <input
              type="text"
              className="form-input"
              placeholder="Apellidos"
              value={newStudent.apellidos}
              onChange={(e) => setNewStudent({ ...newStudent, apellidos: e.target.value })}
            />
            <input
              type="text"
              className="form-input"
              placeholder="Numero de Cedula"
              value={newStudent.cedula}
              onChange={(e) => setNewStudent({ ...newStudent, cedula: e.target.value })}
            />
            <input
              type="text"
              className="form-input"
              placeholder="Seccion"
              value={newStudent.seccion}
              onChange={(e) => setNewStudent({ ...newStudent, seccion: e.target.value })}
            />
            <input
              type="date"
              className="form-input"
              placeholder="Fecha de Nacimiento"
              value={newStudent.fecha_nacimiento}
              onChange={(e) => setNewStudent({ ...newStudent, fecha_nacimiento: e.target.value })}
            />
            <input
              type="text"
              className="form-input"
              placeholder="Edad"
              value={newStudent.edad}
              onChange={(e) => setNewStudent({ ...newStudent, edad: e.target.value })}
            />
            <input
              type="tel"
              className="form-input"
              placeholder="Numero de Telefono"
              value={newStudent.telefono}
              onChange={(e) => setNewStudent({ ...newStudent, telefono: e.target.value })}
            />
            <select
              className="form-input"
              value={newStudent.rol}
              onChange={(e) => setNewStudent({ ...newStudent, rol: e.target.value })}
            >
              <option value="Estudiantes">Estudiante</option>
              <option value="Profesor">Profesor</option>
            </select>
            <select
              className="form-input"
              value={newStudent.becado}
              onChange={(e) => setNewStudent({ ...newStudent, becado: e.target.value === 'true' })}
            >
              <option value="false">No Becado</option>
              <option value="true">Becado</option>
            </select>
          </div>
          <button
            className="submit-button2"
            onClick={addStudent}
          >
            Añadir Estudiante
          </button>
        </div>
      )}

      {currentView === 'list' && (
        <div className="student-list">
          <hr />
          <div className="search-container">
            <h2 className="list-title">Lista de Estudiantes</h2>
            <div></div>
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
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    {editingStudent?.id === student.id ? (
                      <td colSpan="7" className="editing-row">
                        <div className="editing-grid">
                          <input
                            type="text"
                            className="edit-input"
                            value={editingStudent.cedula}
                            onChange={(e) => setEditingStudent({ ...editingStudent, cedula: e.target.value })}
                          />
                          <input
                            type="text"
                            className="edit-input"
                            value={editingStudent.apellidos}
                            onChange={(e) => setEditingStudent({ ...editingStudent, apellidos: e.target.value })}
                          />
                          <input
                            type="text"
                            className="edit-input"
                            value={editingStudent.nombre}
                            onChange={(e) => setEditingStudent({ ...editingStudent, nombre: e.target.value })}
                          />
                          <input
                            type="text"
                            className="edit-input"
                            value={editingStudent.seccion}
                            onChange={(e) => setEditingStudent({ ...editingStudent, seccion: e.target.value })}
                          />
                          <select
                            className="edit-input"
                            value={editingStudent.rol}
                            onChange={(e) => setEditingStudent({ ...editingStudent, rol: e.target.value })}
                          >
                            <option value="Estudiantes">Estudiante</option>
                            <option value="Profesor">Profesor</option>
                          </select>
                          <select
                            className="edit-input"
                            value={editingStudent.becado.toString()}
                            onChange={(e) => setEditingStudent({ 
                              ...editingStudent, 
                              becado: e.target.value === 'true'
                            })}
                          >
                            <option value="false">No Becado</option>
                            <option value="true">Becado</option>
                          </select>
                          <div className="edit-actions">
                            <button
                              className="save-button"
                              onClick={() => updateStudent(editingStudent)}
                            >
                              Guardar
                            </button>
                            <button
                              className="cancel-button"
                              onClick={() => setEditingStudent(null)}
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      </td>
                    ) : (
                      <>
                        <td>{student.cedula}</td>
                        <td>{student.nombre}</td>
                        <td>{student.seccion}</td>
                        <td>{student.telefono}</td>
                        <td>{student.rol === 'Estudiantes' ? 'Estudiante' : 'Profesor'}</td>
                        <td>
                          <span className={`status-badge ${student.becado ? 'becado' : 'no-becado'}`}>
                            {student.becado ? 'Si' : 'No '}
                          </span> 
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="edit-button"
                              onClick={() => setEditingStudent({...student, becado: Boolean(student.becado)})}
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
                      </>
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