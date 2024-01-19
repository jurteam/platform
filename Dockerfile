FROM ubuntu:18.04

ARG DEBIAN_FRONTEND=noninteractive
# 1. nginx + php install
RUN apt update  && \
    apt install -y ufw curl zip unzip nano systemd php-fpm php-mysql php-mbstring php-xml php-cli php-zip php-xmlrpc php-soap php-curl php-gd nginx
    # apt-get -y -t bionic-backports

# 3. virtual host setup
RUN mkdir -p /var/www/html/app && \
    chown -R $USER:$USER /var/www/html && \
    chmod -R 755 /var/www/html && \
    chown -R $USER:$USER /var/www && \
    mkdir -p /var/www/html/storage/logs && \
    mkdir -p /var/www/html/storage/framework && \
    mkdir -p /var/www/html/bootstrap/cache

    # echo "--- JUR ---" > /var/www/html/index.html && \


# 5. copy be app config files
ADD rest/app /var/www/html/app
ADD rest/artisan /var/www/html/artisan
ADD rest/bootstrap /var/www/html/bootstrap
ADD rest/composer.json /var/www/html/composer.json
ADD rest/config /var/www/html/config
ADD rest/database /var/www/html/database
ADD rest/resources /var/www/html/resources
ADD rest/routes /var/www/html/routes
ADD rest/storage /var/www/html/storage
ADD rest/tests /var/www/html/tests
# ADD rest/vendor /var/www/html/vendor

# 6. copy fe app config files
# ADD build /var/www/html/public

# 7. copy BE public file
ADD rest/public/index.php /var/www/html/public/index.php
ADD rest/public/ /var/www/html/public/

# 8. install composer and launch it into root folder
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN (cd /var/www/html/;composer install)

# Nginx config
ADD environment/nginx/nginx.conf /etc/nginx/sites-available/default

# PHP (FPM)
ADD environment/php/php.ini /etc/php/7.2/fpm/php.ini
# RUN sed -i 's|;date.timezone =|date.timezone = "Europe/Paris"|g' /etc/php/7.2/fpm/php.ini
# RUN sed -i 's|memory_limit = 128M|memory_limit = 256M|g' /etc/php/7.2/fpm/php.ini
# RUN sed -i 's|upload_max_filesize = 2M|upload_max_filesize = 32M|g' /etc/php/7.2/fpm/php.ini
# RUN sed -i 's|post_max_size = 8M|post_max_size = 128M|g' /etc/php/7.2/fpm/php.ini

# App config
ADD environment/app/.env /var/www/html/.env

# Restore permissions
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80
CMD service php7.2-fpm start && nginx -g "daemon off;"
