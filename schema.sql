### Schema
CREATE DATABASE burgers_db;
USE burgers_db;

CREATE TABLE orders
(
	id int NOT NULL AUTO_INCREMENT,
	ord_desc varchar(255) NOT NULL,
	ord_status boolean NOT NULL,
	PRIMARY KEY (id)
);
