const url = 'http://localhost:8000/api/users/';

const getDataUsers = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data // Hay que traer de una vez el nombre del array, PERROS!!!
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

//////////////////////////////////////////////////////////////////////////////

const postUsers = async (newUser) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // Asegúrate de este encabezado
      },
      body: JSON.stringify({ name: newUser.name, age: newUser.age, mail: newUser.mail, password: newUser.password }),
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



const updateUsers = async (id, updatedToy) => {
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
};

// Ejemplo de uso
// updateToy(1, { name: 'New Toy Name', description: 'Updated description' });




////////////////////////////////////////////////////////////////////////////



const deleteUsers = async (id) => {
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
    console.log('User deleted successfully');
  } catch (error) {
    console.error('ERROR DELETE:', error);
  }
};

// Ejemplo de uso
// deleteToy(1);  // Elimina el juguete con ID 1


export { getDataUsers, postUsers, updateUsers, deleteUsers }
