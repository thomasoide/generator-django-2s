# <%= _.startCase(answers.name) %>

<%= answers.description %>

_<Ends the templating script?.>_

## Additional changes to be made

Even though you ran the django-2s generator, you're not quite finished yet. You'll have to run a few commands manually change a few files to get your project to work properly. We'll go through each one step-by-step.

### 1. Makefile

Open the Makefile in a text editor. This is a file that allows you to run simple commands that expedite the development process.

At the top of the makefile, you should see 8 variables separated by comments. Change the first one: **APP_NAME**

- **APP_NAME**: This variable should exactly match the app name you gave when running the `yo django-2s:startapp` generator.

The five variables at the bottom are all AWS-specific variables that will help you with deployment, particularly if using the serverless framework zappa.

Keep in mind that these commands use the **default** credentials you've set in your /.aws/credentials file. If you'd like to use different credentials, be sure to change that within the Makefile.

- **SECURITY_GROUP_IDS**: This should be the ID of your VPC security group in AWS.
- **TAGS**: This will tack on tags when creating an AWS RDS instance.
- **DB_SIZE**: This declares the size of your AWS RDS instance you want to create. By default this is set to db.t2.micro.
- **DB_INSTANCE_IDENTIFIER**: This is the string you use to identify your RDS instance.
- **DB_ENGINE**: This framework relies heavily on django-postgres-copy for ETL, but you're free to choose any DB type you'd like.

After completing these tasks, run `make env` to create a .env file in your project directory. These environment variables will be loaded when starting your virtual environment. These are bare minimum variables, so you will probably need to go in and add other variables on your own.

Here's an example .env file

```bash
# Out of the box, your secret key is set to dev123. You can change this value to whatever you want. Be sure it isn't exposed in production.
DJANGO_SECRET_KEY=dev123
# add this value if your postgres superuser isn't named postgres
DB_USER=thisisadummydbusername
# add this if your superuser has a specifc password
DB_PASSWORD=supersecretpassword
DB_HOST=localhost
DEBUG=True

```

You can also put AWS credentials in here if you're pulling resources from an S3 bucket.

### 2. Pipenv

After creating the .env file, run `pipenv shell` and then `pipenv install` from the command line while in your project directory. These commands will get your virtual environment set up. These commands should create a Pipfile.lock file in the directory.

This Pipfile installs Django and other helpful packages like django-postgres-copy out of the box. If you want to add other packages, you'll want to run the command  `pipenv install <PACKAGE NAME>`.

### 3. Changes to settings

You'll find three separate settings files in your project directory if you go to `./<projectdirectory/config/settings`.

- **base.py**: These are global settings that apply to both development and production environments.
- **local.py**: These are settings that apply solely to a local development environment.
- **prod.py**: These are settings that apply when the application is in production.

#### base.py

Three changes need to be made here.

1. On line 21, change `'NAME': 'rmp'` to whatever your database is called. This value is usually whatever your app name is.
2. On line 37, add a new line to the INSTALLED_APPS list and add your app name like so: `'appname',`
3. On line 57, add your app name to `os.path.join`. It should look like this `os.path.join(ROOT_DIR, 'appname', 'templates/appname')`

#### local.py

1. On line 48, add your app name to `os.path.join`. It should look like this `os.path.join(ROOT_DIR, 'appname', 'static')`

#### prod.py

These settings prepare the app for deployment by automatically setting up some S3 buckets using django-storages. Since these settings will vary greatly from project to project, changes in this file will be left to you.

### 4. Other environment setup

If you've developed Django projects before, you should be able to run `python manage.py runserver` and hit the ground running.

If this is your first project, you'll likely need to go through some additional setup to get your computer ready.

Docs on additional setup are located in [docs/setup.md](./docs/setup.md)

Have questions about the files that come with this setup out of the box? Docs on that at [docs/files.md](./docs/files.md)

Here's a link to [Django's excellent documentation](https://docs.djangoproject.com/en/2.2/) that can take you further into the weeds on specific functions, methods and features you might find useful.
