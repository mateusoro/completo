#!/bin/bash
kill -9 `ps aux | grep node | grep -v grep | awk '{print $1}'`
kill -9 `ps aux | grep mysql | grep -v grep| awk '{print $1}'`
kill -9 `ps aux | grep stremiobusca | grep -v grep| awk '{print $1}'`
kill -9 `ps aux | grep stremiodublado | grep -v grep| awk '{print $1}'`
cd /data/data/com.termux/files/home/completo/stremiodublado
node novo.js & 
cd /data/data/com.termux/files/home/completo/stremiobusca 
node index.js & 
cd /data/data/com.termux/files/home/completo
mysqld_safe -u root &
sshd &
ssh -R stremiobusca:80:localhost:7001 serveo.net -o StrictHostKeyChecking=no &
ssh -R stremiodublado:80:localhost:7005 serveo.net -o StrictHostKeyChecking=no &
export SSHPASS=root
#sshpass -e ssh -L 443:127.0.0.1:7000 root@localhost -p 8022
#am start -n com.stremio/.MainActivity

