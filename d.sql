

use `django-react`

-- Inserción de estudiantes
INSERT INTO api_estudiantes (nombre, edad, seccion, becado, rol)
VALUES 
('Juan Pérez', 12, '6A', true, 'estu'),
('Ana Gómez', 11, '5B', false, 'estu'),
('Luis Martínez', 10, '4C', true, 'estu'),
('Carla Rodríguez', 12, '6B', false, 'estu'),
('Pedro López', 11, '5A', true, 'estu'),
('Lucía Hernández', 12, '6C', true, 'estu'),
('Jorge García', 10, '4B', false, 'estu'),
('María González', 9, '3A', true, 'estu'),
('Sofía Morales', 12, '6A', false, 'estu'),
('Ricardo Vargas', 11, '5B', true, 'estu'),
('Valeria Rivera', 12, '6C', false, 'estu'),
('Tomás Ríos', 10, '4A', true, 'estu'),
('Mateo Cruz', 11, '5C', false, 'estu'),
('Diana Fernández', 9, '3B', true, 'estu'),
('Camila Torres', 12, '6B', false, 'estu'),
('David Suárez', 10, '4A', true, 'estu'),
('Emilio Medina', 11, '5A', false, 'estu'),
('Elena Vega', 12, '6C', true, 'estu'),
('Álvaro Jiménez', 10, '4C', true, 'estu'),
('Patricia Salas', 11, '5B', false, 'estu');

-- Inserción de profesores
INSERT INTO api_estudiantes (nombre, edad, seccion, becado, rol)
VALUES 
('Jackson', 29, 'Prof', false, 'prof');

-- Inserción de ingredientes
INSERT INTO api_ingredientes (ingredientes_id, nombre, cantidad, fecha_vencimiento)
VALUES
(1, 'Harina', 500, '2023-01-01'), 
(2, 'Azúcar', 200, '2023-02-01'), 
(3, 'Leche', 1000, '2023-03-01');

-- Inserción de ingredientes adicionales
INSERT INTO api_ingredientes (nombre, cantidad, fecha_vencimiento) 
VALUES 
('Arroz', 50.00, '2024-12-31'),
('Huevos', 200.00, '2024-11-05'),
('Frijoles', 25.75, '2024-12-10'),
('Aceite de cocina', 15.00, '2024-11-20'),
('Sal', 5.00, '2026-02-01'),
('Mantequilla', 8.00, '2024-11-10'),
('Pasta', 20.00, '2024-12-05');

-- Inserción de asistencias
INSERT INTO api_asistencias (estudiante_id_id, fecha_asistencia)
VALUES
(1, '2024-09-30'), (2, '2024-09-30'), (3, '2024-09-30'), 
(4, '2024-09-30'), (5, '2024-09-30'), (6, '2024-09-30'),
(7, '2024-09-30'), (8, '2024-09-30'), (9, '2024-09-30'), 
(10, '2024-09-30'), (11, '2024-09-30'), (12, '2024-09-30'),
(13, '2024-09-30'), (14, '2024-09-30'), (15, '2024-09-30'), 
(16, '2024-09-30'), (17, '2024-09-30'), (18, '2024-09-30'),
(19, '2024-09-30'), (20, '2024-09-30');

-- Inserción de asistencias para estudiantes del 95 al 102
INSERT INTO api_asistencias (estudiante_id_id, fecha_asistencia)
VALUES
(4, '2024-10-07'),
(5, '2024-10-07'),
(6, '2024-10-07'),
(7, '2024-10-08'),
(8, '2024-10-08'),
(9, '2024-10-08'),
(10, '2024-10-09'),
(11, '2024-10-09'),
(12, '2024-10-09'),
(13, '2024-10-10'),
(14, '2024-10-10'),
(15, '2024-10-10'),
(16, '2024-10-07'),
(17, '2024-10-07'),
(18, '2024-10-08'),
(19, '2024-10-08'),
(20, '2024-10-09');


-- Actualización de roles de estudiantes
UPDATE api_estudiantes SET rol = 'prof' WHERE estudiante_id = 1;
UPDATE api_estudiantes SET rol = 'estu' WHERE estudiante_id = 2;

-- Inserción de historial de pagos
INSERT INTO api_hist_pagos (fecha_pago, monto, estudiante_id_id, fecha_pago_prueba)
VALUES
('2024-10-09', 100, 1, '2024-10-04'), 
('2024-10-09', 200, 2, '2024-10-04'),
('2024-10-09', 50, 3, '2024-10-04'),
('2024-10-09', 150, 4, '2024-10-05'),
('2024-10-09', 250, 5, '2024-10-05'),
('2024-10-09', 300, 6, '2024-10-05'),
('2024-10-09', 400, 7, '2024-10-05'),
('2024-10-09', 500, 8, '2024-10-06'),
('2024-10-09', 600, 9, '2024-10-06'),
('2024-10-09', 700, 10, '2024-10-06'),
('2024-10-09', 800, 11, '2024-10-06'),
('2024-10-09', 900, 12, '2024-10-07'),
('2024-10-09', 1000, 13, '2024-10-07'),
('2024-10-09', 1100, 14, '2024-10-07'),
('2024-10-09', 1200, 15, '2024-10-07'),
('2024-10-09', 1300, 16, '2024-10-08');
