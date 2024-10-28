import React, { useEffect, useState } from 'react';
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
    becado: false  // Cambiado a boolean
  });
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/estudiantes/');
      const data = await response.json();
      // Convertir becado a boolean al recibir los datos
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
      // Convertir becado a número antes de enviar
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
      // Convertir becado a número antes de enviar
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
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Student Management System</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">
          {editingStudent ? 'Edit Student' : 'Add New Student'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            className="p-2 border rounded"
            placeholder="First Name"
            value={newStudent.nombre}
            onChange={(e) => setNewStudent({ ...newStudent, nombre: e.target.value })}
          />
          <input
            type="text"
            className="p-2 border rounded"
            placeholder="Last Name"
            value={newStudent.apellidos}
            onChange={(e) => setNewStudent({ ...newStudent, apellidos: e.target.value })}
          />
          <input
            type="text"
            className="p-2 border rounded"
            placeholder="ID Number"
            value={newStudent.cedula}
            onChange={(e) => setNewStudent({ ...newStudent, cedula: e.target.value })}
          />
          <input
            type="text"
            className="p-2 border rounded"
            placeholder="Section"
            value={newStudent.seccion}
            onChange={(e) => setNewStudent({ ...newStudent, seccion: e.target.value })}
          />
          <input
            type="date"
            className="p-2 border rounded"
            placeholder="Birth Date"
            value={newStudent.fecha_nacimiento}
            onChange={(e) => setNewStudent({ ...newStudent, fecha_nacimiento: e.target.value })}
          />
          <input
            type="text"
            className="p-2 border rounded"
            placeholder="Age"
            value={newStudent.edad}
            onChange={(e) => setNewStudent({ ...newStudent, edad: e.target.value })}
          />
          <input
            type="tel"
            className="p-2 border rounded"
            placeholder="Phone Number"
            value={newStudent.telefono}
            onChange={(e) => setNewStudent({ ...newStudent, telefono: e.target.value })}
          />
          <select
            className="p-2 border rounded"
            value={newStudent.rol}
            onChange={(e) => setNewStudent({ ...newStudent, rol: e.target.value })}
          >
            <option value="Estudiantes">Student</option>
            <option value="Profesor">Professor</option>
          </select>
          <select
            className="p-2 border rounded"
            value={newStudent.becado}
            onChange={(e) => setNewStudent({ ...newStudent, becado: e.target.value === 'true' })}
          >
            <option value="false">No Scholarship</option>
            <option value="true">With Scholarship</option>
          </select>
          <button
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            onClick={addStudent}
          >
            Add Student
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Student List</h2>
        <div className="overflow-x-auto">
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
                            <option value="false">Becado</option>
                            <option value="true">No Becado</option>
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
                            Delete
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
    </div>
  );
};

export default StudentManagement;