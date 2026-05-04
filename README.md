# 🚗 QuickWash — Car Washing Service Website

A fully responsive frontend capstone project built with **HTML**, **CSS**, and **JavaScript**.

---

## 📁 Project Structure

```
car-wash-website/
├── index.html          ← All page sections (Navbar, Hero, Services, Pricing, Footer, Modal)
├── styles/
│   └── main.css        ← All styles (variables, layout, animations, responsive)
├── scripts/
│   └── app.js          ← All interactivity (modal, form validation, toast, scroll animations)
├── images/             ← Place your car wash images here
└── README.md           ← This file
```

---

## ✅ Features

| Feature | How It's Built |
|---|---|
| Sticky Navbar | `position: sticky` + `backdrop-filter: blur()` |
| Hamburger Menu | CSS hides nav; JS toggles `.active` class |
| Hero Section | CSS gradient mesh + staggered `@keyframes fadeUp` |
| Services Grid | CSS `grid` with `auto-fit` + `minmax()` |
| Pricing Cards | CSS Grid + featured card highlight |
| Booking Modal | JS class toggle + CSS `display: flex` |
| Form Validation | Regex email check + `.error` class toggling |
| Fake Submission | `setTimeout()` simulates server delay |
| Toast Notification | CSS `transform` transition + JS class toggle |
| Scroll Animations | `IntersectionObserver` API |
| Fully Responsive | Media queries at `768px` breakpoint |

---

## 🚀 How to Run Locally

Just open `index.html` in your browser — no build tools needed.

```bash
# Option 1: Double-click index.html in your file explorer

# Option 2: Use VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

---

## 🌐 Deploy to GitHub Pages

1. Push this folder to a GitHub repository named `car-wash-website`
2. Go to **Settings → Pages**
3. Under **Source**, select `main` branch → `/root` folder
4. Click **Save**
5. Visit: `https://YOUR_USERNAME.github.io/car-wash-website`

---

## 🔧 Customisation

- **Colors** → Edit CSS variables in `:root {}` inside `styles/main.css`
- **Services / Prices** → Edit the `.service-card` and `.pricing-card` HTML in `index.html`
- **Contact Info** → Edit the `<footer>` section in `index.html`
- **Real backend** → Replace the `setTimeout` in `scripts/app.js` with a `fetch()` POST call

---

## 📚 Concepts Covered

- CSS Variables (Design Tokens)
- Flexbox & CSS Grid
- Mobile-First Media Queries
- CSS `@keyframes` Animations
- `IntersectionObserver` API
- DOM Manipulation (`querySelector`, `classList`, `addEventListener`)
- Form Validation with Regex
- `setTimeout` for async simulation
