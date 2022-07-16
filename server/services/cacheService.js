const NodeCache = require("node-cache");

class Cache {

    constructor(ttlSeconds) {
        this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
    }

    async get(key) {
        return await this.cache.get(key);
    }

    async set(key, data) {
        if (!key || !data) {
            console.log('failed set cache due to currupted key/data', key, data);
        }
        await this.cache.set(key, data);
    }

    flush() {
        this.cache.flushAll();
    }
}

module.exports = new Cache(600);