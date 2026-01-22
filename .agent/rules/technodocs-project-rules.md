---
trigger: always_on
---

# TechnoDocs Project Rules - 2026 Standards

## Core Philosophy
- **Vanilla Only**: Strict Vanilla JS (ES6+). No frameworks (React, Vue, etc.) or heavy libraries. Use native Browser APIs (Fetch, Intersection Observer).
- **Architecture**: Modular components loaded via fetch. Main structural changes must happen in `dist/includes/header.html` or `footer.html`.

## Security (Critical - Ref: resume.md)
- **Anti-XSS**: NEVER use `innerHTML`. Use `document.createElement()`, `textContent`, and `appendChild`.
- **Validation**: Always validate HTTP responses with `if (!response.ok)`.
- **Environment**: Keep console logs only for `localhost`. Use generic error messages for production.
- **CSP Compliance**: Ensure all new scripts or styles respect the strict CSP defined in `netlify.toml`.

## Netlify & Build Optimization
- **Build Credits**: Group modifications to save Netlify build minutes (Current usage: 240/300).
- **Deployment**: Check `netlify.toml` headers (HSTS, CSP, Permissions-Policy) before suggesting network-related changes.

## Educational Quality
- **Naming**: Use descriptive English for variables/functions (pedagogical clarity).
- **Accessibility**: Include `aria-label` for all interactive elements and icons.
- **Content**: Align with French "Cycle 4" Technology curriculum (Robotics, 3D Design, Networks).

## Git Workflow
- **Branch**: Currently working on `ag-security-dev`.
- **Commits**: Follow the project's commit scripts (e.g., `npm run commit`).