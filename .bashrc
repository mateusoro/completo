node completo/stremiodublado/index.js & 
cd completo/stremiobusca 
node index.js & 
cd ..
cd ..
ssh -R stremiodublado:80:localhost:7000 serveo.net -o StrictHostKeyChecking=no &
ssh -R stremiobusca:80:localhost:7001 serveo.net -o StrictHostKeyChecking=no &
