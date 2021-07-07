import redis, { RedisClient } from "redis";

interface CacheInterface {
    
    sadd(key: string, values: { [key: string]: any }, timeExpiration: number): any;
    smembers(key: string): Promise<any>;
    get(key: string): Promise<any>;
    setExpirationTimeInKey(key: string, timeExpiration: number): any;
    set(key: string, values: string, timeExpiration: number): any;
}

class Cache implements CacheInterface {

    private cacheClient: RedisClient; 

    constructor() {
        // @ts-ignore
        this.cacheClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_URL);

        if (process.env.NODE_ENV == 'prod') {
            // @ts-ignore
            this.cacheClient.auth(process.env.REDIS_PASSWORD);
        }
    }

    quit() {
        return new Promise((resolve, reject) => {
            this.cacheClient.quit(() => {

                // @ts-ignore
                resolve()
            });
        })
    }

    sadd(key: string, values: Array<string>, timeExpiration: number) {
        return new Promise((resolve, reject) => {
            this.cacheClient.sadd(key, values, async (error: any) => {
                if (error) {
                    reject(error);
                    return;
                }

                await this.setExpirationTimeInKey(key, timeExpiration);
                resolve(values);
            });
        });
    }

    smembers(key: string) {
        return new Promise((resolve, reject) => {
            this.cacheClient.smembers(key, (error, values) => {
                if (error) {
                    reject(error);
                    return;
                }

                if (values == null) {
                    resolve(null);
                    return;
                }
                
                resolve(values);
            });
        });
    }

    get(key: string) {
        return new Promise((resolve, reject) => {
            this.cacheClient.get(key, (error, values) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(values);
            });
        });
    }

    setExpirationTimeInKey(key: string, timeExpiration: number) {
        return new Promise((resolve, reject) => {
            this.cacheClient.expire(key, timeExpiration, (error: any) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(null);
            });
        });
    }

    set(key: string, values: string, timeExpiration: number = 10) {
        return new Promise((resolve, reject) => {
            this.cacheClient.set(key, values, async (error: any) => {
                if (error) {
                    reject(error);
                    return;
                }

                await this.setExpirationTimeInKey(key, timeExpiration);
                resolve(values);
            });
        });
    }

}

const cache = new Cache;

export { CacheInterface };
export default cache;