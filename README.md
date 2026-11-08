# A Little Something for You 💌

> *A modern, animated, and romantic confession & proposal website built with HTML5, CSS3, and JavaScript.*

[![GitHub Pages](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-ff69b4?style=for-the-badge&logo=github)](https://rautvedant81-dev.github.io/little-something-for-you/)
[![Built with Love](https://img.shields.io/badge/Made%20with-Love%20%26%20Courage-e7a5b8?style=for-the-badge)](https://github.com/rautvedant81-dev)

---

## ✨ Features

- ✉️ **Interactive 3D Opening Envelope**: Realistic 3D origami envelope with an embossed wax heart seal. Clicking the envelope or button pops the seal, folds the flap in 3D, and smoothly slides the letter out with a gentle harp chime.
- 🌸 **Live 60fps Canvas Particle Engine**:
  - Translucent rose petals gently swaying and fluttering downward with natural wind physics.
  - Soft glowing bokeh fireflies pulsing in warm candlelight hues.
  - Interactive cursor & touch sparkle trail (drags a trail of stardust and hearts).
  - Tapping/clicking anywhere creates blooming heart ripples.
- 🔒 **"Keep It Private Until It's Permanent"**:
  - An animated, glowing privacy badge on the confession card.
  - Empathetic privacy reassurances integrated into the hero note, the question screen, and the shareable response.
- 💖 **Cosmic Story & Love Letter Visuals**:
  - Unfolded love letter stationery paper backdrop complete with ruled letter lines, authentic postage stamp, postmark cancellation, and fold creases.
  - Concentric expanding ripple rings radiating from the central heart.
  - Dual 3D planetary orbits rotating in opposite directions with sparkling satellite stars.
  - Realistic anatomical double-beat heartbeat animation.
  - Frosted glassmorphism story cards with quote accents.
- 🎨 **3D Interactive Tilt Confession Card**:
  - Dynamically tilts in 3D perspective following cursor movement.
  - Animated flowing iridescent gradient border.
  - Romantic calligraphy script (*Great Vibes*) for *"I like you. ♡"* with glowing text and a pulsing ruby heart.
- 🎵 **Atmospheric Music Player**:
  - Animated 4-bar soundwave equalizer jumping rhythmically when music is active.
  - Loops `music.mp3` with smooth volume control.
  - Includes a Web Audio API ambient synthesizer fallback to guarantee music always plays even if browser autoplay policies block media files.
- 🎉 **Full-Screen Confetti Celebration**:
  - Clicking *"Yes, let's see ♡"* unleashes a celebratory shower of 160+ hearts, gold ribbons, and stardust across the entire screen with a celebration chime.
  - **Share / Copy Answer** button with pre-filled message and an animated toast notification.
- 🏷️ **Custom URL Personalization**:
  - Append `?to=HerName` or `?name=HerName` to the website URL (e.g., `https://rautvedant81-dev.github.io/little-something-for-you/?to=Ananya`).
  - Automatically updates the note header, letterhead, and question with her name!
  - Defaults to *"you"* if no parameter is provided.
- 📱 **100% Responsive & Accessible**:
  - Handcrafted for flawless performance across mobile phones, tablets, and desktop screens.
  - Full support for `prefers-reduced-motion`.

---

## 📖 The 8-Step Story Journey

| Step | Page / Section | Description |
| :---: | :--- | :--- |
| **1** | **Upgrade Welcome Page** | 3D interactive envelope with wax seal, letter peek, and gentle opening chime |
| **2** | **Build First-Time Page** | *01 — The First Glance*: The unforgettable moment she was first seen at college |
| **3** | **Build Feelings Page** | *02 — How Feelings Grew*: When little glances started to mean more; concentric heartbeats |
| **4** | **Build Confession Page** | *03 — From the Heart*: 3D tilt card, cursive *"I like you"*, and *"Keep it private until it's permanent"* |
| **5** | **Build Proposal Page** | *04 — The Question*: *"Would you like to get to know me?"* with 3 thoughtful answers |
| **6** | **Add Response Pages** | Distinct emotional states for *Yes* (celebration), *Need Time*, and *Respectful No* |
| **7** | **Animations & Polish** | 60fps canvas petals, glowing bokeh, cursor trails, and soundwave equalizer |
| **8** | **Deploy on GitHub Pages** | Instant worldwide deployment with custom URL support |

---

## 📂 Project Structure

```text
little-something-for-you/
├── index.html        # Clean semantic markup, 3D envelope, and 5 chapters
├── style.css         # Modern styling, glassmorphism, 3D transforms, keyframe animations
├── script.js         # Canvas particle engine, screen flow, audio synthesis, confetti
├── music.mp3         # Background audio track
├── .gitignore        # Git ignore rules
└── README.md         # Documentation & setup guide
```

---

## 🚀 Running Locally

1. Clone or download this repository:
   ```bash
   git clone https://github.com/rautvedant81-dev/little-something-for-you.git
   cd little-something-for-you
   ```
2. Open `index.html` in your browser, or use VS Code's **Live Server** extension (right-click `index.html` → **Open with Live Server**).

---

## 💌 Personalizing the Message

You can personalize the text by editing `index.html`:

- **Section 01 (`#story`)**: Your first-glance story or how you first met.
- **Section 02 (`#confession`)**: Your personal feelings and words from the heart.
- **Section 03 (`#question`)**: The question you'd like to ask.
- **URL Parameter**: Send the link as `https://your-url.com/?to=HerName` for automatic name insertion!

---

## 🌐 Publishing to GitHub Pages

To publish your website for free with a public link:

1. Create a new repository named `little-something-for-you` on your GitHub account ([github.com/new](https://github.com/new)).
2. Push this project to GitHub:
   ```bash
   git add .
   git commit -m "feat: romantic proposal website with 3D envelope and animations"
   git remote add origin https://github.com/rautvedant81-dev/little-something-for-you.git
   git push -u origin main
   ```
3. In your GitHub repository:
   - Go to **Settings** → **Pages** (in the left sidebar).
   - Under **Build and deployment** > **Branch**, select `main` and folder `/ (root)`.
   - Click **Save**.
4. In about 1–2 minutes, your website will be live at:
   ```
   https://rautvedant81-dev.github.io/little-something-for-you/
   ```

---

## 🕊️ A Gentle Reminder

This website is meant to be a sweet, creative way to express honest feelings with zero pressure. Whatever response is given, always respect it with kindness and grace. Keep it private until it's permanent. ♡

---

*Made with courage and care by [rautvedant81-dev](https://github.com/rautvedant81-dev).*
