#!/bin/bash
git stash save --keep-index
git stash drop
git pull
echo $1
if [$1 = 'npm'] 
then 
	cd ~/completo/stremiodublado/
	npm i
	cd ~/completo/stremiobusca/
	npm i
fi; 
cp ~/completo/.bashrc ~/
cd ~/
sh .bashrc
