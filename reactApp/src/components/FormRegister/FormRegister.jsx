import React, { useEffect, useState } from 'react';
import './FormRegister.css';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    mail: '',
    password: '',
    rol: ''
  });
  const [users, setUsers] = useState([]);
  const [currentView, setCurrentView] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [editUserId, setEditUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    mail: '',
    rol: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/users/');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Usuario registrado exitosamente');
        setFormData({ name: '', mail: '', password: '', rol: '' });
        fetchUsers();
      } else {
        const errorData = await response.json();
        alert(`Error al registrar usuario: ${errorData.message || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al registrar usuario');
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEdit = (user) => {
    setEditUserId(user.users_id); // Cambiado de id a users_id
    setEditFormData({
      name: user.name,
      mail: user.mail,
      rol: user.rol
    });
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/${editUserId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFormData),
      });

      if (response.ok) {
        alert('Usuario actualizado exitosamente');
        setEditUserId(null);
        fetchUsers();
      } else {
        const errorData = await response.json();
        alert(`Error al actualizar usuario: ${errorData.message || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar usuario');
    }
  };

  const handleDelete = async (users_id) => { // Cambiado de id a users_id
    try {
      const response = await fetch(`http://localhost:8000/api/users/${users_id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('Usuario eliminado exitosamente');
        fetchUsers();
      } else {
        const errorData = await response.json();
        alert(`Error al eliminar usuario: ${errorData.message || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar usuario');
    }
  };

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.mail?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="register-container">
      <div className="header">
        <h1>Sistema de Registro de Usuarios</h1>
        <div className="nav-buttons">
          <button onClick={() => setCurrentView('add')} className={`nav-button ${currentView === 'add' ? 'active' : ''}`}>
            Añadir Usuario
          </button>
          <button onClick={() => setCurrentView('list')} className={`nav-button ${currentView === 'list' ? 'active' : ''}`}>
            Ver Lista de Usuarios
          </button>
        </div>
      </div>

      {currentView === 'add' && (
        <form onSubmit={handleSubmit} className="register-form">
          <h2>Registro de Usuario</h2>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ingresa un nombre"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mail">Correo electrónico:</label>
            <input
              type="email"
              id="mail"
              name="mail"
              value={formData.mail}
              onChange={handleChange}
              placeholder="Ingresa un correo"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Ingresa una contraseña"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="rol">Rol:</label>
            <input
              type="text"
              id="rol"
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              placeholder="Ingresa un rol"
              required
            />
          </div>
          <button type="submit" className="submit-btn">Registrar</button>
        </form>
      )}

      {currentView === 'list' && (
        <div className="user-list">
          <h2>Lista de Usuarios</h2>
          <input
            type="text"
            className="search-input2"
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className='gato'></div>
          <ul id="user-list">
            {filteredUsers.map(user => (
              <li key={user.users_id}> {/* Cambiado de id a users_id */}
                {editUserId === user.users_id ? ( // Cambiado de id a users_id
                  <div className="edit-form">
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleEditChange}
                      className="edit-input"
                    />
                    <input
                      type="text"
                      name="mail"
                      value={editFormData.mail}
                      onChange={handleEditChange}
                      className="edit-input"
                    />
                    <input
                      type="text"
                      name="rol"
                      value={editFormData.rol}
                      onChange={handleEditChange}
                      className="edit-input"
                    />
                    <div className='conteiner_buton'>
                      <button onClick={handleSaveEdit} className="save-btn">Guardar</button>
                      <button onClick={() => setEditUserId(null)} className="save-btn">Cancelar</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="user-name">{user.name}</span>
                    <span>{user.mail}</span>
                    <span>{user.rol}</span>
                    <button onClick={() => handleEdit(user)} className="edit-btn">Editar</button>
                    <button onClick={() => handleDelete(user.users_id)} className="delete-btn">Eliminar</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}