.PHONY: syncdbschema createrds deleterds recreaterds deploy syncrawdatatos3

# CHANGE THESE VARIABLES BEFORE RUNNING ANY MAKE COMMANDS. DO NOT CHANGE DB CREATE OR DB_URL
APP_NAME := CHANGE_THIS_VALUE
DB_ENGINE = CHANGE_THIS_VALUE
DB_IDENTIFIER = CHANGE_THIS_VALUE
SECURITY_GROUP_IDS = CHANGE_THIS_VALUE
TAGS = CHANGE_THIS_VALUE
DB_SIZE = db.t2.micro
DB_CREATE := DATABASE_URL=psql://`whoami`:127.0.0.1:5432/
DB_URL := ${DB_CREATE}${APPNAME}

env:
	echo 'DJANGO_SECRET_KEY=dev123' >> .env
	echo ${DB_URL} >> .env
	echo 'DEBUG=True' >> .env

syncdb:
	dropdb ${APP_NAME}
	createdb ${APP_NAME}
	rm -f -r ${APP_NAME}/migrations
	python manage.py makemigrations ${APP_NAME}
	python manage.py migrate


createrds:
	aws --profile default rds create-db-instance \
	--db-instance-identifier ${DB_IDENTIFIER} --db-name ${APP_NAME} \
	--db-instance-class ${DB_SIZE} --engine ${DB_ENGINE} \
	--master-username "postgres" --master-user-password ${DB_PASSWORD} \
	--allocated-storage 20 --vpc-security-group-ids ${SECURITY_GROUP_IDS} \
	--tags Key='name',Value=${TAGS}

	aws --profile default rds wait db-instance-available \
	--db-instance-identifier ${DB_IDENTIFIER}

	python manage.py migrate --noinput --settings "config.settings.prod"


deleterds:
	aws --profile default rds delete-db-instance \
	--db-instance-identifier ${DB_IDENTIFIER} --skip-final-snapshot \
	--delete-automated-backups

	aws --profile default rds wait db-instance-deleted \
	--db-instance-identifier ${DB_IDENTIFIER}


recreaterds:
	make deleterds

	make createrds


deploy:
	zappa deploy dev

	zappa certify dev

	python manage.py collectstatic --noinput \
	--settings "config.settings.prod"

syncrawdatatos3:
	aws --profile rji-futures-lab s3 sync data/rmp/raw s3://rtk-data/rmp/raw --acl private
