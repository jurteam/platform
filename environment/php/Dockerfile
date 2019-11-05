FROM php:7.2-fpm
# lumen packages
RUN apt-get update && \
    apt-get install -y libsodium-dev
RUN docker-php-ext-install mbstring tokenizer mysqli pdo_mysql sodium exif

# PHP (FPM)
RUN sed -i 's|;date.timezone =|date.timezone = "Europe/Paris"|g' /etc/php/7.2/fpm/php.ini
RUN sed -i 's|memory_limit = 128M|memory_limit = 256M|g' /etc/php/7.2/fpm/php.ini
RUN sed -i 's|upload_max_filesize = 2M|upload_max_filesize = 32M|g' /etc/php/7.2/fpm/php.ini
RUN sed -i 's|post_max_size = 8M|post_max_size = 128M|g' /etc/php/7.2/fpm/php.ini

# memcached libs
RUN apt-get update && apt-get install -y libz-dev libmemcached-dev
RUN pecl install memcached
RUN echo extension=memcached.so >> /usr/local/etc/php/conf.d/memcached.ini

# composer
RUN apt-get update && \
    apt-get install -y zip unzip

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# symlinks
# RUN cd /var/www/html/app && php artisan storage:link

# Add user for laravel application
RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www

# Copy existing application directory contents
# COPY . /var/www

# Copy existing application directory permissions
COPY --chown=www:www . /var/www

# Change current user to www
USER www

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]