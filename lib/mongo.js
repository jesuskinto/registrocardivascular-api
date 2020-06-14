const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

const DB_USER = encodeURIComponent(config.db_user);
const DB_PASS = encodeURIComponent(config.db_password);
const DB_NAME = config.db_name;
const DB_HOST = config.db_host;
const DEV = config.dev;

const MONGO_URI = DEV ?
    `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}/?authSource=${DB_NAME}` :
    `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrite=true&w=majority`;

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

    getAll(collection, query, options = {}, { resPerPage, page } = {}, order = {}) {
        return this.connect().then(async db => {
            const { id, patient } = query;
            let filterField;
            if (id) filterField = { _id: ObjectId(id) };
            else if (patient) filterField = { patient: ObjectId(patient) };
            else filterField = query;

            if (resPerPage && page) {
                const res = await db.collection(collection).find(filterField, options).sort(order).skip((resPerPage * page) - resPerPage).limit(resPerPage).toArray();
                const count = await db.collection(collection).countDocuments(filterField);
                return { res, count }
            }
            return db.collection(collection).find(filterField, options).sort(order).toArray();
        });
    }

    get(collection, query, options = {}) {
        return this.connect().then(db => {
            const { id, patient } = query;
            let filterField;
            if (id) filterField = { _id: ObjectId(id) };
            else if (patient) filterField = { patient: ObjectId(patient) };
            else filterField = query;
            return db.collection(collection).findOne(filterField, options);
        })
    }

    create(collection, data) {
        return this.connect().then(db => {
            return db.collection(collection).insertOne(data);
        }).then(result => result.insertedId);
    }

    update(collection, query, data) {
        const { id, patient } = query;
        let filterField;
        if (id) filterField = { _id: ObjectId(id) };
        else if (patient) filterField = { patient: ObjectId(patient) };
        else filterField = query
        return this.connect().then(db => {
            return db.collection(collection).updateOne(filterField, { '$set': data }, { upsert: true });
        }).then(result => result.upsertedId || id);
    }

    delete(collection, query) {
        const { id, patient } = query;
        let filterField;
        if (id) filterField = { _id: ObjectId(id) };
        else if (patient) filterField = { patient: ObjectId(patient) };
        else filterField = query
        return this.connect().then(db => {
            return db.collection(collection).deleteOne(filterField);
        }).then(() => id)
    }

    auth(collection, query, options = {}) {
        return this.connect().then(db => {
            return db.collection(collection).findOne(query, options);
        })
    }
}

module.exports = MongoLib;