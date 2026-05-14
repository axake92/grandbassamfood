@echo off
SET PATH=C:\Program Files\nodejs;%PATH%
cd /d C:\Users\axela\Desktop\grandbassamfood
git add .
git commit -m "test: verification formulaire devis Netlify Forms"
git push
echo === DEPLOY DECLENCHE ===
