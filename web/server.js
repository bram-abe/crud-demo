const fastify = require("fastify")({
    logger: false,
    pluginTimeout: 60000,
  });
  
const path = require('path')

fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'build'),
  prefix: '/*', 
})
fastify.register(require("fastify-cors"), {
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE"],
  });

fastify.get('/', function (req, reply) {
    return reply.sendFile('index.html') 
  })

  const start = async () => {
    try {
      await fastify.listen(80, "0.0.0.0", (error, address) => {
        if (error) {
          fastify.log.error(error);
          process.exit(1);
        }
        console.log(`Web Server ready to connect at ${address}`);
      });
    } catch (error) {
      fastify.log.error(error);
      process.exit(1);
    }
  };
  
  start();



