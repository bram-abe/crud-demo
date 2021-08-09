require('dotenv').config({path:'./.env'})
const fastify = require("fastify")({
  logger: false,
  pluginTimeout: 120000,
});

fastify.register(require("./config/db"));
fastify.register(require("fastify-cors"), {
  origin: "*",
  methods: ["GET", "PUT", "POST", "DELETE"],
});
fastify.register(require("./routes/routes"), { prefix: "api/v1" });

const start = async () => {
  try {
    await fastify.listen(4000, "0.0.0.0", (error, address) => {
      if (error) {
        console.warn(error);
        process.exit(1);
      }
      console.log(`API Server ready to connect at ${address}`);
    });
  } catch (error) {
   console.warn(error);
    process.exit(1);
  }
};

start();
