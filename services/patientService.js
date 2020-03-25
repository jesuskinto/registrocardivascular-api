const MongoLib = require('../lib/mongo');

class UserService {

    constructor() {
        this.mongoDB = new MongoLib();
        this.collection = 'patients';
    }

    async listAll() {
        const patients = await this.mongoDB.getAll(this.collection);
        return patients || [];
    }

    async list({ idUser }) {
        const user = await this.mongoDB.get(this.collection, idUser);
        return user || {};
    }

    async create({ user }) {
        const createdUser = await this.mongoDB.create(this.collection, user);
        return createdUser;
    }

    async update({ idUser, body } = {}) {
        const user = await this.mongoDB.update(this.collection, idUser, body);
        return user;
    }

    async remove({ idUser }) {
        const id = await this.mongoDB.delete(this.collection, idUser);
        return id;
    }
}

module.exports = UserService;