# SIMPLE CRUD OPERATION
This web app is intended to simulate a simple CRUD operation and calling API on others services.

## HOW TO USE
- Create `.env` file in the api directory and put mongodb credential as ENV variables (use `.env-template` file to start and change file name into `.env`).
- Use `docker compose up` on root DIR. to start API and WEB services.

### PRODUCTION
You can use supplied `Dockerfile` to deploying into container orchestration or any serverless provider.

### LOCAL DEV & TEST
#### API SERVER
- Open backend director `cd backend`
- Use `npm start` or `node server.js` 
- Start API server as above.
#### FRONTEND WEB
- `cd frontend/src`
- Use `npm run start` to start in development mode.
- Use `npm run test` to include test scenario running in the backgroud / integrate with CI/CD pipeline.

## STACK
- Fastify
- React.js
- Jest
- Material-ui

## Author
@bram_abe