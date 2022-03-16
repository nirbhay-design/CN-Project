#!/bin/bash

git pull
git add .

echo "enter msg to commit"

read msg

git commit -m "$msg"
git push -u origin master
