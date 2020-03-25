const MongoLib = require('../lib/mongo');

class UserService {

    constructor() {
        this.mongoDB = new MongoLib();
        this.collection = 'users';
        this.options = { projection: { password: 0 } };
    }

    async listAll(query) {
        const users = await this.mongoDB.getAll(this.collection, query, this.options);
        return users || [];
    }

    async list({ idUser }) {
        const user = await this.mongoDB.get(this.collection, { id: idUser }, this.options);
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

    async auth({ email }) {
        const user = await this.mongoDB.get(this.collection, { email });
        return user;
    }

}

module.exports = UserService;