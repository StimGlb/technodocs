<#
Parses `fb-config.md` for Firebase keys and writes a local `.env` file.
This script does not contain secret values itself — it reads them from `fb-config.md`.

Usage (PowerShell):
  .\scripts\import-firebase-config.ps1

Warning: Do NOT commit the generated `.env` file. Add it to `.gitignore` if needed.
#>

$input = Get-Content -Raw -Path "fb-config.md"

function Extract-Value($text, $key) {
    $pattern = "["']?${key}["']?\s*[:=]\s*[\"'](?<v>[^\"']+)[\"']"
    $m = [regex]::Match($text, $pattern)
    return if ($m.Success) { $m.Groups['v'].Value } else { '' }
}

$apiKey = Extract-Value $input "apiKey"
$authDomain = Extract-Value $input "authDomain"
$projectId = Extract-Value $input "projectId"
$storageBucket = Extract-Value $input "storageBucket"
$messagingSenderId = Extract-Value $input "messagingSenderId"
$appId = Extract-Value $input "appId"
$measurementId = Extract-Value $input "measurementId"

$envPath = ".env"

"# Generated from fb-config.md — do not commit" | Out-File -FilePath $envPath -Encoding utf8
"VITE_FIREBASE_API_KEY=$apiKey" | Out-File -FilePath $envPath -Encoding utf8 -Append
"VITE_FIREBASE_AUTH_DOMAIN=$authDomain" | Out-File -FilePath $envPath -Encoding utf8 -Append
"VITE_FIREBASE_PROJECT_ID=$projectId" | Out-File -FilePath $envPath -Encoding utf8 -Append
"VITE_FIREBASE_STORAGE_BUCKET=$storageBucket" | Out-File -FilePath $envPath -Encoding utf8 -Append
"VITE_FIREBASE_MESSAGING_SENDER_ID=$messagingSenderId" | Out-File -FilePath $envPath -Encoding utf8 -Append
"VITE_FIREBASE_APP_ID=$appId" | Out-File -FilePath $envPath -Encoding utf8 -Append
if ($measurementId) { "VITE_FIREBASE_MEASUREMENT_ID=$measurementId" | Out-File -FilePath $envPath -Encoding utf8 -Append }

Write-Host "Wrote $envPath (contains your Firebase keys). Do not commit this file."
