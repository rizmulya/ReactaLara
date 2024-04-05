# ReactaLara

![reactalaralogo](https://github.com/rizmulya/ReactaLara/assets/122626344/3a36ccfb-50e4-44e1-a758-63a3fe740895)

## React + Laravel + Inertia

[React](https://react.dev/) 18 + [Laravel](https://laravel.com/) 11 + [Inertia](https://inertiajs.com/) Starter Stack with :

-   Laravel Breeze Authentication
-   Multi-Role Authorization
-   Example CRUD Operations
-   Example Image CRUD
-   Pagination Support
-   Search Functionality
-   Encryption of All IDs in URLs
-   Reusable Code
-   Single page
-   [SSR Support](https://inertiajs.com/server-side-rendering)
-   Tailwind styling


installation 
```
git clone https://github.com/rizmulya/reactalara.git \
    && cd reactalara \
    && npm install \
    && composer install 
```
set `.env` and `crytojs_key`

```
php artisan key:generate \
    && php artisan migrate:fresh --seed 
```

run with :
`npm run dev`
`php artisan serve`