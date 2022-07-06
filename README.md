# Vue Laravel Breeze

## Introduction

This repository is an implementation of the Laravel Breeze application / authentication starter kit frontend in Vue.js. All of the authentication boilerplate is already written for you - powered by Laravel Sanctum, allowing you to quickly begin pairing your beautiful Vue.js frontend with a powerful Laravel backend.

This repository is heavily inspired by [Laravel Breeze - Next.js Edition](https://github.com/laravel/breeze-next).

### Installation

First, create a Vue.js compatible Laravel backend by installing Laravel Breeze into a [fresh Laravel application](https://laravel.com/docs/installation) and installing Breeze's API scaffolding:

```bash
# Create the Laravel application...
laravel new next-backend
cd next-backend
# Install Breeze and dependencies...
composer require laravel/breeze
php artisan breeze:install api
```

> Note: You can also scaffold a laravel project with Laravel Sail following the official documentation.

Next, ensure that your application's `APP_URL` and `FRONTEND_URL` environment variables are set to `http://localhost:8000` and `http://localhost:3000`, respectively.

> Note: If you selected Laravel Sail then APP_URL should be `http://localhost`.

After defining the appropriate environment variables, you may serve the Laravel application using the `serve` Artisan command:

```bash
# Serve the application...
php artisan serve
```

Next, clone this repository and install its dependencies with `yarn install` or `npm install`. Then, copy the `.env.example` file to `.env.development.local` and supply the URL of your backend:

```
VITE_PUBLIC_BACKEND_URL=http://localhost:8000
```

> Note: If you selected Laravel Sail then VITE_PUBLIC_BACKEND_URL should be `http://localhost`.

Finally, run the application via `npm run dev`. The application will be available at `http://localhost:3000`:

```
npm run dev
```
