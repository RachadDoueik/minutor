# Stage 1: Build stage with Composer and Node (if you use frontend tools)
FROM php:8.2-fpm AS build

# Install system dependencies for PHP and Composer
RUN apt-get update && apt-get install -y \
    git curl zip unzip libpng-dev libonig-dev libxml2-dev libzip-dev \
    npm \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy project files
COPY . .

# Install PHP dependencies without dev packages and optimize autoloader
RUN composer install --no-dev --optimize-autoloader

# (Optional) If you use frontend assets like Laravel Mix, run:
# RUN npm install && npm run prod

# Stage 2: Production image with PHP and Nginx
FROM php:8.2-fpm

# Install PHP extensions needed by Laravel
RUN apt-get update && apt-get install -y \
    libpng-dev libonig-dev libxml2-dev libzip-dev nginx \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Copy PHP code and vendor from build stage
COPY --from=build /var/www /var/www

# Copy nginx config
COPY ./docker/nginx.conf /etc/nginx/sites-available/default

# Set permissions for storage and cache
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

WORKDIR /var/www

# Expose port 80
EXPOSE 80

# Start php-fpm and nginx when container launches
CMD service nginx start && php-fpm
