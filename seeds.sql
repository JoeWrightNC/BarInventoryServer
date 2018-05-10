DROP DATABASE IF EXISTS barManager;
CREATE DATABASE barManager;

USE barManager;
CREATE TABLE inventory (
	id INT NOT NULL auto_increment,
	itemName VARCHAR(50) NOT NULL,
	storageLocation VARCHAR(50) NOT NULL,
	price DECIMAL(14, 2) NOT NULL,
   stockQuantity INT NOT NULL,
   PRIMARY KEY (id)
);

INSERT INTO inventory (itemName, storageLocation, price, stockQuantity)
VALUES 
("Well Tequila","Liquor Shelf",4.00,250),
("Well Bourbon", "Liquor Shelf",4.00,450),
("PBR","Beer Cooler",2.50,70),
("Pernicious IPA","Beer Cooler",7.50,135),
("Nicklepoint Dobblebock","Beer Cooler",6.50,85),
("San Pellegrino Blood Orange Soda","Bar Line Cooler",4.50,22),
("San Pellegrino Limonata Soda","Bar Line Cooler",4.50,13),
("House Red Wine","Liquor Shelf",6.00,56),
("House White Wine","Bar Line Cooler",6.00,47),
("House Prosecco","Bar Line Cooler",6.00,430);