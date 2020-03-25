const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

const DB_USER = encodeURIComponent(config.db_user);
const DB_PASS = encodeURIComponent(config.db_password);
const DB_NAME = config.db_name;
const DB_HOST = config.db_host;

const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrite=true&w=majority`;

class MongoLib {
    constructor() {
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        this.dbName = DB_NAME;
    }

    connect() {
        if (!MongoLib.connection) {
            MongoLib.connection = new Promise((resolve, reject) => {
                this.client.connect(err => {
                    if (err) reject(err);
                    console.log('Connected succesfully to mongo');
                    resolve(this.client.db(this.dbName));
                })
            })
        }

        return MongoLib.connection;
    }

    getAll(collection, query, options = {}) {
        return this.connect().then(db => {
            return db.collection(collection).find(query, options).toArray();
        })
    }

    get(collection, query, options = {}) {
        return this.connect().then(db => {
            const { id } = query;
            let filterField;
            if (id) filterField = { _id: ObjectId(id) };
            else filterField = query;
            return db.collection(collection).findOne(filterField, options);
        })
    }

    create(collection, data) {
        return this.connect().then(db => {
            return db.collection(collection).insertOne(data);
        }).then(result => result.insertedId);
    }

    update(collection, id, data) {
        return this.connect().then(db => {
            return db.collection(collection).updateOne({ _id: ObjectId(id) }, { '$set': data }, { upsert: true });
        }).then(result => result.upsertedId || id);
    }

    delete(collection, id) {
        return this.connect().then(db => {
            return db.collection(collection).deleteOne({ _id: ObjectId(id) });
        }).then(() => id)
    }

    auth(collection, query, options = {}) {
        return this.connect().then(db => {
            return db.collection(collection).findOne(query, options);
        })
    }
}

module.exports = MongoLib;