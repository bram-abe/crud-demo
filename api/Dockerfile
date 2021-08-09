FROM node:14.17.4-slim as base
RUN apt-get update -y && apt-get upgrade -y

FROM base as main
WORKDIR /api
COPY . .
RUN npm i
EXPOSE 4000
CMD [ "npm", "run", "start" ]