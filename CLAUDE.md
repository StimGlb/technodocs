# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TechnoDocs is a standalone educational flashcard web application for teaching about "Indice de Réparabilité" (Repairability Index) in French. The project is designed for middle school Technology education and contains 50 interactive flashcards covering concepts of repairability, environmental responsibility, and product diagnostics.

## Architecture

This is a **single-file application** (`index.html`) with no build process or dependencies:
- All HTML, CSS, and JavaScript are embedded in one file
- Pure vanilla JavaScript (no frameworks)
- Client-side only (no backend required)
- Deployed as a static site

### Key Technical Components

**Data Structure** (index.html:525-576):
- Flashcard data stored in `flashcardsData` array with `q` (question) and `a` (answer) properties
- All 50 flashcards are hardcoded in the JavaScript section

**Application State** (index.html:578-583):
- `cards`: Complete set of flashcards
- `filteredCards`: Currently displayed subset based on search
- `currentIndex`: Active card in single-card mode
- `singleMode`: Boolean toggling between grid and single-card views
- `allFlipped`: Tracks global flip state

**Core Features**:
1. **Dual Display Modes**: Grid view (all cards) vs single-card view with navigation
2. **3D Card Flip Animation**: CSS `transform-style: preserve-3d` with 180° rotation
3. **Search Functionality**: Real-time filtering across questions and answers
4. **Shuffle**: Fisher-Yates algorithm implementation
5. **Keyboard Navigation**: Arrow keys and spacebar/enter in single-card mode

## Development

### Running Locally

Simply open `index.html` in any modern web browser:
```bash
# Option 1: Direct file open
start index.html  # Windows
open index.html   # macOS
xdg-open index.html  # Linux

# Option 2: Local server (if needed for testing)
python -m http.server 8000
# Then visit http://localhost:8000
```

### Deployment

This repository is configured for static site deployment. The site can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

No build step required - just serve `index.html`.

## Code Organization

Since this is a single-file application, key sections are organized as follows:

- **Lines 11-477**: CSS styling with custom properties for theming
- **Lines 482-521**: HTML structure with semantic sections
- **Lines 525-576**: Flashcard content data (50 Q&A pairs)
- **Lines 578-747**: JavaScript application logic

### Styling System

Uses CSS custom properties (index.html:11-23) for consistent theming:
- Dark theme with green accent colors
- `--accent-green`: Primary interactions
- `--accent-lime`: Highlights and emphasis
- `--accent-teal`: Secondary accents

### Animation Approach

- Card appearance: `cardAppear` animation with staggered delays
- Card flip: 3D transform with `transform-style: preserve-3d`
- Backface visibility handled to show correct card face
- Grid mode applies incremental animation delays (0.05s per card)

## Modification Guidelines

### Adding/Editing Flashcards

Modify the `flashcardsData` array (index.html:525-576). Each entry requires:
```javascript
{ q: "Question text?", a: "Answer text." }
```

After adding cards, update the hardcoded total in HTML (index.html:499, 500, 513).

### Changing Language

The application is in French. To translate:
1. Update flashcard content in `flashcardsData`
2. Change UI labels in HTML structure (lines 482-521)
3. Update button text in JavaScript (lines 699, etc.)
4. Modify footer text (line 519)

### Styling Changes

All visual customization should be done through CSS custom properties (`:root` section) to maintain consistency across the application.

### Adding Features

Since there's no build system or module bundler:
- Keep all code in the single HTML file
- Use vanilla JavaScript (no dependencies)
- Test across major browsers for compatibility
- Maintain the standalone nature of the application
