@echo off
SET PATH=C:\Program Files\nodejs;%PATH%
cd /d C:\Users\axela\Desktop\grandbassamfood
git add .
git commit -m "feat: initial site grandbassamfood"
git branch -M main
git remote add origin https://github.com/axake92/grandbassamfood.git
git push -u origin main
echo === PUSH TERMINE ===
