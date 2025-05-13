# CsocsoWeb

Ez egy [Laravel](https://laravel.com/) backend + [React](https://react.dev/) frontend alkalmazás, amely a [Vite](https://vitejs.dev/) fejlesztői szervert használja. A projekt célja: Egy weboldal a Viharsarki Csocso Egyesületnek, amiben kezelni lehet a versenyek kiírását és a nevezéseket.

---

## ✅ Rendszerkövetelmények

- PHP 8.1 vagy újabb
- Composer
- Node.js 18.x vagy újabb
- MySQL
- Laravel 10.x
- XAMPP

---

## ⚙️ Telepítés

```bash
# Kód klónozása
git clone https://github.com/medve-g/CsocsoWeb.git
cd .\CsocsoWeb\

# Backend csomagok telepítése (php.ini módosítása a dokumentációban)
cd .\CsocsoBackend\
composer install

# Adatbázis létrehozása
php artisan migrate
php artisan db:seed

# Backend futtatása
php artisan serve

# Frontend csomagok telepítése
cd .\CsocsoFrontend\
npm install

# Frontend futtatása
npm run dev
# http://localhost:5173/




