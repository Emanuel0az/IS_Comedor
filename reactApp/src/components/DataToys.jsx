import React, { useEffect, useState } from 'react'
import { getDataToys, postToys, updateToys, deleteToys } from '../server/Toys/Toys'

const DataToys = () => {
    const [toys, setToys] = useState([]);
    const [nameToy, setNameToy] = useState('')
    const [priceToy, setPriceToy] = useState('')

    useEffect(() => {
        mostrarToys()
    }, []);

    const mostrarToys = async () => {
        const data = await getDataToys()
        setToys(data)
    }

    const envToys = async () => {
        postToys({ name: nameToy, price: priceToy })

    }


    const elimToys = async (id) => {
        deleteToys(id)
    }
    
    const editToys = async (id) => {
        updateToys(id, { name: nameToy, price: priceToy })
    }

    const verId = async (id) => {
        console.log(id);
    }




  return (
    <>
    <hr color='white'/>
    <hr color='white'/>
    <hr color='white'/>
    <h1>Toys List</h1>   
      <div id='containerUserCards'>
        {toys.map((toy) => ( //Este es para apis con un objeto dentro de un array.
            <div id='userCard' key={toy.id}>
            <div>id: {toy.id}</div>
            <div>name: {toy.name}</div>
            <div>price: ${toy.price}</div>
            <button onClick={() => verId(toy.id)}>Ver</button>
            <button onClick={() => elimToys(toy.id)}>Eliminar</button>
            <button onClick={() => editToys(toy.id)}>Editar</button>
          </div>
        ))}
      </div>
    <hr color='white'/>
    <div>
        <input type="text" value={nameToy} onChange={(e) => setNameToy(e.target.value)} placeholder="NAME" />
        <input type="text" value={priceToy} onChange={(e) => setPriceToy(e.target.value)} placeholder="PRICE" />
        <button onClick={() => envToys()}>Enviar</button>
    </div>
    </>
  )
}

export default DataToys