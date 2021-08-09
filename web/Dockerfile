FROM node:14.17.4-slim AS base
RUN apt-get update -y && apt-get upgrade -y

FROM base as builder
WORKDIR /web
COPY . .
RUN npm i && npm run build

FROM builder as main
WORKDIR /web
COPY --from=builder /web/server.js  /
COPY --from=builder /web/build /
CMD [ "node", "server.js" ]
EXPOSE 80
