# Ipung Permadi — Portfolio

Website portofolio personal modern untuk **Ipung Permadi**, seorang *Music Director*.
Dibangun dengan HTML, CSS, dan JavaScript murni (tanpa framework) dengan tema
dark modern, animated gradient background, dan efek glassmorphism.

> _"Olah rasa dengan suara."_

## Fitur

- **Single-page scroll** dengan navbar yang melompat ke setiap bagian (smooth scroll).
- **Hero section** — badge "available for opportunities", typewriter effect, foto profil,
  tombol CTA (Lihat Project & Download Resume), animated particles + glowing gradient.
- **About** — biografi profesional, highlight pengalaman, dan statistik.
- **Projects** — 3 interactive card dengan hover overlay, tag teknologi, link GitHub, dan live demo.
- **Work Experience** — timeline pengalaman profesional.
- **Testimonials** — 3 testimoni dalam interactive card.
- **Contact** — form dengan validasi (nama, email, pesan), state success/error, dan embedded map.
- **Footer** — copyright, link navigasi, media sosial, dan tombol scroll ke atas.
- **Responsif** untuk mobile, tablet, dan desktop.
- Mendukung `prefers-reduced-motion` untuk aksesibilitas.

## Struktur Folder

```
PROJECT 1/
├── index.html          # Halaman utama (semua section)
├── readme.md
├── assets/
│   └── profile.png     # Foto profil
├── css/
│   └── style.css       # Seluruh styling
├── js/
│   └── main.js         # Seluruh interaksi
├── components/         # (disediakan untuk komponen reusable)
└── pages/              # (disediakan untuk halaman tambahan)
```

## Cara Menjalankan

Website ini statis — cukup buka `index.html` di browser.

Untuk pengalaman terbaik (agar embedded map dan asset dimuat tanpa batasan file://),
jalankan server lokal:

```bash
# Python 3
python -m http.server 5500

# atau Node.js
npx serve .
```

Lalu buka `http://localhost:5500`.

## Kustomisasi

- **Warna & tema**: ubah variabel CSS di bagian `:root` pada `css/style.css`.
- **Konten**: edit langsung di `index.html`.
- **Teks typewriter**: ubah array `phrases` di `js/main.js`.
- **Foto profil**: ganti `assets/profile.png`.

## Teknologi

- HTML5 semantik
- CSS3 (custom properties, grid, flexbox, backdrop-filter, keyframe animations)
- JavaScript (Canvas API, IntersectionObserver)
- Google Fonts: Space Grotesk & Inter

---

© Ipung Permadi. All rights reserved.
