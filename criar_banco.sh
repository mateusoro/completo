#!/bin/bash
cd ~/completo/stremiodublado/
mysql -u root
CREATE USER 'root2'@'localhost' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'root2'@'localhost' WITH GRANT OPTION;
CREATE USER 'root2'@'%' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'root2'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
DROP DATABASE IF EXISTS `registros`;
CREATE DATABASE IF NOT EXISTS `registros`;
DROP TABLE IF EXISTS `registros`.`registros`;
CREATE TABLE IF NOT EXISTS `registros`.`registros` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `imdb` text DEFAULT NULL,
  `magnet` text DEFAULT NULL,
  `mapa` text DEFAULT NULL,
  `nome` text DEFAULT NULL,
  `nome_imdb` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32286 DEFAULT CHARSET=latin1;
source modelo.sql;
exit;




