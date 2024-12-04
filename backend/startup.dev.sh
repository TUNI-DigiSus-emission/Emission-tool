#!/bin/bash

if ! [ -x "$(command -v pipenv)" ]; then
  echo 'Info: pipenv is not installed.' >&2
  echo 'Running locally' >&2
  python manage.py runserver
fi

pipenv run python manage.py runserver
