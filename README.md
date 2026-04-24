# skokul.github.io

Personal portfolio and resume site for Kokul Shanmugam. The repository contains a static landing page, a resume page, and a small Tailwind build pipeline for styling.

## What is included

- `index.html` - portfolio homepage with hero, impact, frameworks, case studies, experience, skills, and contact sections.
- `resume.html` - printable resume page.
- `assets/css/` - Tailwind source and compiled CSS plus resume-specific styles.
- `assets/js/` - page behavior split into small modules for navigation, accordions, scroll reveal, timelines, and toggles.
- `styles.css` - additional site styling layered on top of Tailwind.

## Development

Install dependencies:

```bash
npm install
```

Rebuild the Tailwind stylesheet after changing classes or layout:

```bash
npm run build:css
```

Open `index.html` directly in a browser, or serve the folder with any static file server if you want local navigation and asset loading behavior.

## Project structure

```text
.
|-- index.html
|-- resume.html
|-- styles.css
|-- tailwind.config.js
`-- assets
    |-- css
    |   |-- resume.css
    |   |-- tailwind.input.css
    |   `-- tailwind.css
    `-- js
        |-- main.js
        |-- lib
        `-- modules
```

## Maintenance

- If you update site content, layout, scripts, or styling in this folder, update this README in the same change.
- Keep `assets/css/tailwind.css` in sync with `assets/css/tailwind.input.css` and the HTML files by running the Tailwind build script.
