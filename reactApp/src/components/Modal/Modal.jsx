import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import '../Modal/Modal.css'

export const CustomModal = ({ alertas = [] }) => {  // Asignamos un valor por defecto vacío a alertas
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Mostrar estudiantes con alertas
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Estudiantes con Alertas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alertas.length > 0 ? (
            <ul>
              {alertas.map(estudiante => (
                <li key={estudiante.estudiante_id} className="bg-red-50 p-3 rounded-lg border border-red-200">
                  <span className="font-semibold">{estudiante.nombre}</span> ha faltado más de 3 días esta semana.
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay estudiantes con alertas esta semana.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomModal;
