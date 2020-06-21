const Redis = require('ioredis');
class redisTool {
    constructor(redisConfig) {
        this.redis = new Redis(redisConfig);
    }
    // 设置
    async get(key) {
        let data = await this.redis.get(key);
        return JSON.parse(data);
    }
    // 获取
    async set(key, data, maxAge = 7 * 24 * 60 * 60 * 1000) {
        try {
            // Use redis set EX to automatically drop expired sessions
            await this.redis.set(key, JSON.stringify(data), 'EX', maxAge / 1000);
        }
        catch (e) { }
        return 'success';
    }
    // 删除
    async destroy(key) {
        return await this.redis.del(key);
    }
}
module.exports = redisTool;
