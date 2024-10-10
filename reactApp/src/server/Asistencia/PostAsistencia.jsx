const products_API = 'http://localhost:8000/api/hist_pagos/';

const postAsistencia = async (newRegistro) => {
    try {
        console.log('Enviando datos:', JSON.stringify(newRegistro)); // Para depurar
        
        const response = await fetch(products_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRegistro) // Usar newRegistro directamente
        });

        if (!response.ok) {
            const errorText = await response.text(); // Captura el texto de error
            throw new Error(`Error en la solicitud POST: ${errorText || 'sin mensaje'}`);
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('ERROR POST:', error);
    }
};

export { postAsistencia };
