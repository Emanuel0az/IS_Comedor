const url = ('http://localhost:8000/api/students/')

const getStudents = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


// //////////////////////////////////////////////////////////////////////////////




const postStudents = async (newStudent) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // Asegúrate de este encabezado
      },
      body: JSON.stringify({ cedula: newStudent.cedula, name: newStudent.name, seccion: newStudent.seccion })

    });
    if (!response.ok) {
      throw new Error('Error en la solicitud POST');
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('ERROR POST:', error);
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

export { getStudents, postStudents, updateStudents, deleteStudents }
