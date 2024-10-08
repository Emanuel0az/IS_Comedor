import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Ingredientes.css'; // Asegúrate de que la ruta sea correcta

const IngredientComponent = () => {
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState({ nombre: '', cantidad: 0, fecha_vencimiento: '' });
  const [editingIngredient, setEditingIngredient] = useState(null);

  // Fetch ingredients
  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/ingredientes/');
      setIngredients(response.data);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };

  // Add Ingredient
  const addIngredient = async () => {
    if (newIngredient.nombre && newIngredient.cantidad && newIngredient.fecha_vencimiento) {
      await axios.post('http://localhost:8000/api/ingredientes/', newIngredient);
      setNewIngredient({ nombre: '', cantidad: 0, fecha_vencimiento: '' });
      fetchIngredients();
    }
  };

  // Update Ingredient
  const updateIngredient = async (ingrediente) => {
    await axios.put(`http://localhost:8000/api/ingredientes/${ingrediente.ingredientes_id}/`, ingrediente);
    setEditingIngredient(null);
    fetchIngredients();
  };

  // Delete Ingredient
  const deleteIngredient = async (id) => {
    await axios.delete(`http://localhost:8000/api/ingredientes/${id}/`);
    fetchIngredients();
  };

  return (
    <div className="ingredient-container">
      <h1 className="ingredient-title">Inventory Management</h1>
      
      {/* Form to add/edit ingredients */}
      <div className="ingredient-form">
        <h3>{editingIngredient ? 'Edit Ingredient' : 'Add New Ingredient'}</h3>
        <input
          type="text"
          className="ingredient-input"
          placeholder="Ingredient Name"
          value={newIngredient.nombre}
          onChange={(e) => setNewIngredient({ ...newIngredient, nombre: e.target.value })}
        />
        <input
          type="number"
          className="ingredient-input"
          placeholder="Quantity"
          value={newIngredient.cantidad}
          onChange={(e) => setNewIngredient({ ...newIngredient, cantidad: parseFloat(e.target.value) })}
        />
        <input
          type="date"
          className="ingredient-input"
          placeholder="Expiration Date"
          value={newIngredient.fecha_vencimiento}
          onChange={(e) => setNewIngredient({ ...newIngredient, fecha_vencimiento: e.target.value })}
        />
        <button className="add-button" onClick={addIngredient}>Add Ingredient</button>
      </div>

      {/* List of ingredients */}
      <h2 className="ingredient-list-title">Ingredient List</h2>
      <ul className="ingredient-list">
        {ingredients.map((ingredient) => (
          <li key={ingredient.ingredientes_id} className="ingredient-item">
            {editingIngredient?.ingredientes_id === ingredient.ingredientes_id ? (
              <>
                <input
                  type="text"
                  className="ingredient-input"
                  value={editingIngredient.nombre}
                  onChange={(e) => setEditingIngredient({ ...editingIngredient, nombre: e.target.value })}
                />
                <input
                  type="number"
                  className="ingredient-input"
                  value={editingIngredient.cantidad}
                  onChange={(e) => setEditingIngredient({ ...editingIngredient, cantidad: parseFloat(e.target.value) })}
                />
                <input
                  type="date"
                  className="ingredient-input"
                  value={editingIngredient.fecha_vencimiento}
                  onChange={(e) => setEditingIngredient({ ...editingIngredient, fecha_vencimiento: e.target.value })}
                />
                <button className="update-button" onClick={() => updateIngredient(editingIngredient)}>Update</button>
                <button className="cancel-button" onClick={() => setEditingIngredient(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{ingredient.nombre} - {ingredient.cantidad} - {ingredient.fecha_vencimiento}</span>
                <button className="edit-button" onClick={() => setEditingIngredient(ingredient)}>Edit</button>
                <button className="delete-button" onClick={() => deleteIngredient(ingredient.ingredientes_id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientComponent;
