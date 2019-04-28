#!/bin/bash
git stash save --keep-index
git stash drop
git pull
cp /data/data/com.termux/files/home/completo/.bashrc /data/data/com.termux/files/home/
cd /data/data/com.termux/files/home/
sh .bashrc

