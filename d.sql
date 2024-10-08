

use `django-react`


INSERT INTO api_ingredientes
    (ingredientes_id, nombre, cantidad,fecha_vencimiento)
VALUES
(1, 'Harina', 500, '2023-01-01'), 
(2, 'Azúcar', 200, '2023-02-01'), 
(3, 'Leche', 1000, '2023-03-01')



INSERT INTO api_estudiantes (nombre, edad, seccion, becado, rol)
VALUES 
('Jocksan', 29, 'Prof', false, 'prof')



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
(1, '2024-09-30'),
(2, '2024-09-30'),
(3, '2024-09-30'),
(4, '2024-09-30'),
(5, '2024-09-30'),
(6, '2024-09-30'),
(5, '2024-09-30'),
(6, '2024-09-30'),
(7, '2024-09-30'),
(8, '2024-09-30'),
(9, '2024-09-30'),
(10, '2024-09-30'),
(11, '2024-09-30'),
(12, '2024-09-30'),
(13, '2024-09-30'),
(14, '2024-09-30'),
(15, '2024-09-30'),
(16, '2024-09-30'),
(17, '2024-09-30'),
(18, '2024-09-30'),
(19, '2024-09-30'),
(20, '2024-09-30')

SELECT * FROM api_estudiantes

UPDATE api_estudiantes SET rol = 'prof' WHERE estudiante_id = 1

UPDATE api_estudiantes SET rol = 'estu' WHERE estudiante_id = 2

(95, '2024-09-30'), (95, '2024-10-01'), (95, '2024-10-02'), (95, '2024-10-03'), (95, '2024-10-04'), 
(96, '2024-09-30'), (96, '2024-10-01'), (96, '2024-10-02'), (96, '2024-10-03'), (96, '2024-10-04'), 
(97, '2024-09-30'), (97, '2024-10-01'), (97, '2024-10-02'), (97, '2024-10-03'), (97, '2024-10-04'), 
(98, '2024-09-30'), (98, '2024-10-01'), (98, '2024-10-02'), (98, '2024-10-03'), (98, '2024-10-04'), 
(99, '2024-09-30'), (99, '2024-10-01'), (99, '2024-10-02'), (99, '2024-10-03'), (99, '2024-10-04'), 
(100, '2024-09-30'), (100, '2024-10-01'), (100, '2024-10-02'), (100, '2024-10-03'), (100, '2024-10-04'), 
(101, '2024-09-30'), (101, '2024-10-01'), (101, '2024-10-02'), (101, '2024-10-03'), (101, '2024-10-04'), 
(102, '2024-09-30'), (102, '2024-10-01'), (102, '2024-10-02'), (102, '2024-10-03'), (102, '2024-10-04');

