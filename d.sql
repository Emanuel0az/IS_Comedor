

use `django-react`


INSERT INTO api_ingredientes
    (ingredientes_id, nombre, cantidad,fecha_vencimiento)
VALUES
(1, 'Harina', 500, '2023-01-01'), 
(2, 'Azúcar', 200, '2023-02-01'), 
(3, 'Leche', 1000, '2023-03-01')
    



SELECT * FROM api_ingredientes

-- Insertar estudiantes de ejemplo
INSERT INTO api_estudiantes (nombre, edad, grado, tiene_beca) VALUES 
('Juan Perez', 10, '5A', true),
('Maria Gomez', 9, '4B', false),
('Pedro Rodriguez', 11, '6A', true),
('Ana Martinez', 10, '5A', true),
('Luis Fernandez', 9, '4B', false),
('Sofia Lopez', 11, '6A', true),
('Carlos Ruiz', 10, '5B', false),
('Elena Garcia', 9, '4A', true),
('Mateo Diaz', 11, '6B', true),
('Lucia Alvarez', 10, '5A', true);

INSERT INTO api_estudiantes (nombre, edad, grado, tiene_beca) VALUES 
('Juan Pérez', 10, '5to', TRUE),
('María Gómez', 9, '4to', FALSE),
('Carlos Sánchez', 11, '6to', TRUE),
('Ana Ramírez', 8, '3ro', FALSE),
('Luis Fernández', 12, '6to', TRUE),
('Sofía Martínez', 7, '2do', FALSE),
('Diego Torres', 9, '4to', TRUE),
('Valentina Ruiz', 10, '5to', FALSE),
('Andrés Castillo', 11, '6to', TRUE),
('Camila Morales', 8, '3ro', FALSE);


-- Insertar asistencias de ejemplo
-- Datos para cada día de la semana (lunes a viernes)

-- Lunes (fecha: 2024-09-23)
INSERT INTO api_asistencias (estudiante_id_id, fecha_asistencia) VALUES
(1, '2024-09-23'),
(2, '2024-09-23'),
(3, '2024-09-23'),
(4, '2024-09-23'),
(5, '2024-09-23');

SELECT * FROM api_asistencias

-- Martes (fecha: 2024-09-24)
INSERT INTO api_asistencias (estudiante_id_id, fecha_asistencia) VALUES
(1, '2024-09-24'),
(3, '2024-09-24'),
(6, '2024-09-24'),
(7, '2024-09-24'),
(8, '2024-09-24');

-- Miércoles (fecha: 2024-09-25)
INSERT INTO api_asistencias (estudiante_id_id, fecha_asistencia) VALUES
(2, '2024-09-25'),
(3, '2024-09-25'),
(4, '2024-09-25'),
(5, '2024-09-25'),
(9, '2024-09-25');

-- Jueves (fecha: 2024-09-26)
INSERT INTO api_asistencias (estudiante_id_id, fecha_asistencia) VALUES
(16, '2024-09-26'),
(17, '2024-09-26'),
(18, '2024-09-26'),
(19, '2024-09-26'),
(20, '2024-09-26');

-- Viernes (fecha: 2024-09-27)
INSERT INTO api_asistencias (estudiante_id_id, fecha_asistencia) VALUES
(1, '2024-09-27'),
(3, '2024-09-27'),
(5, '2024-09-27'),
(6, '2024-09-27'),
(7, '2024-09-27');


SELECT * FROM api_estudiantes