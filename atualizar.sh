#!/bin/bash
git stash save --keep-index
git stash drop
git pull
if [$1 = '-n'] 
then 
	cd ~/completo/stremiodublado/
	npm i
	cd ~/completo/stremiobusca/
	npm i
fi; 
cp ~/completo/.bashrc ~/
cd ~/
sh .bashrc
