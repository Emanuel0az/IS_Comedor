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
  const [currentView, setCurrentView] = useState('both'); // Default view

  useEffect(() => {
    fetchStudents();
    // Check cookies on component mount
    checkViewCookies();
  }, []);

  // Function to check cookies and set view
  const checkViewCookies = () => {
    const addCookie = Cookies.get('add_student');
    const seeCookie = Cookies.get('see_student');

    if (addCookie && !seeCookie) {
      setCurrentView('add');
    } else if (!addCookie && seeCookie) {
      setCurrentView('list');
    } else {
      setCurrentView('both');
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

  const showBoth = () => {
    Cookies.remove('add_student');
    Cookies.remove('see_student');
    setCurrentView('both');
  };

  // Rest of the fetch, add, update, and delete functions remain the same
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Sistema de Manejo de Estudiantes</h2>
        <div className="title">
          <button 
            className={""}
            onClick={ver_añadir}
          >
            Añadir Estudiante
          </button>
          <button 
            className={""}
            onClick={ver_students}
          >
            Ver Lista
          </button>
          <button 
            className={""}
            onClick={showBoth}
          >
            Ver Ambos
          </button>
        </div>
      </div>

      {/* Add Student Form */}
      {(currentView === 'add' || currentView === 'both') && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Add student form content remains the same */}
          <h3 className="text-xl font-semibold mb-4">Añadir Nuevo Estudiante</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              className="p-2 border rounded"
              placeholder="Nombre"
              value={newStudent.nombre}
              onChange={(e) => setNewStudent({ ...newStudent, nombre: e.target.value })}
            />
            {/* Rest of the form inputs remain the same */}
            <input
              type="text"
              className="p-2 border rounded"
              placeholder="Apellidos"
              value={newStudent.apellidos}
              onChange={(e) => setNewStudent({ ...newStudent, apellidos: e.target.value })}
            />
            <input
              type="text"
              className="p-2 border rounded"
              placeholder="Numero de Cedula"
              value={newStudent.cedula}
              onChange={(e) => setNewStudent({ ...newStudent, cedula: e.target.value })}
            />
            <input
              type="text"
              className="p-2 border rounded"
              placeholder="Seccion"
              value={newStudent.seccion}
              onChange={(e) => setNewStudent({ ...newStudent, seccion: e.target.value })}
            />
            <input
              type="date"
              className="p-2 border rounded"
              placeholder="Fecha de Nacimiento"
              value={newStudent.fecha_nacimiento}
              onChange={(e) => setNewStudent({ ...newStudent, fecha_nacimiento: e.target.value })}
            />
            <input
              type="text"
              className="p-2 border rounded"
              placeholder="Edad"
              value={newStudent.edad}
              onChange={(e) => setNewStudent({ ...newStudent, edad: e.target.value })}
            />
            <input
              type="tel"
              className="p-2 border rounded"
              placeholder="Numero de Telefono"
              value={newStudent.telefono}
              onChange={(e) => setNewStudent({ ...newStudent, telefono: e.target.value })}
            />
            <select
              className="p-2 border rounded"
              value={newStudent.rol}
              onChange={(e) => setNewStudent({ ...newStudent, rol: e.target.value })}
            >
              <option value="Estudiantes">Estudiante</option>
              <option value="Profesor">Profesor</option>
            </select>
            <select
              className="p-2 border rounded"
              value={newStudent.becado}
              onChange={(e) => setNewStudent({ ...newStudent, becado: e.target.value === 'true' })}
            >
              <option value="false">No Becado</option>
              <option value="true">Becado</option>
            </select>
            <button
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              onClick={addStudent}
            >
              Añadir Estudiante
            </button>
          </div>
        </div>
      )}

      {/* Student List */}
      {(currentView === 'list' || currentView === 'both') && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Lista de Estudiantes</h2>
          <div className="list_content">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Cedula</th>
                  <th className="p-2 text-left">Nombre</th>
                  <th className="p-2 text-left">Seccion</th>
                  <th className="p-2 text-left">Telefono</th>
                  <th className="p-2 text-left">Rol</th>
                  <th className="p-2 text-left">Becado</th>
                  <th className="p-2 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b">
                    {editingStudent?.id === student.id ? (
                      <>
                        <td colSpan="7" className="p-2">
                          <div className="grid grid-cols-2 gap-4">
                            <input
                              type="text"
                              className="p-2 border rounded"
                              value={editingStudent.cedula}
                              onChange={(e) => setEditingStudent({ ...editingStudent, cedula: e.target.value })}
                            />
                            <input
                              type="text"
                              className="p-2 border rounded"
                              value={editingStudent.apellidos}
                              onChange={(e) => setEditingStudent({ ...editingStudent, apellidos: e.target.value })}
                            />
                            <input
                              type="text"
                              className="p-2 border rounded"
                              value={editingStudent.nombre}
                              onChange={(e) => setEditingStudent({ ...editingStudent, nombre: e.target.value })}
                            />
                            <input
                              type="text"
                              className="p-2 border rounded"
                              value={editingStudent.seccion}
                              onChange={(e) => setEditingStudent({ ...editingStudent, seccion: e.target.value })}
                            />
                            <select
                              className="p-2 border rounded"
                              value={editingStudent.rol}
                              onChange={(e) => setEditingStudent({ ...editingStudent, rol: e.target.value })}
                            >
                              <option value="Estudiantes">Estudiante</option>
                              <option value="Profesor">Profesor</option>
                            </select>
                            <select
                              className="p-2 border rounded"
                              value={editingStudent.becado.toString()}
                              onChange={(e) => setEditingStudent({ 
                                ...editingStudent, 
                                becado: e.target.value === 'true'
                              })}
                            >
                              <option value="false">No Becado</option>
                              <option value="true">Becado</option>
                            </select>
                            <div className="flex gap-2">
                              <button
                                className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                                onClick={() => updateStudent(editingStudent)}
                              >
                                Guardar
                              </button>
                              <button
                                className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                                onClick={() => setEditingStudent(null)}
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-2">{student.cedula}</td>
                        <td className="p-2">{`${student.nombre} ${student.apellidos}`}</td>
                        <td className="p-2">{student.seccion}</td>
                        <td className="p-2">{student.telefono}</td>
                        <td className="p-2">{student.rol === 'Estudiantes' ? 'Estudiante' : 'Profesor'}</td>
                        <td className="p-2">
                          <span className={`px-2 py-1 rounded`}>
                            {student.becado ? '🟢' : '🔴'}
                          </span> 
                        </td>
                        <td className="p-2">
                          <div className="flex gap-2">
                            <button
                              className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                              onClick={() => setEditingStudent({...student, becado: Boolean(student.becado)})}
                            >
                              Editar
                            </button>
                            <button
                              className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
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