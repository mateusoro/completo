#!/bin/bash
git stash save --keep-index
git stash drop
git pull
cp ~/completo/.bashrc ~/
cd ~/
sh .bashrc
