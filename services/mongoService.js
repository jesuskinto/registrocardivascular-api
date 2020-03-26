const MongoLib = require('../lib/mongo');

class MongoService {

    constructor(collectionName, options) {
        this.mongoDB = new MongoLib();
        this.collection = collectionName;
        this.options = options;
    }

    async listAll(query) {
        const instances = await this.mongoDB.getAll(this.collection, query, this.options);
        return instances || [];
    }

    async list({ id }) {
        const instance = await this.mongoDB.get(this.collection, { id }, this.options);
        return instance || {};
    }

    async create({ payload }) {
        const createdIntace = await this.mongoDB.create(this.collection, payload);
        return createdIntace;
    }

    async update({ id, body } = {}) {
        const instance = await this.mongoDB.update(this.collection, id, body);
        return instance;
    }

    async remove({ id }) {
        const idDeleted = await this.mongoDB.delete(this.collection, id);
        return idDeleted;
    }


    // Only for User Auth
    async auth({ email }) {
        const user = await this.mongoDB.get(this.collection, { email });
        return user;
    }

}

module.exports = MongoService;