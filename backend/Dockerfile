FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    zip unzip git curl libzip-dev libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy app files
COPY . .

# Install PHP dependencies
RUN composer install

# Install Ledger CLI
RUN apt-get update && \
    apt-get install -y ledger && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*


EXPOSE 8000

# Start the Laravel dev server
CMD php artisan serve --host=0.0.0.0 --port=8000
