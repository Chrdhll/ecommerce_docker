FROM php:8.2-cli

# Install dependencies
RUN apt-get update && apt-get install -y \
    git unzip libzip-dev libonig-dev default-mysql-client \
    && docker-php-ext-install pdo pdo_mysql zip mbstring

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory (harus sama dengan target volume di docker-compose)
WORKDIR /var/www/html 

CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"]