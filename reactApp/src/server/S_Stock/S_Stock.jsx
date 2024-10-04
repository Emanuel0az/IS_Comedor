import axios from 'axios';

export const getStudents = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/estudiantes/');
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    return [];
  }
};

export const getAttendance = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/asistencias/');
    return response.data;
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return [];
  }
};

export const postStudents = async (studentData) => {
  try {
    const response = await axios.post('http://localhost:8000/api/estudiantes/', studentData);
    return response.data;
  } catch (error) {
    console.error('Error posting student:', error);
    throw error;
  }
};


////////////////////////////////////////////////////////////////////////////



const updateStudents = async (id, updatedStudent) => {
  try {
    const response = await fetch(url + id + '/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedStudent),  // Enviar los datos actualizados
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud PUT');
    }

    const data = await response.json();
    console.log(data);  // Datos actualizados
  } catch (error) {
    console.error('ERROR PUT:', error);
  }
};

// Ejemplo de uso
// updateToy(1, { name: 'New Toy Name', description: 'Updated description' });



////////////////////////////////////////////////////////////////////////////



const deleteStudents = async (id) => {
  try {
    const response = await fetch(url + id + '/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Error en la solicitud DELETE');
    }
    console.log('Student deleted successfully');
  } catch (error) {
    console.error('ERROR DELETE:', error);
  }
};

// Ejemplo de uso
// deleteToy(1);  // Elimina el juguete con ID 1

export { updateStudents, deleteStudents }
