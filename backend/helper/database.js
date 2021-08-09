
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://dev_user:accessTestDb.@dev-cluster.3ycoe.mongodb.net/dev-cluster?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

/**
 * Fetch data from database.
 */
async function getAllData () {
    try {
        return new Promise((resolve,reject)=> {
            client.connect(async (err) => {
                if (err) throw err;
                const collection = await client.db("inventory").collection("inventory");
                collection.find({}).toArray((err,docs)=>{
                    if(err) throw err;
                    console.log(docs);
                    resolve(docs);
                    client.close();
                });
            });
        });
    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }
};

/**
 * Fetch data from database.
 * @param data Take object from user input as search parameters.
 * @returns returns error promise if the data already exists.
 */
 async function findData (data) {
    try {
        return new Promise((resolve,reject)=> {
            client.connect(async (err) => {
                if (err) reject (err);
                const collection = await client.db("inventory").collection("inventory");
                const response = await collection.findOne(data);
                console.log(response);
                resolve(response);
                client.close();
            });
        });
    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }
};

/**
 * Write data to database.
 */
 async function insertData (data) {
    try {
       /* const checkDuplicate = await findData(data);
        if(checkDuplicate) return console.warn("Warning: Data already exists.",{
            action: 'Abort write to database'
        });*/
        client.connect( async (err) => {
            if(err) throw err;
            const collection = await client.db("inventory").collection("inventory");
            const response = await collection.insertMany(data,{ordered:true});
            console.log(response);
            client.close();
          });
    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }
};

async function deleteData (data) {
    try {
        return new Promise((resolve,reject)=> {
            client.connect(async (err) => {
                if (err) reject (err);
                const collection = await client.db("inventory").collection("inventory");
                const response = await collection.deleteMany(data);
                console.log(response);
                resolve(response);
                client.close();
            });
        });
    } catch (error) {
        console.error(error);
    } finally {
        client.close();
    }
};

exports.getAllData = getAllData;
exports.findData = findData;
exports.insertData = insertData;
exports.deleteData = deleteData;