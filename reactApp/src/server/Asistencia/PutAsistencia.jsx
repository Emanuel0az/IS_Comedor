const url = 'http://localhost:8000/api/hist_pagos/'

const putAsistencia = async (id, updatedToy) => {
  try {
    const response = await fetch(url + id + '/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      
      body: JSON.stringify(updatedToy),  // Enviar los datos actualizados
      
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud PUT');
    }

    const data = await response.json();
    console.log(data);  // Datos actualizados
  } catch (error) {
    console.error('ERROR PUT:', error);
  }
  console.log('Cuerpo de la solicitud:', JSON.stringify(updatedToy))
};


export default putAsistencia;

// Ejemplo de uso
// updateToy(1, { name: 'New Toy Name', description: 'Updated description' });