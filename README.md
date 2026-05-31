# Djinn Web

Djinn Web is the visual interface for the Djinn design system.

It allows developers to browse, preview, and inspect components from the Djinn registry in a Figma-like environment.

---

## Purpose

Djinn Web is NOT a UI builder.

It is a **visual registry explorer** for Django UI components.

---

## Features

* Component browser (registry-driven)
* Live preview canvas
* Variant inspector
* Code viewer (Django templates + JSON)
* Dark cyber-noir interface

---

## Data Source

All components are loaded from:

👉 djinn-registry GitHub repository

---

## Architecture

```text
Registry → djinn-web → Visual Preview
```

---

## Tech Stack

* Next.js
* TailwindCSS
* Radix UI
* Framer Motion

---

## Roadmap

* CLI integration (live sync)
* AI component generator
* Editable canvas
* Component marketplace
