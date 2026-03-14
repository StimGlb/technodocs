#!/bin/bash
# ─── Test rapide d'intégration Timer Pomodoro ───
# Usage: bash test-timer.sh

HTML="src/pages/outils/task-manager.html"
JS="src/js/task-manager.js"
PASS=0
FAIL=0

green() { echo -e "\033[32m  ✅ $1\033[0m"; (( PASS++ )) || true; }
red()   { echo -e "\033[31m  ❌ $1\033[0m"; (( FAIL++ )) || true; }
title() { echo -e "\n\033[1;36m── $1 ──\033[0m"; }

# ─── 1. Fichiers existent ───
title "Fichiers"
[ -f "$HTML" ] && green "HTML trouvé" || red "HTML manquant"
[ -f "$JS" ]   && green "JS trouvé"   || red "JS manquant"

# ─── 2. IDs HTML ↔ JS ───
title "Cohérence des IDs (JS getElementById → HTML id)"
for id in timerModal timerTaskTitle timerTaskSubject timerDisplay timerPhase timerInfo timerBtnStart timerBtnCancel; do
  grep -q "getElementById('$id')" "$JS" || { red "JS ne cherche pas #$id"; continue; }
  grep -q "id=\"$id\"" "$HTML"          && green "#$id" || red "#$id absent du HTML"
done

# ─── 3. Crash fixes ───
title "FIX #1 #2 - Pas de récursion infinie"
if grep -q "class PomodoroTimer" "$JS"; then
  # Vérifier que PomodoroTimer ne s'instancie pas lui-même
  # Extraire le bloc constructor de PomodoroTimer
  if sed -n '/class PomodoroTimer/,/^class /p' "$JS" | grep -q "new PomodoroTimer(this)"; then
    red "PomodoroTimer contient encore new PomodoroTimer(this)"
  else
    green "Pas de récursion dans PomodoroTimer"
  fi
else
  red "Classe PomodoroTimer introuvable"
fi

title "FIX #3 - PomodoroTimer créé dans TaskManager"
grep -q "this\.pomodoroTimer = new PomodoroTimer(this)" "$JS" && green "PomodoroTimer instancié dans TaskManager" || red "PomodoroTimer jamais instancié"

# ─── 4. CSS classes ───
title "Classes CSS définies dans HTML <style>"
for cls in timer-modal__icon timer-modal__subject timer-modal__phase phase-badge phase-badge--prep phase-badge--work phase-badge--done timer-modal__info btn-start; do
  grep -q "\.$cls" "$HTML" && green ".$cls" || red ".$cls manquante"
done

# ─── 5. FIX #4 - Mismatch icon ───
title "FIX #4 - Pas de .timer-modal__header .icon orphelin"
if grep -q "\.timer-modal__header \.icon" "$HTML"; then
  red "Ancien sélecteur .timer-modal__header .icon encore présent"
else
  green "Sélecteur corrigé en .timer-modal__icon"
fi

# ─── 6. FIX #6 - cleanup() dans open() ───
title "FIX #6 - cleanup() appelé dans open()"
if sed -n '/open(task)/,/^    }/p' "$JS" | grep -q "this\.cleanup()"; then
  green "open() appelle cleanup()"
else
  red "open() n'appelle pas cleanup()"
fi

# ─── 7. FIX #7 - Pas de double appendChild ───
title "FIX #7 - appendChild unique"
count=$(grep -c "actions\.appendChild(deleteBtn)" "$JS")
if [ "$count" -eq 1 ]; then
  green "Un seul appendChild(deleteBtn)"
else
  red "appendChild(deleteBtn) apparaît $count fois (attendu: 1)"
fi

# ─── 8. FIX #8 - keydownHandler stocké ───
title "FIX #8 - Listener keydown nettoyable"
grep -q "this\.keydownHandler" "$JS" && green "keydownHandler stocké" || red "keydownHandler non stocké"
grep -q "removeEventListener('keydown', this\.keydownHandler)" "$JS" && green "keydown retiré dans cleanup()" || red "keydown pas retiré"

# ─── 9. FIX #9 - Guard tâche supprimée ───
title "FIX #9 - Guard dans complete()"
if sed -n '/complete()/,/^    }/p' "$JS" | grep -q "tasks\.find"; then
  green "Guard tasks.find() présent dans complete()"
else
  red "Pas de guard dans complete()"
fi

# ─── 10. FIX #10 - classList pour animation ───
title "FIX #10 - Animation via classList"
grep -q "classList\.add('is-open')" "$JS"    && green "classList.add('is-open')" || red "classList.add manquant"
grep -q "classList\.remove('is-open')" "$JS" && green "classList.remove('is-open')" || red "classList.remove manquant"
grep -q "\.timer-modal\.is-open" "$HTML"     && green ".timer-modal.is-open en CSS" || red ".timer-modal.is-open manquant"

# ─── Résumé ───
echo -e "\n\033[1;37m════════════════════════════════\033[0m"
echo -e "\033[32m  ✅ $PASS passés\033[0m  \033[31m❌ $FAIL échoués\033[0m"
if [ "$FAIL" -eq 0 ]; then
  echo -e "\033[1;32m  🎉 Tous les tests passent !\033[0m"
else
  echo -e "\033[1;31m  ⚠️  $FAIL problème(s) à corriger\033[0m"
fi
echo -e "\033[1;37m════════════════════════════════\033[0m"
exit $FAIL
