const AsistApi = 'http://localhost:8000/api/hist_pagos/';

const deleteAsist = async (id) => {
    const response = await fetch(`${AsistApi}${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  console.log(`Se elimino el id: ${id}`);
}

export { deleteAsist };
