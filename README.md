# Emission tool

What is this?

This is a tool intended to help event organizers to estimate CO2 emissions according to given inputs.

You can try the tool at https://tuni-digisus-emission.github.io/Emission-tool/


## Code description

This tool has it's own backend and frontend that are required to run the tool. The backend is written in Python and uses Django as the framework for HTTP calls. The frontend is written in TypeScript and uses React and NextJS as the framework for the UI.

## Development

### Backend

1. You need Python Docker and v3.X installed on your machine. Versions 3.11 and 3.12 are known to work.
2. Install the required packages with your desired package manager.
3. Start the PostgreSQL database using `docker-compose -f docker-compose.yml up` in the backend directory.
4. Run the backend migrations by running `python manage.py migrate` in the backend directory.
5. Start the backend server by running `python manage.py runserver` in the backend directory.

### Frontend

1. Ensure that you have Node and npm installed on your machine. Node version 21.X is known to work.
2. Install the required packages by running `npm install` or `npm i` in the frontend directory.
3. Start the frontend server by running `npm run dev` in the frontend directory.


## Deployment

Since the tool is hosted in the Github pages there's a `frontend-standalone` project in the repository that is an all inclusive version of the tool.
Updating code base there will automatically run the deployment CI/CD. Please do not push directly to the `main` branch of the `frontend-standalone` project as this will trigger the deployment pipeline. This might lead to extra costs for certain people and if abused it will be disabled.
