const {ObjectId} = require('mongodb');

const {MongoConnection} = require('../common');
const collection = 'tasks';
const isLocal = false;

const getAll = async () => {
    let db = await MongoConnection(isLocal);
    return await db.collection(collection).find().toArray();
};

const getEntry = async (id) => {
    let db = await MongoConnection(isLocal);
    return await db.collection(collection).findOne({"_id": ObjectId(id)});
};

const addEntry = async (entry) => {
    let db = await MongoConnection(isLocal);
    let inserted = await db.collection(collection).insertOne(entry);
    return inserted.insertedId;
};

const deleteEntry = async (id) => {
    let db = await MongoConnection(isLocal);
    let deleted = await db.collection(collection).deleteOne({"_id": ObjectId(id)});
    return deleted.result.ok;
};

const updateEntry = async (id, entry) => {
    let db = await MongoConnection(isLocal);
    let updated = await db.collection(collection).updateOne({"_id": ObjectId(id)}, {$set: {
        text: entry.text,
        day: entry.day,
        reminder: entry.reminder
    }});
    return updated.result.ok;
};

module.exports = {getAll, getEntry, addEntry, deleteEntry, updateEntry};