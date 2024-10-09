

use `django-react`


INSERT INTO api_estudiantes (nombre, edad, seccion, becado)
VALUES 
('Juan Pérez', 12, '6A', true),
('Ana Gómez', 11, '5B', false),
('Luis Martínez', 10, '4C', true),
('Carla Rodríguez', 12, '6B', false),
('Pedro López', 11, '5A', true),
('Lucía Hernández', 12, '6C', true),
('Jorge García', 10, '4B', false),
('María González', 9, '3A', true),
('Sofía Morales', 12, '6A', false),
('Ricardo Vargas', 11, '5B', true),
('Valeria Rivera', 12, '6C', false),
('Tomás Ríos', 10, '4A', true),
('Mateo Cruz', 11, '5C', false),
('Diana Fernández', 9, '3B', true),
('Camila Torres', 12, '6B', false),
('David Suárez', 10, '4A', true),
('Emilio Medina', 11, '5A', false),
('Elena Vega', 12, '6C', true),
('Álvaro Jiménez', 10, '4C', true),
('Patricia Salas', 11, '5B', false);


INSERT INTO api_asistencias (estudiante_id_id, fecha_asistencia)
VALUES
(1, '2024-09-30'), (1, '2024-10-01'), (1, '2024-10-02'), (1, '2024-10-03'), (1, '2024-10-04'), 
(2, '2024-09-30'), (2, '2024-10-01'), (2, '2024-10-02'), (2, '2024-10-03'), (2, '2024-10-04'), 
(3, '2024-09-30'), (3, '2024-10-01'), (3, '2024-10-02'), (3, '2024-10-03'), (3, '2024-10-04'), 
(4, '2024-09-30'), (4, '2024-10-01'), (4, '2024-10-02'), (4, '2024-10-03'), (4, '2024-10-04'), 
(5, '2024-09-30'), (5, '2024-10-01'), (5, '2024-10-02'), (5, '2024-10-03'), (5, '2024-10-04'), 
(6, '2024-09-30'), (6, '2024-10-01'), (6, '2024-10-02'), (6, '2024-10-03'), (6, '2024-10-04'), 
(7, '2024-09-30'), (7, '2024-10-01'), (7, '2024-10-02'), (7, '2024-10-03'), (7, '2024-10-04'), 
(8, '2024-09-30'), (8, '2024-10-01'), (8, '2024-10-02'), (8, '2024-10-03'), (8, '2024-10-04'), 
(9, '2024-09-30'), (9, '2024-10-01'), (9, '2024-10-02'), (9, '2024-10-03'), (9, '2024-10-04'), 
(10, '2024-09-30'), (10, '2024-10-01'), (10, '2024-10-02'), (10, '2024-10-03'), (10, '2024-10-04'), 
(11, '2024-09-30'), (11, '2024-10-01'), (11, '2024-10-02'), (11, '2024-10-03'), (11, '2024-10-04'), 
(12, '2024-09-30'), (12, '2024-10-01'), (12, '2024-10-02'), (12, '2024-10-03'), (12, '2024-10-04'), 
(13, '2024-09-30'), (13, '2024-10-01'), (13, '2024-10-02'), (13, '2024-10-03'), (13, '2024-10-04'), 
(14, '2024-09-30'), (14, '2024-10-01'), (14, '2024-10-02'), (14, '2024-10-03'), (14, '2024-10-04'), 
(15, '2024-09-30'), (15, '2024-10-01'), (15, '2024-10-02'), (15, '2024-10-03'), (15, '2024-10-04'), 
(16, '2024-09-30'), (16, '2024-10-01'), (16, '2024-10-02'), (16, '2024-10-03'), (16, '2024-10-04'), 
(17, '2024-09-30'), (17, '2024-10-01'), (17, '2024-10-02'), (17, '2024-10-03'), (17, '2024-10-04'), 
(18, '2024-09-30'), (18, '2024-10-01'), (18, '2024-10-02'), (18, '2024-10-03'), (18, '2024-10-04'), 
(19, '2024-09-30'), (19, '2024-10-01'), (19, '2024-10-02'), (19, '2024-10-03'), (19, '2024-10-04'), 
(20, '2024-09-30'), (20, '2024-10-01'), (20, '2024-10-02'), (20, '2024-10-03'), (20, '2024-10-04');


INSERT INTO api_ingredientes (nombre, cantidad, fecha_vencimiento) 
VALUES 
('Arroz', 50.00, '2024-12-31'),
('Huevos', 200.00, '2024-11-05'),
('Frijoles', 25.75, '2024-12-10'),
('Aceite de cocina', 15.00, '2024-11-20'),
('Sal', 5.00, '2026-02-01'),
('Mantequilla', 8.00, '2024-11-10'),
('Pasta', 20.00, '2024-12-05'),
('Harina', 500, '2023-01-01'), 
('Azúcar', 200, '2023-02-01'), 
('Leche', 1000, '2023-03-01');


SELECT * from api_ingredientes 