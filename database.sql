/* Creation of amadeus' database */
CREATE DATABASE IF NOT EXISTS amadeus;
USE amadeus;

/* Creation of user's table */
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS usuario(
	uid BIGINT(20) NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'Indice o llave primaria',
    usuario VARCHAR(50) UNIQUE NOT NULL COMMENT 'Indica el usuario o nickname',
    nombre VARCHAR(100) NOT NULL COMMENT 'Nombre del usuario',
    apellido VARCHAR(100) NOT NULL COMMENT 'Apellido del usuario',
    edad TINYINT(2) NOT NULL COMMENT 'Edad del usuario',
    sexo CHAR(1) NOT NULL COMMENT 'Indica el sexo del usuario',
    descripcion TEXT NOT NULL COMMENT 'Una breve descripción acerca del usuario',
    esadministrador BOOLEAN DEFAULT FALSE COMMENT 'Indica si el usuario es Administrador o no',
    nacionalidad CHAR(1) NOT NULL DEFAULT 'C' COMMENT 'Nacionalidad del usuario',
    fechanacimiento DATE NOT NULL COMMENT 'Indica la fecha de nacimiento o cumpleaños',
    aficiones TEXT COMMENT 'Hace referencia a los intereses del usuario',    
    fecharegistro DATETIME DEFAULT NOW() COMMENT 'Fecha en la que se crea el registro',
    fechamodificacion DATETIME COMMENT 'Fecha en la que se modifica el registro'    
);

/* Creation of Records */
INSERT INTO usuario( usuario, nombre, apellido, edad, sexo, descripcion, esadministrador, nacionalidad, fechanacimiento, aficiones ) 
VALUES( "jperez", "Juan", "Pérez", 27, "M", "Analista", true, "C", "1995-03-01", "");


INSERT INTO usuario( usuario, nombre, apellido, edad, sexo, descripcion, esadministrador, nacionalidad, fechanacimiento, aficiones )
VALUES( "mramirez", "Monica", "Ramirez", 27, "F", "Analista", false, "E", "1995-08-06", "'Investigación', 'Lectura'");

INSERT INTO usuario( usuario, nombre, apellido, edad, sexo, descripcion, esadministrador, nacionalidad, fechanacimiento, aficiones )
VALUES( "ftorres", "Fabian", "Torres", 40, "M", "Ingeniero", true, "C", "1981-03-23", "'Investigación'");

INSERT INTO usuario( usuario, nombre, apellido, edad, sexo, descripcion, esadministrador, nacionalidad, fechanacimiento, aficiones )
VALUES( "fceballos", "Fernanda", "Ceballos", 32, "F", "Ingenierio", true, "C", "1990-02-03", "'Tecnologías de la Información'");

INSERT INTO usuario( usuario, nombre, apellido, edad, sexo, descripcion, esadministrador, nacionalidad, fechanacimiento, aficiones )
VALUES( "nanichiarico", "Natalia", "Anichiarico", 32, "F", "Diseñadora", false, "E", "1990-09-02", "'Diseño Gráfico'");

INSERT INTO usuario( usuario, nombre, apellido, edad, sexo, descripcion, esadministrador, nacionalidad, fechanacimiento, aficiones )
VALUES( "lbautista", "Luz", "Bautista", 27, "F", "Administradora", false, "E", "1995-12-23", "'Contabilidad'");

INSERT INTO usuario( usuario, nombre, apellido, edad, sexo, descripcion, esadministrador, nacionalidad, fechanacimiento, aficiones )
VALUES( "acalderon", "Alejandro", "Calderon", 27, "F", "Analista Senior", false, "C", "1995-08-06", "'Bases de Datos'");

/* Check records created */
SELECT * FROM usuario; -- where user_name = 'prueba';