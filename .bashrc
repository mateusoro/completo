#!/bin/bash
kill -9 `ps aux | grep node | grep -v grep`
kill -9 `ps aux | grep mysql | grep -v grep`
cd ~/completo/stremiodublado
node novo.js & 
cd ~/completo/stremiobusca 
#node index.js & 
cd ~/completo
mysqld_safe -u root &
sshd &
