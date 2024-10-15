import React, { useEffect, useState } from 'react';
import './Ingredientes.css';

export default function Component() {
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState({ nombre: '', cantidad: null, fecha_vencimiento: '' });
  const [editingIngredient, setEditingIngredient] = useState(null);

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/ingredientes/');
      const data = await response.json();
      setIngredients(data);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };

  const addIngredient = async () => {
    if (newIngredient.nombre && newIngredient.cantidad && newIngredient.fecha_vencimiento) {
      await fetch('http://localhost:8000/api/ingredientes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newIngredient),
      });
      setNewIngredient({ nombre: '', cantidad: null, fecha_vencimiento: '' });
      fetchIngredients();
    }
  };

  const updateIngredient = async (ingrediente) => {
    await fetch(`http://localhost:8000/api/ingredientes/${ingrediente.ingredientes_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ingrediente),
    });
    setEditingIngredient(null);
    fetchIngredients();
  };

  const deleteIngredient = async (id) => {
    await fetch(`http://localhost:8000/api/ingredientes/${id}/`, {
      method: 'DELETE',
    });
    fetchIngredients();
  };

  return (
    <div className="container">
      <h1 className="title">Inventory Management</h1>
      
       <form action="" className='form'>
        <h3 className="title">{editingIngredient ? 'Edit Ingredient' : 'Add New Ingredient'}</h3>
        <input
          type="text"
          className="input"
          placeholder="Nombre del Ingrediente"
          value={newIngredient.nombre}
          onChange={(e) => setNewIngredient({ ...newIngredient, nombre: e.target.value })}
          autoFocus
          required
        />
        <input
          type="number"
          className="input"
          placeholder="Cantidad"
          value={newIngredient.cantidad || null}
          onChange={(e) => setNewIngredient({ ...newIngredient, cantidad: parseFloat(e.target.value) || '' })}
          required
        />
        <input
          type="date"
          className="input"
          placeholder="Expiration Date"
          value={newIngredient.fecha_vencimiento}
          onChange={(e) => setNewIngredient({ ...newIngredient, fecha_vencimiento: e.target.value })}
          required
        />
        <button className="button button-primary" onClick={addIngredient}>Add Ingredient</button>
        </form>

      <h2 className="title">Ingredient List</h2>
      <ul className="list">
        {ingredients.map((ingredient) => (
          <li key={ingredient.ingredientes_id} className="list-item">
            {editingIngredient?.ingredientes_id === ingredient.ingredientes_id ? (
              <>
                <input
                  type="text"
                  className="input"
                  value={editingIngredient.nombre}
                  onChange={(e) => setEditingIngredient({ ...editingIngredient, nombre: e.target.value })}
                />
                <input
                  type="number"
                  className="input"
                  value={editingIngredient.cantidad || ''}
                  onChange={(e) => setEditingIngredient({ ...editingIngredient, cantidad: parseFloat(e.target.value) || '' })}
                />
                <input
                  type="date"
                  className="input"
                  value={editingIngredient.fecha_vencimiento}
                  onChange={(e) => setEditingIngredient({ ...editingIngredient, fecha_vencimiento: e.target.value })}
                />
                <div className="button-group">
                  <button className="button button-primary" onClick={() => updateIngredient(editingIngredient)}>Update</button>
                  <button className="button button-secondary" onClick={() => setEditingIngredient(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <span className="item-info">{ingredient.nombre} - {ingredient.cantidad} - {ingredient.fecha_vencimiento}</span>
                <div className="button-group">
                  <button className="button button-secondary" onClick={() => setEditingIngredient(ingredient)}>Edit</button>
                  <button className="button button-danger" onClick={() => deleteIngredient(ingredient.ingredientes_id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
