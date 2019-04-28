#!/bin/bash
apt update
apt install mariadb
mysql_install_db
mysqld_safe -u root 

