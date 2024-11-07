-- Active: 1727766106156@@127.0.0.1@3306

CREATE DATABASE `django-react`

use `django-react`

CREATE TABLE Users (
    users_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) DEFAULT NULL,
    mail VARCHAR(255) DEFAULT NULL,
    password VARCHAR(255) DEFAULT NULL,
    rol VARCHAR(255) DEFAULT NULL
);

CREATE TABLE Estudiantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cedula VARCHAR(50) UNIQUE DEFAULT NULL,
    apellidos VARCHAR(70) DEFAULT NULL,
    nombre VARCHAR(70) DEFAULT NULL,
    seccion VARCHAR(50) DEFAULT NULL,
    fecha_nacimiento VARCHAR(70) DEFAULT NULL,
    edad VARCHAR(50) DEFAULT NULL,
    telefono VARCHAR(50) DEFAULT NULL,
    rol ENUM('Estudiantes', 'Profesor') DEFAULT 'Estudiantes',
    becado BOOLEAN DEFAULT FALSE
);

CREATE TABLE Hist_pagos (
    id_pago INT AUTO_INCREMENT PRIMARY KEY,
    estudiante_id INT,
    fecha_pago DATE DEFAULT NULL,  -- Cambiado para permitir NULL y manejar la fecha en la inserción.
    fecha_pago_prueba DATE DEFAULT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    reporte TEXT DEFAULT NULL,
    hora DATETIME DEFAULT NULL,
    fecha_desactivado DATE DEFAULT NULL,
    FOREIGN KEY (estudiante_id) REFERENCES Estudiantes(id) ON DELETE CASCADE
);


GRANT ALL PRIVILEGES ON `django-react`.* TO 'root'@'localhost';
FLUSH PRIVILEGES;



INSERT INTO api_estudiantes (nombre, edad, seccion,becado, rol)
VALUES 
('Juan Pérez', 12, '6A', true, 'Estudiantes'),
('Ana Gómez', 11, '5B', false, 'Estudiantes'),
('Luis Martínez', 10, '4C', true, 'Estudiantes'),
('Carla Rodríguez', 12, '6B', false, 'Estudiantes'),
('Pedro López', 11, '5A', true, 'Estudiantes'),
('Lucía Hernández', 12, '6C', true, 'Estudiantes'),
('Jorge García', 10, '4B', false, 'Profesor'),
('María González', 9, '3A', true, 'Estudiantes'),
('Sofía Morales', 12, '6A', false, 'Estudiantes'),
('Ricardo Vargas', 11, '5B', true, 'Estudiantes'),
('Valeria Rivera', 12, '6C', false, 'Estudiantes'),
('Tomás Ríos', 10, '4A', true, 'Estudiantes'),
('Mateo Cruz', 11, '5C', false, 'Estudiantes'),
('Diana Fernández', 9, '3B', true, 'Estudiantes'),
('Camila Torres', 12, '6B', false, 'Estudiantes'),
('David Suárez', 10, '4A', true, 'Estudiantes'),
('Emilio Medina', 11, '5A', false, 'Estudiantes'),
('Elena Vega', 12, '6C', true, 'Estudiantes'),
('Álvaro Jiménez', 10, '4C', true, 'Estudiantes'),
('Patricia Salas', 11, '5B', false, 'Estudiantes');

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


-- CREATE TABLE Estudiantes (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     cedula VARCHAR(20) NOT NULL,
--     apellidos VARCHAR(70) NOT NULL,
--     nombre VARCHAR(70) NOT NULL,
--     seccion VARCHAR(10) DEFAULT NULL, 
--     fecha_nacimiento VARCHAR(70) NOT NULL,
--     edad VARCHAR(50) NOT NULL,
--     telefono VARCHAR(15),
--     rol ENUM('estu', 'prof') NOT NULL, 
--     becado BOOLEAN DEFAULT False, 
--     UNIQUE (cedula)
-- );


select * from `api_estudiantes` LIMIT 5000

SELECT * FROM api_hist_pagos LIMIT 10000


SELECT COUNT(*) 
FROM api_estudiantes 
WHERE becado = 1;


LOAD DATA INFILE '/var/lib/mysql-files/Estudiantes_dev.csv'
INTO TABLE api_estudiantes
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 6 LINES
(cedula, apellidos, nombre, seccion, fecha_nacimiento, edad, telefono);

ALTER TABLE api_estudiantes MODIFY telefono VARCHAR(50);

DESCRIBE api_estudiantes;



UPDATE api_estudiantes SET becado = 0 ;


UPDATE api_estudiantes SET rol = "Estudiantes";


drop table api_estudiantes;

drop table api_hist_pagos


# Convertir una tabla en un archivo csv

SELECT *
INTO OUTFILE '/var/lib/mysql-files/Liceo_estud.csv'
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
FROM api_estudiantes;








SHOW VARIABLES LIKE 'secure_file_priv';

SHOW TABLE STATUS LIKE 'Estudiantes';

ALTER TABLE Estudiantes CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


docker cp Estudiantes_sin_ñ.csv 946b410a0be377f6abfc681a9c235c73d14d6a81dc593eda7671193888241062:/Estudiantes_sin_ñ.csv


UPDATE api_estudiantes 
SET becado = 1 
WHERE cedula IN (
    '6-0509-0727',
    '6-0510-0492',
    '6-0515-0671',
    '6-0532-0598',
    '3-0573-0018',
    '6-0512-0812',
    '6-0504-0783',
    '1-2056-0068',
    '6-0518-0679',
    '6-0527-0362',
    '6-0532-0418',
    '6-0518-0472',
    '6-0526-0121',
    '6-0511-0424',
    '6-0511-0396'
);


UPDATE api_estudiantes 
SET becado = 1 
WHERE cedula IN (
    '6-0511-0725',
    '6-0530-0045',
    '6-0516-0564',
    '6-0517-0584',
    '6-0520-0185',
    '1-2034-0209',
    '6-0521-0673',
    '6-0525-0139',
    '6-0508-0626',
    '6-0516-0953',
    '6-0518-0560',
    '6-0518-0177',
    '6-0518-0854',
    '6-0507-0141',
    '6-0503-0720',
    '6-0505-0361',
    '1-2051-0965',
    '6-0525-0009'
);


UPDATE api_estudiantes 
SET becado = 1 
WHERE cedula IN (
    '6-0485-0157',
    '6-0519-0657',
    '6-0527-0281',
    '6-0534-0123',
    '7-0358-0151',
    '6-0534-0281',
    'YR202320594',
    '6-0535-0191',
    '5-0484-0365',
    '6-0533-0865',
    '6-0535-0721',
    '1-2026-0105',
    '6-0526-0367',
    '6-0526-0871',
    '6-0509-0887',
    '6-0527-0164',
    '5-0482-0530',
    '6-0530-0918',
    '6-0527-0722',
    '6-0509-0474'
);


UPDATE api_estudiantes 
SET becado = 1 
WHERE cedula IN (
    '6-0520-0628',
    '6-0534-0872',
    '6-0522-0385',
    '6-0519-0091',
    '6-0524-0730',
    '6-0533-0454',
    '6-0516-0831',
    '2341261234',
    '605220251',
    '6-0503-0085',
    '6-0530-0290',
    '6-0517-0097',
    '1-2050-0130',
    '2-0897-0737',
    '6-0504-0504',
    '6-0533-0254',
    '6-0533-0818'
);


UPDATE api_estudiantes 
SET becado = 1 
WHERE cedula IN (
    '6-0498-0124',
    '6-0520-0510',
    '6-0522-0828',
    '6-0530-0095',
    '6-0514-0038',
    '5-0495-0679',
    '6-0532-0884',
    '6-0535-0322',
    '6-0519-0404',
    '7-0347-0392',
    '6-0508-0866',
    '6-0505-0313',
    '6-0521-0026'
);


UPDATE api_estudiantes 
SET becado = 1 
WHERE cedula IN (
    '6-0493-0369',
    '6-0494-0932',
    '6-0532-0190',
    '6-0529-0347',
    '6-0505-0248',
    '6-0526-0750',
    '6-0501-0992',
    '6-0520-0539',
    '6-0523-0293',
    '6-0524-0103',
    '5-0481-0483',
    '6-0529-0044',
    '6-0533-0375',
    '6-0508-0830',
    '6-0513-0682',
    '6-0529-0588'
);


UPDATE api_estudiantes 
SET becado = 1 
WHERE cedula IN (
    '6-0513-0666',
    '6-0494-0097',
    '6-0534-0677',
    '6-0527-0502',
    '6-0520-0874',
    '6-0521-0402',
    '6-0518-0391',
    '6-0513-0117',
    '6-0511-0279',
    '6-0535-0409',
    '6-0521-0244',
    '6-0528-0493',
    '6-0522-0485',
    '6-0503-0842',
    '6-0510-0868',
    '6-0510-0914',
    '6-0510-0126',
    '6-0526-0703'
);


UPDATE api_estudiantes 
SET becado = 1 
WHERE cedula IN (
    '6-0525-0010',
    '6-0515-0945',
    '6-0510-0913',
    '6-0529-0361',
    '1-2019-0628',
    '6-0494-0815',
    '6-0528-0160',
    '1-2043-0583',
    '6-0529-0082',
    '6-0516-0238',
    '6-0524-0729',
    '6-0505-0523',
    '6-0511-0490',
    '6-0528-0691',
    '6-0529-0461',
    '8-5411-0414',
    '6-0525-0252'
);


UPDATE api_estudiantes 
SET becado = 1 
WHERE cedula IN (
    '6-0512-0394',
    '6-0527-0910',
    '6-0511-0202',
    '6-0524-0095',
    '5-0474-0448',
    '6-0511-0407',
    '6-0510-0481',
    '6-0509-0559',
    '6-0529-0085',
    '6-0505-0802',
    '6-0534-0275',
    '1-1986-0635',
    '6-0514-0466',
    '6-0502-0813',
    '6-0525-0081',
    '6-0505-0066',
    '6-0514-0645',
    '6-0504-0409',
    '6-0526-0459',
    '6-0529-0847',
    '6-0521-0391',
    '6-0512-0755'
);


UPDATE api_estudiantes 
SET becado = 1 
WHERE cedula IN (
    '6-0526-0450',
    '6-0505-0803',
    '6-0527-0420',
    '5-0476-0469',
    '6-0529-0642',
    '6-0533-0033',
    '6-0532-0335',
    '6-0509-0835',
    '6-0519-0043',
    '6-0532-0722',
    '6-0529-0983',
    '6-0534-0015',
    '6-0529-0346',
    '6-0524-0101',
    '6-0521-0497',
    '6-0531-0159',
    '6-0514-0868',
    '6-0508-0940',
    '2-0910-0819',
    '6-0512-0632',
    '6-0528-0015'
);


UPDATE api_estudiantes 
SET becado = 1 
WHERE cedula IN (
    '6-0521-0371',
    '6-0530-0654',
    '6-0533-0574',
    '6-0533-0584',
    '6-0530-0773',
    '6-0515-0695',
    '6-0502-0659',
    '1-2051-0702',
    '6-0529-0718',
    '6-0517-0123',
    '6-0515-0427',
    '6-0533-0799',
    '6-0507-0194',
    '6-0533-0039',
    '6-0528-0736',
    '6-0517-0534',
    '6-0507-0223',
    '6-0524-0341',
    '6-0532-0519',
    '6-0519-0471'
);



UPDATE api_estudiantes 
SET becado = 1 
WHERE cedula IN (
    '6-0528-0114',
    '6-0523-0191',
    '6-0515-0675',
    '6-0514-0116',
    '6-0511-0712',
    '6-0503-0137',
    '6-0525-0205',
    '6-0518-0107',
    '6-0526-0050',
    '6-0532-00981',
    '6-0511-0148',
    '6-0502-0067',
    '6-0-521-0382',
    '6-0521-0383',
    '6-0522-0003',
    '6-0525-0906',
    '6-0530-0201',
    '6-0512-0284',
    '6-0516-0728',
    '6-0516-0246',
    '6-0517-0274',
    '6-0498-0133',
    '6-0520-0648',
    '6-0506-0197',
    '6-0514-0469',
    '6-0524-0309',
    '583131'
);



UPDATE api_estudiantes 
SET becado = 1 
WHERE cedula IN (
    '6-0507-0452',
    '6-0531-0345',
    '6-0520-0604',
    '6-0527-0314',
    '6-0508-0565',
    '2-0921-0962',
    '6-0519-0897',
    '6-0513-0004',
    '6-0504-0188',
    '6-0529-0960',
    '6-0504-0496',
    '6-0526-0246',
    '6-0528-0151',
    '6-0528-0024',
    '6-0526-0200',
    '6-0509-0230',
    '6-0511-0417',
    '6-0516-0500',
    '6-0508-0805',
    '6-0501-0468',
    '6-0520-0419'
);



UPDATE api_estudiantes 
SET becado = 1 
WHERE cedula IN (
    '6-0533-0800',
    '6-0508-0325',
    '7-0343-0441',
    '6-0501-467',
    '6-0523-0072',
    '6-0504-0288',
    '6-0521-0256',
    '6-0499-0855',
    '6-0518-0661',
    '6-0527-0084',
    '6-0518-0163',
    '6-0511-0501',
    '6-0511-0543',
    '6-0516-0645',
    '6-0505-0632',
    '6-0529-0376',
    '6-0503-0613',
    '2-08850-739',
    '6-506-0393',
    '6-0498-0974',
    '6-0526-0456',
    '6-0517-0166',
    '6-0530-0496',
    '6-0528-0312',
    '1-1944-0451',
    '6-0519-0978'
);



UPDATE api_estudiantes 
SET becado = 1 
WHERE cedula IN (
    '1555420000000', -- Convertido de notación científica
    '6-0508-0758',
    '6-0510-0525',
    '6-0519-0615',
    '6-0519-0070',
    '6-0528-0387',
    '6-0505-0438',
    '6-0512-0218',
    '1-2053-0967',
    '1-2076-0736',
    '6-0523-0073',
    '6-0529-0730',
    '6-0518-0761',
    '6-0526-0858',
    '6-0518-0599',
    '6-0521-0809',
    '1-2107-0080',
    '6-0520-0503',
    '6-0499-0228',
    '5-0475-0875',
    '6-0512-0634',
    '1-2051-0246',
    '6-0509-0427',
    '6-0504-0855'
);



UPDATE api_estudiantes 
SET becado = 1 
WHERE cedula IN (
    '6-0533-0338',
    '6-0531-0372',
    '6-0507-0866',
    '6-0515-0167',
    '6-0535-0390',
    '6-0510-0422',
    '6-0519-0900',
    '6-0514-0505',
    '1-2095-0458',
    '6-0526-0240',
    '6-0497-0391',
    '6-0533-0518',
    '1-2110-0143',
    '6-0501-0415',
    '6-0529-0296',
    '6-0510-0451',
    '6-0509-0095',
    '6-0547-0279',
    '6-0533-0592',
    '6-0507-0339',
    '6-0518-0388',
    '6-0530-0095',
    'C1431824', -- Este valor puede necesitar verificación de formato
    '6-0504-0273',
    '1-2114-0281',
    '6-0523-0876'
);



UPDATE api_estudiantes 
SET becado = 1 
WHERE cedula IN (
    '6-0506-0658',
    '6-0533-0046',
    '7-0345-0734',
    '6-0513-0718',
    '1-2071-0467',
    '6-0522-0821',
    '1-1963-0010',
    '6-0516-0114',
    '6-0518-0323',
    '6-0503-0608',
    '6-0506-0514',
    '1-2111-0150',
    '6-0535-0301',
    '6-0525-0417',
    '1-2021-0801',
    '6-0527-0096',
    '6-0506-0194',
    '6-0530-0404',
    '6-0530-0093',
    '6-0531-0171',
    '6-0534-0554',
    '6-0519-0391',
    '6-0525-0256',
    '6-0495-0273'
);


UPDATE api_estudiantes 
SET becado = 1 
WHERE cedula IN (
    '6-0534-0353',
    '6-0534-0177',
    '6-0518-0871',
    '6-0509-0713',
    '6-0508-0659',
    '6-0519-0540',
    '6-0531-0001',
    '6-0520-0329',
    '6-0524-0685',
    '6-0506-0089',
    '2-0861-0164',
    '6-0526-0517',
    '6-0535-0907',
    '6-0529-0318',
    '6-0503-0706',
    '6-0518-0858',
    '1-2100-0861',
    '5-0495-0493',
    '6-0531-0675',
    '6-0501-0466',
    '6-0513-0214',
    '6-0512-0502',
    '1-2064-0045',
    '1-2064-0044',
    '6-0498-0464',
    '6-0533-0161',
    '6-0529-0374'
);



UPDATE api_estudiantes 
SET becado = 1 
WHERE cedula IN (
    '1-2116-0554',
    '6-0524-0339',
    '6-0512-0641',
    '1-2038-0393',
    '1-1951-0008',
    '6-0527-0089',
    '2-0864-0796',
    '2-0913-0076',
    '6-0504-0116',
    '6-0533-0650',
    '6-0503-0456',
    '6-0528-0019',
    '6-0526-0730',
    '6-0498-0838',
    '6-0525-0292',
    '6-0512-0169',
    '6-0526-0421',
    '6-0533-0523',
    '6-0521-0004',
    '6-0523-0936',
    '1-1982-0986',
    '6-0517-0557',
    '6-0506-0902',
    '1-2010-0074',
    '155825664829',
    '4-0290-0162',
    '6-0517-0130'
);



UPDATE api_estudiantes 
SET becado = 1 
WHERE cedula IN (
    '6-0516-0937',
    '6-0527-0174',
    '6-0512-0868',
    '6-0508-0762',
    '6-0496-0059',
    '6-0506-0958',
    '6-0520-0411',
    '6-0520-0488',
    '6-0531-0791',
    '6-0526-0600',
    '1-1962-0790',
    '6-0523-0871',
    '6-0513-0182',
    '6-0524-0938',
    '6-0531-0884',
    '2-0922-0896',
    '6-0526-0118',
    '6-0509-0502',
    '6-0527-0215',
    '6-0516-0531',
    '6-0510-0514',
    '6-0506-0527',
    '6-0497-0842',
    '1-2078-0190',
    '6-0510-0513',
    '2-0942-0553'
);



UPDATE api_estudiantes 
SET becado = 1 
WHERE cedula IN (
    '6-0515-0673',
    '6-0523-0389',
    '1-1981-0468',
    '1-2072-0115',
    '6-0516-0810',
    '7-0360-0361',
    '6-0533-0522',
    '6-0526-0306',
    '6-0533-0413',
    '2-0941-0141',
    '6-0502-0650',
    '6-0524-0142',
    '6-0526-0006',
    '6-0533-0255',
    '6-0526-0528',
    '1-2063-0407',
    '2-0948-0222',
    '6-0513-952',
    '6-0523-0347',
    '6-0500-0187',
    '6-0515-0645',
    '6-0523-0068',
    '6-0520-0625',
    '6-0535-0887',
    '6-0532-0541',
    '6-0534-0066',
    '6-0530-0523',
    '6-0515-0762'
);



UPDATE api_estudiantes 
SET becado = 1 
WHERE cedula IN (
    '6-0531-0976',
    '6-0506-0207',
    '60505-0235',
    '6-0519-0240',
    '6-0522-0766',
    '6-0512-0236',
    '6-0535-0939',
    '6-0529-0306',
    '6-0506-0605',
    '8-0145-0284',
    '6-0522-0778',
    '6-0527-0737',
    '6-0529-0350',
    '6-0505-0991',
    '6-0516-0827',
    '6-0496-0058',
    '6-0526-0195',
    '6-0511-0189',
    '6-0504-0279',
    '6-0506-0147',
    '6-0528-0971',
    '6-0527-0746',
    '6-0526-0984',
    '6-0520-0492',
    '6-0511-0189',
    '6-0514-0279',
    '1-2125-0756',
    '6-0531-0327',
    '6-0504-0732'
);



UPDATE api_estudiantes 
SET becado = 1 
WHERE cedula IN (
    '6-0530-0553',
    '6-0529-0893',
    '5-0487-0212',
    '6-0494-0146',
    '6-0494-0145',
    '6-0528-0853',
    '6-0528-0878',
    '6-0529-0241',
    '6-0524-0354',
    '6-0529-0605',
    '6-0519-0702',
    '2-0923-0826',
    '6-0531-0208',
    '1-2038-0461',
    '6-0503-0131',
    '6-0516-0327',
    '6-0503-0395',
    '6-0515-0984',
    '6-05200-0582',
    '6-0519-0330',
    '6-0507-0435',
    '6-0526-0883',
    '6-0513-0485',
    '3-0554-0698',
    '6-0501-0353',
    '6-0525-0132',
    '6-0502-0374',
    '6-0521-0569',
    '6-0521-0008',
    '6-0521-0555',
    '6-0510-0200',
    '6-0500-0370'
);



UPDATE api_estudiantes 
SET becado = 1 
WHERE cedula IN (
    '6-0518-0922',
    '7-0347-0392',
    '2-0898-0276',
    '1-2081-0494',
    '6-0525-0899',
    '6-0533-0805',
    '6-0524-0415',
    '1-2081-0159',
    '5-0481-0004',
    '6-0515-0556',
    '6-0531-0676',
    '6-0520-0047',
    '6-0530-0323',
    '6-0523-0156',
    '5-0500-0273',
    '6-0515-0265',
    '6-0531-0866',
    '6-0516-0088',
    '6-0528-0196',
    '6-0530-0788',
    '6-0521-0563',
    '6-0514-0287',
    '6-0501-0436'
);



UPDATE api_estudiantes 
SET becado = 1 
WHERE cedula IN (
    '5-0484-0876',
    '6-0518-0557',
    '6-0519-0101',
    '6-0533-0472',
    '6-0532-0735',
    '6-0522-0075',
    '6-0532-0757',
    '1-2076-0703',
    '6-0522-0637',
    'A50559200',
    '6-0525-0065',
    '6-0487-0344',
    '6-0501-0935',
    '6-0517-0611',
    '6-0511-0153',
    '1-1981-0243',
    '6-0526-0266',
    '6-0498-0068',
    '6-0505-0303',
    '6-0510-0135',
    '6-0510-00478',
    '6-0505-0916',
    '6-0525-0676',
    '6-0529-0379',
    '6-0505-0622',
    '13626135996136',
    '6-0532-0012',
    '5-0483-0695',
    '6-0529-0319',
    '6-0513-0007',
    '6-0512-0616',
    '6-0512-0644',
    '6-0505-0605',
    '6-0520-0412',
    '1-2106-0792',
    '6-0529-0045'
);



