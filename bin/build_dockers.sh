docker build -t jur_platform:13AUG2020 -f Dockerfile .
docker build -t polling_producer:13AUG2020 -f polling-service/Dockerfile ./polling-service