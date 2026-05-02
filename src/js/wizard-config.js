// Centralized wizard configuration
// Password is stored as a salted SHA-256 hash — never store the plaintext here.
// To change the password: run the following in Node and replace PASSWORD_HASH:
//   node -e "const c=require('crypto');console.log(c.createHash('sha256').update('technodocs-2026'+YOUR_PASSWORD).digest('hex'))"

const SALT = "technodocs-2026";
const PASSWORD_HASH =
  "2b6518114ca83afd195618e53e540b7f5299b12f96fdac74db40c6a9a2c9f7f6";

/**
 * Vérifie si le mot de passe saisi correspond au hash stocké.
 * Utilise l'API Web Crypto (SHA-256) — aucune dépendance externe.
 * @param {string} input - Le mot de passe saisi par l'utilisateur
 * @returns {Promise<boolean>}
 */
export async function checkPasswordHash(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(SALT + input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex === PASSWORD_HASH;
}
