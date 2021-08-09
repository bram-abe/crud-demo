const { ObjectId, Binary } = require("mongodb");

async function routes(fastify, options) {
  const collection = fastify.mongo.db.collection("inventory");

  fastify.get("/", async (request, reply) => {
    return new Promise(async (resolve, reject) => {
      await collection.find({}).toArray((error, docs) => {
        if (error) throw new Error(error);
        resolve(docs);
      });
    });
  });

  fastify.get("/inventory/:deviceId", async (request, reply) => {
    const result = await collection.findOne({
      _id: ObjectId(request.params.deviceId),
    });
    if (!result) throw new Error("Data not found");
    return result;
  });

  fastify.put("/inventory/:_id", async (request, reply) => {
    const filterId = request.query._id;
    async function CallUpdate(params) {
      const result = await collection.updateOne(
        { _id: ObjectId(filterId) },
        params
      );
      if(result.acknowledged){
        reply.headers('x-file',params.$set.file).send(params.$set);
      }else{
        reply.code(500).send();
      }
    }

    if (request?.body?.file) {
      const updateData = {
        $set: {
          file: Binary(request.body.file),
        },
      };
      CallUpdate(updateData);
    } else {
      const updateData = {
        $set: {
          ...request.body,
        },
      };
      CallUpdate(updateData);
    }
  });

  fastify.post("/inventory", async (request, reply) => {
    const data = { ...request.body };
    const fileBinary = Binary(request.body.file);
    data.file = fileBinary;
    const result = await collection.insertOne(data);
    return result;
  });

  fastify.delete("/inventory/", async (request, reply) => {
    const paramsId = request.query._id;
    if (Array.isArray(paramsId)) {
      const deleteId = paramsId.map((val) => {
        return ObjectId(val);
      });
      const result = await collection.deleteMany({
        _id: { $in: deleteId },
      });
      return result.acknowledged;
    } else {
      const result = await collection.deleteOne({
        _id: ObjectId(paramsId),
      });
      return result.acknowledged;
    }
  });
}

module.exports = routes;
