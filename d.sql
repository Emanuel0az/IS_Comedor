

use `django-react`


INSERT INTO api_estudiantes (nombre, edad, seccion, becado, rol, almuerzo)
VALUES 
('Juan Pérez', 12, '6A', true, 'estu', FALSE),
('Ana Gómez', 11, '5B', false, 'estu', TRUE),
('Luis Martínez', 10, '4C', true, 'estu', TRUE),
('Carla Rodríguez', 12, '6B', false, 'estu', TRUE),
('Pedro López', 11, '5A', true, 'estu', TRUE),
('Lucía Hernández', 12, '6C', true, 'estu', TRUE),
('Jorge García', 10, '4B', false, 'estu', TRUE),
('María González', 9, '3A', true, 'estu', TRUE),
('Sofía Morales', 12, '6A', false, 'estu', TRUE),
('Ricardo Vargas', 11, '5B', true, 'estu', TRUE),
('Valeria Rivera', 12, '6C', false, 'estu', TRUE),
('Tomás Ríos', 10, '4A', true, 'estu', TRUE),
('Mateo Cruz', 11, '5C', false, 'estu', TRUE),
('Diana Fernández', 9, '3B', true, 'estu', TRUE),
('Camila Torres', 12, '6B', false, 'estu', TRUE),
('David Suárez', 10, '4A', true, 'estu', TRUE),
('Emilio Medina', 11, '5A', false, 'estu', TRUE),
('Elena Vega', 12, '6C', true, 'estu', TRUE),
('Álvaro Jiménez', 10, '4C', true, 'estu', TRUE),
('Patricia Salas', 11, '5B', false, 'estu', TRUE);

-- -- Inserción de profesores
-- INSERT INTO api_estudiantes (nombre, edad, seccion, becado, rol)
-- VALUES 
-- ('Jackson', 29, 'Prof', false, 'prof');

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


CREATE TABLE Estudiantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cedula VARCHAR(20) NOT NULL,
    apellidos VARCHAR(70) NOT NULL,
    nombre VARCHAR(70) NOT NULL,
    seccion VARCHAR(10) DEFAULT NULL, 
    fecha_nacimiento VARCHAR(70) NOT NULL,
    edad VARCHAR(50) NOT NULL,
    telefono VARCHAR(15),
    rol ENUM('estu', 'prof') NOT NULL, 
    becado BOOLEAN DEFAULT False, 
    UNIQUE (cedula)
);


select * from `Estudiantes` LIMIT 1000

drop Table `Estudiantes`

LOAD DATA INFILE '/var/lib/mysql-files/Estudiantes_definitivo.csv'
INTO TABLE Estudiantes
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ';' 
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 5 LINES
(cedula, apellidos, nombre, seccion, fecha_nacimiento, edad, telefono);





SHOW VARIABLES LIKE 'secure_file_priv';

SHOW TABLE STATUS LIKE 'Estudiantes';

ALTER TABLE Estudiantes CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


docker cp Estudiantes_sin_ñ.csv 946b410a0be377f6abfc681a9c235c73d14d6a81dc593eda7671193888241062:/Estudiantes_sin_ñ.csv

