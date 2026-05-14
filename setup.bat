@echo off
SET PATH=C:\Program Files\nodejs;%PATH%
cd /d C:\Users\axela\Desktop\grandbassamfood
echo === node version ===
node --version
echo === npm version ===
npm --version
echo === npm install ===
npm install
echo === BUILD ===
npm run build
echo === GIT ===
git init
git add .
git commit -m "feat: initial site grandbassamfood.fr"
git branch -M main
echo DONE
