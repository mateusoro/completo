cd completo/stremiodublado
kill -9 `ps aux | grep node | grep -v grep`
kill -9 `ps aux | grep mysql | grep -v grep`
node novo.js & 
cd ..
cd stremiobusca 
#node index.js & 
cd ..
cd ..
#ssh -R stremiodublado:80:localhost:7000 serveo.net -o StrictHostKeyChecking=no &
#ssh -R stremiobusca:80:localhost:7001 serveo.net -o StrictHostKeyChecking=no &
sshd &
mysqld_safe -u root &
