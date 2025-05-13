# 🚀 Projekt Neve

Ez egy [Laravel](https://laravel.com/) backend + [React](https://react.dev/) frontend alkalmazás, amely a [Vite](https://vitejs.dev/) fejlesztői szervert használja. A projekt célja: _rövid projektleírás itt_.

---

## ✅ Rendszerkövetelmények

- PHP 8.1 vagy újabb
- Composer
- Node.js 18.x vagy újabb
- npm (Node.js telepítéssel együtt jön)
- MySQL vagy más adatbázis (ha szükséges)
- Laravel 10.x
- Ajánlott: XAMPP / Laravel Valet / Docker a lokális környezethez

---

## ⚙️ Telepítés

```bash
# Kód klónozása
git clone https://github.com/felhasznalo/projekt.git
cd projekt

# Backend csomagok telepítése
composer install

# Frontend csomagok telepítése
npm install

# Környezeti fájl létrehozása
cp .env.example .env

# Laravel kulcs generálása
php artisan key:generate

# Adatbázis migrációk (ha szükséges)
php artisan migrate
