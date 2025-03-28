#!/bin/sh
git config --global user.name "JoyOffere"
git config --global user.email "j.offere@alustudent.com"
git add .
git commit -m "Update from container: $(date)"
git push https://${GIT_PAT}@github.com/JoyOffere/Formative-Project-Product-Catalog-API.git main