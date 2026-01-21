@echo off
REM Script d'automatisation de commit pour TechnoDocs
REM Usage: commit.bat "Votre message de commit"

echo.
echo ========================================
echo   TechnoDocs - Commit automatique
echo ========================================
echo.

REM Vérifier si un message a été fourni
if "%~1"=="" (
    echo [ERREUR] Aucun message de commit fourni.
    echo Usage: commit.bat "Votre message de commit"
    echo.
    pause
    exit /b 1
)

REM Afficher le statut Git
echo [1/4] Statut Git actuel:
echo ----------------------------------------
git status --short
echo.

REM Demander confirmation
echo Message de commit: %~1
echo.
set /p confirm="Continuer avec ce commit ? (o/N): "
if /i not "%confirm%"=="o" (
    echo Commit annule.
    pause
    exit /b 0
)

echo.
echo [2/4] Ajout des fichiers modifies...
git add .

echo [3/4] Creation du commit...
git commit -m "%~1"

if errorlevel 1 (
    echo.
    echo [ERREUR] Echec du commit.
    pause
    exit /b 1
)

echo [4/4] Envoi vers GitHub...
git push

if errorlevel 1 (
    echo.
    echo [ERREUR] Echec du push.
    echo Verifiez votre connexion et vos droits d'acces.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Commit et push reussis !
echo ========================================
echo.
pause
