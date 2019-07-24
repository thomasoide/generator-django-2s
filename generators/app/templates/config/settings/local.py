"""
Django project settings for developer's local environment.
"""
import os
from .base import * # noqa

DEBUG = True

ALLOWED_HOSTS = [
    'localhost',
    '0.0.0.0',
    '127.0.0.1',
]

INSTALLED_APPS = INSTALLED_APPS + ['debug_toolbar',]

MIDDLEWARE = MIDDLEWARE + [
    'debug_toolbar.middleware.DebugToolbarMiddleware',
]


LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'INFO',
        },
        'rmp.management': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}


STATIC_ROOT = 'static/'
STATIC_URL = '/static/'

# CHANGE THIS LINE
STATICFILES_DIRS = [
    os.path.join(ROOT_DIR, 'rmp', 'static'),
]
STATICFILES_FINDERS = [
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
]

STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.StaticFilesStorage'

DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'
RMP_DATA_LOCATION = 'data/'
