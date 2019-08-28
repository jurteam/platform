#!/bin/sh

RED='\033[0;31m'
GREEN='\033[0;32m'
ORANGE='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# include parse_yaml function
. $PWD/bin/parse_yaml.sh

# read yaml file
eval $(parse_yaml deploy-conf.yml "cf_")

# READING commands
while [[ $# -gt 1 ]]
do
key="$1"

case $key in
    -e|--environment)
    ENVIRONMENT="$2"
    shift # past argument
    ;;
    -f|--frontend)
    FE="yes"
    shift # past argument
    ;;
    -b|--backend)
    BE="yes"
    shift # past argument
    ;;
    -d|--database)
    DATABASE="yes"
    shift # past argument
    ;;
    *)
            # unknown option
    ;;
esac
shift # past argument or value
done

# access configuration
namespace="cf_namespace"
local_app_path="cf_local_app_path"
local_db_name="cf_local_database_name"
local_db_user="cf_local_database_user"
local_db_pass="cf_local_database_password"
local_db_host="cf_local_database_host"
local_db_port="cf_local_database_port"
vhost="cf_${ENVIRONMENT}_vhost"
app_path="cf_${ENVIRONMENT}_app_path"
db_name="cf_${ENVIRONMENT}_database_name"
db_user="cf_${ENVIRONMENT}_database_user"
db_pass="cf_${ENVIRONMENT}_database_password"
db_host="cf_${ENVIRONMENT}_database_host"
db_port="cf_${ENVIRONMENT}_database_port"
ssh_user="cf_${ENVIRONMENT}_ssh_user"
ssh_host="cf_${ENVIRONMENT}_ssh_host"
ssh_password="cf_${ENVIRONMENT}_ssh_password"

echo "$FE";

if [ ! -z "$ENVIRONMENT" ] | [ ! -z "${!local_app_path}" ] | [ ! -z "${!vhost}" ]; then

  # echo ${!local_app_path}
  #
  # echo ${!vhost}
  # echo ${!app_path}
  # echo ${!db_name}
  # echo ${!db_user}
  # echo ${!db_pass}
  # echo ${!db_host}
  # echo ${!db_port}
  # echo ${!ssh_user}
  # echo ${!ssh_host}
  # echo ${!ssh_password}
  if [ ! -z "$ENVIRONMENT" ]; then
    echo ""
  	echo "–– ${ORANGE}Frontend${NC} deploy to '${ENVIRONMENT}' environment –––––––––––––––––––––––––––––"
    if [ "$ENVIRONMENT" == "production" ]; then
      echo "   ${PURPLE}local${NC}     build frontend application: npm run build"
      npm run build
    else
      echo "   ${PURPLE}local${NC}     build frontend application: npm run build-${ENVIRONMENT}"
      npm run build-${ENVIRONMENT}
    fi
  	echo ""
  	echo "   ${PURPLE}local${NC}     origin directory: ${!local_app_path}/build"
  	echo "   ${CYAN}remote${NC}    destination directory: ${!app_path}/html/public"
  	echo ""
    echo "   ${CYAN}remote${NC}    launching command: rsync -vzcrSLh --exclude-from=\"deploy-exclude.list\" ${!local_app_path}/build/. ${!ssh_user}@${!ssh_host}:${!app_path}/html/public"
  	echo ""
    # The options:
    # v - verbose
    # z - compress data
    # c - checksum, use checksum to find file differences
    # r - recursive
    # S - handle sparse files efficiently
    # L - follow links to copy actual files
    # h - show numbers in human-readable format
    # --exclude-from - Exclude files from being uploaded
    rsync -vzcrSLh --exclude-from="deploy-exclude.list" ${!local_app_path}/build/. ${!ssh_user}@${!ssh_host}:${!app_path}/html/public
    echo ""
  	echo "   ${GREEN}success${NC}   files deploy to '${ENVIRONMENT}' environment done."
  fi

  if [ ! -z "$BE" ]; then
    echo ""
  	echo "–– ${ORANGE}Backend${NC} deploy to '${ENVIRONMENT}' environment –––––––––––––––––––––––––––––"
  	echo "   ${PURPLE}local${NC}     origin directory: ${!local_app_path}/rest"
  	echo "   ${CYAN}remote${NC}    destination directory: ${!app_path}/html"
  	echo ""
    echo "   ${CYAN}remote${NC}    launching command: rsync -vzcrSLh --owner=www-data --group=www-data --exclude-from=\"deploy-exclude.list\" ${!local_app_path}/rest/. ${!ssh_user}@${!ssh_host}:${!app_path}/html"
  	echo ""
    # The options:
    # v - verbose
    # z - compress data
    # c - checksum, use checksum to find file differences
    # r - recursive
    # S - handle sparse files efficiently
    # L - follow links to copy actual files
    # h - show numbers in human-readable format
    # --exclude-from - Exclude files from being uploaded
    rsync -vzcrSLh --owner=www-data --group=www-data --exclude-from="deploy-exclude.list" ${!local_app_path}/rest/. ${!ssh_user}@${!ssh_host}:${!app_path}/html
  	echo ""
    echo "   ${CYAN}remote${NC}    composer install: ssh -t ${!ssh_user}@${!ssh_host} 'composer install --optimize-autoloader --no-dev'"
  	echo ""
    # ssh -t ${!ssh_user}@${!ssh_host} 'composer install --optimize-autoloader --no-dev'
  	echo ""
    echo "   ${CYAN}remote${NC}    optimizing configuration loading: ssh -t ${!ssh_user}@${!ssh_host} 'php artisan config:cache'"
  	echo ""
    # ssh -t ${!ssh_user}@${!ssh_host} 'php artisan config:cache'
  	echo "   ${GREEN}success${NC}   files deploy to '${ENVIRONMENT}' environment done."
  fi

  if [ ! -z "$DATABASE" ]; then
    echo ""
  	echo "–– ${ORANGE}DATABASAE${NC} deploy to '${ENVIRONMENT}' environment –––––––––––––––––––––––––––––"
  	# echo "   ${PURPLE}local${NC}     origin directory: ${!local_app_path}"
  	echo "   ${CYAN}remote${NC}    destination directory: ${!app_path}"
  	echo ""
    echo "   ${CYAN}remote${NC}    save ${ENVIRONMENT} dump"
    ssh ${!ssh_user}@${!ssh_host} "mysqldump -h${!db_host} -P${!db_port} -u${!db_user} -p${!db_pass} ${!db_name} > ${!app_path}/dump.sql"
  	echo "   ${PURPLE}local${NC}     getting dump file: ${!app_path}/dump.sql"
    scp ${!ssh_user}@${!ssh_host}:${!app_path}/dump.sql db/${!namespace}-${ENVIRONMENT}.sql
    echo "   ${PURPLE}local${NC}     dump stored in db/${!namespace}-${ENVIRONMENT}.sql"
    echo "   ${CYAN}remote${NC}    delete dump file: ${!app_path}/dump.sql"
    ssh ${!ssh_user}@${!ssh_host} "rm ${!app_path}/dump.sql"
    echo "   ${PURPLE}local${NC}    save local dump"
    mysqldump -h${!local_db_host} -P${!local_db_port} -u${!local_db_user} -p${!local_db_pass} ${!local_db_name} > db/${!namespace}-dev.sql
    echo "   ${PURPLE}local${NC}     dump stored in ${!namespace}-dev.sql"
  	echo "   ${PURPLE}local${NC}     send dump file to ${ENVIRONMENT}"
    scp db/${!namespace}-dev.sql ${!ssh_user}@${!ssh_host}:${!app_path}/dump.sql
    echo "   ${CYAN}remote${NC}    import local dump"
    ssh ${!ssh_user}@${!ssh_host} "mysql --host=${!db_host} --user=${!db_user} --password=${!db_pass} --database=${!db_name} --execute=\"SET autocommit=0;SOURCE ${!app_path}/dump.sql;COMMIT\""
    echo "   ${CYAN}remote${NC}    delete dump file: ${!app_path}/dump.sql"

    # echo "   ${PURPLE}local${NC}     launching command: rsync -vzcrSLh --exclude-from=\"deploy-exclude.list\" ${!local_app_path}/. ${!ssh_user}@${!ssh_host}:${!app_path}/"
  	echo ""
  	echo "   ${GREEN}success${NC}   database deploy to '${ENVIRONMENT}' environment done."
  fi

else
	echo "${RED}error:${NC} please specify a valid environment."
fi
