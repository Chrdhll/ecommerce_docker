# ============================================
# Cart Service (Laravel Lumen) - Dockerfile
# ============================================
FROM php:8.2-cli

# System dependencies
RUN apt-get update && apt-get install -y \
    git unzip zip libzip-dev libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo pdo_mysql \
    && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Working dir di dalam container
WORKDIR /var/www

# 1) Generate project Lumen di /var/www/src
RUN composer create-project --prefer-dist laravel/lumen:^10.0 src

# Pindah ke folder lumen
WORKDIR /var/www/src

# 2) Copy .env
COPY .env .env

# 3) Copy routes
COPY src/routes/web.php routes/web.php

# Expose port
EXPOSE 8000

# Jalankan Lumen
CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]
