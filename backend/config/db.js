const fastifyPlugin = require("fastify-plugin");

let instance = process.env.MONGODB_INSTANCE;
let db = process.env.MONGODB_DB;
let user = process.env.MONGODB_USER;
let pass = process.env.MONGODB_PASS;

async function dbConnector (fastify, options) {
    fastify.register(require("fastify-mongodb"),{
        url: `mongodb+srv://${user}:${pass}@${instance}.3ycoe.mongodb.net/${db}?retryWrites=true&w=majority`,
        forceClose: false
    });
};

module.exports = fastifyPlugin(dbConnector);
