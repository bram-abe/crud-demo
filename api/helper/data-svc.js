const db = require("./database");
const ObjectId = require("mongodb").ObjectId;
async function getAllData () {
   db.getAllData();
};

async function findData (data) {
    db.findData(data);
 };

async function insertdata () {
    const data = [
    {
        name: "Altitude Sensor",
        field: "Lobby",
        description: "IOT Sensor",
        images: "",
        availability: "on"
    },
    {
        name: "Wind Sensor",
        field: "Lobby",
        description: "IOT Sensor",
        images: "",
        availability: "on"
    },
    {
        name: "Speed Sensor",
        field: "Lobby",
        description: "IOT Sensor",
        images: "",
        availability: "on"
    },
    {
        name: "Altitude Sensor",
        field: "Lobby",
        description: "IOT Sensor",
        images: "",
        availability: "on"
    },
    {
        name: "Wind Sensor",
        field: "Lobby",
        description: "IOT Sensor",
        images: "",
        availability: "on"
    },
    {
        name: "Speed Sensor",
        field: "Lobby",
        description: "IOT Sensor",
        images: "",
        availability: "on"
    },
    {
        name: "Altitude Sensor",
        field: "Lobby",
        description: "IOT Sensor",
        images: "",
        availability: "on"
    },
    {
        name: "Wind Sensor",
        field: "Lobby",
        description: "IOT Sensor",
        images: "",
        availability: "on"
    },
    {
        name: "Speed Sensor",
        field: "Lobby",
        description: "IOT Sensor",
        images: "",
        availability: "on"
    },
    {
        name: "Altitude Sensor",
        field: "Lobby",
        description: "IOT Sensor",
        images: "",
        availability: "on"
    },
    {
        name: "Wind Sensor",
        field: "Lobby",
        description: "IOT Sensor",
        images: "",
        availability: "on"
    },
    {
        name: "Speed Sensor",
        field: "Lobby",
        description: "IOT Sensor",
        images: "",
        availability: "on"
    }];

    db.insertData(data);
};

async function deleteData(data){
    db.deleteData(data);
};

getAllData();
//insertdata();
//findData({"_id":ObjectId("610ac6051beb01d510e5d6fb")});
//deleteData({"_id": {$in: [ObjectId('610baff0aee1c7c1fffc325d'),ObjectId('610bb240aee1c7c1fffc325f')]}});

//export default dataHandler;