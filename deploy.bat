@echo off
REM Script de déploiement automatique pour TechnoDocs
REM Ce script commit et push automatiquement la branche main

echo ========================================
echo   TechnoDocs - Script de Deploiement
echo ========================================
echo.

REM Vérifier qu'on est sur la branche main
echo [1/5] Verification de la branche...
git branch --show-current > temp.txt
set /p CURRENT_BRANCH=<temp.txt
del temp.txt

if not "%CURRENT_BRANCH%"=="main" (
    echo ERREUR: Vous n'etes pas sur la branche main!
    echo Branche actuelle: %CURRENT_BRANCH%
    echo Veuillez basculer sur main avec: git checkout main
    pause
    exit /b 1
)
echo ✓ Vous etes sur la branche main
echo.

REM Vérifier s'il y a des modifications
echo [2/5] Verification des modifications...
git status --porcelain > temp.txt
set /p HAS_CHANGES=<temp.txt
del temp.txt

if "%HAS_CHANGES%"=="" (
    echo ERREUR: Aucune modification a committer!
    echo Le repertoire de travail est propre.
    pause
    exit /b 1
)
echo ✓ Modifications detectees
echo.

REM Afficher les modifications
echo [3/5] Fichiers modifies:
git status --short
echo.

REM Demander un message de commit
set /p COMMIT_MSG="Entrez le message de commit (ou appuyez sur Entree pour un message par defaut): "
if "%COMMIT_MSG%"=="" (
    set COMMIT_MSG=Update flashcards content
)
echo.

REM Ajouter tous les fichiers
echo [4/5] Ajout des fichiers...
git add .
if errorlevel 1 (
    echo ERREUR: Impossible d'ajouter les fichiers
    pause
    exit /b 1
)
echo ✓ Fichiers ajoutes
echo.

REM Créer le commit
echo [5/5] Creation du commit...
git commit -m "%COMMIT_MSG%"
if errorlevel 1 (
    echo ERREUR: Impossible de creer le commit
    pause
    exit /b 1
)
echo ✓ Commit cree avec succes
echo.

REM Pousser vers le remote
echo Push vers origin/main...
git push origin main
if errorlevel 1 (
    echo ERREUR: Impossible de pusher vers origin/main
    echo Verifiez votre connexion internet et vos permissions
    pause
    exit /b 1
)

echo.
echo ========================================
echo   ✓ DEPLOIEMENT TERMINE AVEC SUCCES!
echo ========================================
echo.
echo Les modifications ont ete commitees et deployees.
echo Votre site devrait etre mis a jour automatiquement.
echo.
pause
