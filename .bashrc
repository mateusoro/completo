#!/bin/bash
kill -9 `ps aux | grep node | grep -v grep | awk '{print $1}'`
kill -9 `ps aux | grep mysql | grep -v grep| awk '{print $1}'`
cd ~/completo/stremiodublado
node novo.js & 
cd ~/completo/stremiobusca 
#node index.js & 
cd ~/completo
mysqld_safe -u root &
sshd &
am start --user 0 -a android.intent.action.VIEW -d http://127.0.0.1:7000
