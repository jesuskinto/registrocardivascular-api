const MongoLib = require('../lib/mongo');

class MongoService {

    constructor(collectionName, options) {
        this.mongoDB = new MongoLib();
        this.collection = collectionName;
        this.options = options;
    }

    async listAll(query, pagination) {
        const instances = await this.mongoDB.getAll(this.collection, query, this.options, pagination);
        return instances || [];
    }

    async list(query) {
        const instance = await this.mongoDB.get(this.collection, query, this.options);
        return instance || {};
    }

    async create({ payload }) {
        const createdIntace = await this.mongoDB.create(this.collection, payload);
        return createdIntace;
    }

    async update({ body, query } = {}) {
        const instance = await this.mongoDB.update(this.collection, query, body);
        return instance;
    }

    async remove(query) {
        const idDeleted = await this.mongoDB.delete(this.collection, query);
        return idDeleted;
    }


    // Only for User Auth
    async auth({ email }) {
        const user = await this.mongoDB.get(this.collection, { email });
        return user;
    }

}

module.exports = MongoService;