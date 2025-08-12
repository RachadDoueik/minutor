# Stage 1: Build stage with Composer and Node (if you use frontend tools)
FROM php:8.2-fpm AS build

# Install system dependencies for PHP and Composer
RUN apt-get update && apt-get install -y \
    git curl zip unzip libpng-dev libonig-dev libxml2-dev libzip-dev libpq-dev \
    npm \
    && docker-php-ext-install pdo_pgsql mbstring exif pcntl bcmath gd zip

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy project files
COPY . .

# Install PHP dependencies without dev packages and optimize autoloader
RUN composer install --no-dev --optimize-autoloader

# Build frontend assets
RUN npm install && npm run build

# Stage 2: Production image with PHP and Nginx
FROM php:8.2-fpm

# Install PHP extensions needed by Laravel
RUN apt-get update && apt-get install -y \
    libpng-dev libonig-dev libxml2-dev libzip-dev libpq-dev nginx \
    && docker-php-ext-install pdo_pgsql mbstring exif pcntl bcmath gd zip

# Copy PHP code and vendor from build stage
COPY --from=build /var/www /var/www

# Copy nginx config
COPY ./docker/nginx.conf /etc/nginx/sites-available/default

# Set working directory
WORKDIR /var/www

# Set permissions for storage and cache
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Create entrypoint script that handles migrations and startup
RUN echo '#!/bin/bash' > /entrypoint.sh && \
    echo 'set -e' >> /entrypoint.sh && \
    echo '' >> /entrypoint.sh && \
    echo 'echo "Starting Laravel application..."' >> /entrypoint.sh && \
    echo 'cd /var/www' >> /entrypoint.sh && \
    echo '' >> /entrypoint.sh && \
    echo '# Debug environment' >> /entrypoint.sh && \
    echo 'echo "Current directory: $(pwd)"' >> /entrypoint.sh && \
    echo 'echo "Checking .env file:"' >> /entrypoint.sh && \
    echo 'ls -la .env* || echo "No .env files found"' >> /entrypoint.sh && \
    echo 'echo "DB Config from Laravel:"' >> /entrypoint.sh && \
    echo 'php artisan env || echo "env command failed"' >> /entrypoint.sh && \
    echo '' >> /entrypoint.sh && \
    echo '# Wait for database to be ready' >> /entrypoint.sh && \
    echo 'echo "Waiting for database connection..."' >> /entrypoint.sh && \
    echo 'attempt=0' >> /entrypoint.sh && \
    echo 'max_attempts=30' >> /entrypoint.sh && \
    echo 'until php artisan migrate:status 2>&1; do' >> /entrypoint.sh && \
    echo '    attempt=$((attempt + 1))' >> /entrypoint.sh && \
    echo '    if [ $attempt -ge $max_attempts ]; then' >> /entrypoint.sh && \
    echo '        echo "Database connection failed after $max_attempts attempts"' >> /entrypoint.sh && \
    echo '        echo "Final attempt with full error output:"' >> /entrypoint.sh && \
    echo '        php artisan migrate:status' >> /entrypoint.sh && \
    echo '        exit 1' >> /entrypoint.sh && \
    echo '    fi' >> /entrypoint.sh && \
    echo '    echo "Database not ready, waiting 5 seconds... (attempt $attempt/$max_attempts)"' >> /entrypoint.sh && \
    echo '    sleep 5' >> /entrypoint.sh && \
    echo 'done' >> /entrypoint.sh && \
    echo '' >> /entrypoint.sh && \
    echo 'echo "Database connected successfully!"' >> /entrypoint.sh && \
    echo '' >> /entrypoint.sh && \
    echo '# Run migrations' >> /entrypoint.sh && \
    echo 'echo "Running migrations..."' >> /entrypoint.sh && \
    echo 'php artisan migrate --force' >> /entrypoint.sh && \
    echo '' >> /entrypoint.sh && \
    echo '# Generate application key if not set' >> /entrypoint.sh && \
    echo 'if [ -z "$APP_KEY" ]; then' >> /entrypoint.sh && \
    echo '    echo "Generating application key..."' >> /entrypoint.sh && \
    echo '    php artisan key:generate --force' >> /entrypoint.sh && \
    echo 'fi' >> /entrypoint.sh && \
    echo '' >> /entrypoint.sh && \
    echo '# Optimize Laravel for production' >> /entrypoint.sh && \
    echo 'echo "Optimizing Laravel..."' >> /entrypoint.sh && \
    echo 'php artisan config:cache' >> /entrypoint.sh && \
    echo 'php artisan route:cache' >> /entrypoint.sh && \
    echo 'php artisan view:cache' >> /entrypoint.sh && \
    echo '' >> /entrypoint.sh && \
    echo 'echo "Starting services..."' >> /entrypoint.sh && \
    echo 'service nginx start' >> /entrypoint.sh && \
    echo 'php-fpm' >> /entrypoint.sh

RUN chmod +x /entrypoint.sh

# Expose port 80
EXPOSE 80

# Use entrypoint script instead of CMD
ENTRYPOINT ["/entrypoint.sh"]
