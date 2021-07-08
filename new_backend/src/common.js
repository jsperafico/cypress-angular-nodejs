const version = require('../package.json').version;
const MongoClient = require('mongodb').MongoClient;

const MongoConfig = {
    host: {
        local: "localhost:27017",
        docker: "mongo:27017"
    },
    user: "application_user",
    pass: "application_password",
    db: "Example"
};
const MongoConnection = async (isLocal) => {
    let client = await MongoClient.connect(`mongodb://${MongoConfig.user}:${MongoConfig.pass}@${isLocal? MongoConfig.host.local : MongoConfig.host.docker}/${MongoConfig.db}`);
    return await client.db(MongoConfig.db);
};

module.exports = {version, MongoConfig, MongoConnection};