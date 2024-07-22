const NodeEnvironment = require('jest-environment-node').TestEnvironment;

const { MongoMemoryServer } = require('mongodb-memory-server');

class CustomEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);

    this.mongod = new MongoMemoryServer({
      binary: {
        version: '4.0.5',
      },
      autoStart: false,
    });
  }

  async setup() {
    await super.setup();
    await this.mongod.start();
    this.global.MONGO_URI= this.mongod.getUri();
  }

  async teardown() {
    await super.teardown();
    await this.mongod.stop();
    this.mongod = null;
    this.global = {};
  }
}

module.exports = CustomEnvironment;
