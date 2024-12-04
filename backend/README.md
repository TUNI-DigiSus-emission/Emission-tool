# Backend

## Installation

1. Install Python (any version of 3.x but prefer latest)
2. Install pip
3. Install pipenv

## Setup

1. In the backend directory, run `pipenv install -r requirements.txt` to install dependencies.
2. Ensure that PostgreSQL is running in docker and run `pipenv run python manage.py migrate` to apply migrations.

## Development

Run `pipenv run python manage.py runserver` to start the development server. The server will be available at `http://localhost:8000`.