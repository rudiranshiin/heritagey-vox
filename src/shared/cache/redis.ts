import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

export const redis = new Redis(REDIS_URL, {
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  lazyConnect: true,
});

redis.on('error', (error) => {
  console.error('Redis connection error:', error.message);
});

redis.on('connect', () => {
  console.log('✅ Redis connected');
});

let redisConnected = false;

redis.on('ready', () => {
  console.log('Redis ready');
  redisConnected = true;
});

redis.on('close', () => {
  redisConnected = false;
});

export function isRedisAvailable(): boolean {
  return redisConnected && redis.status === 'ready';
}

export async function connectRedis(): Promise<void> {
  try {
    await redis.connect();
  } catch (error) {
    console.error('❌ Redis connection failed:', error);
    // Don't throw - Redis is optional for basic functionality
  }
}

export async function disconnectRedis(): Promise<void> {
  await redis.quit();
  console.log('Redis disconnected');
}

// Cache helper functions - skip if Redis not available
export async function cacheGet<T>(key: string): Promise<T | null> {
  if (!isRedisAvailable()) return null;
  try {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export async function cacheSet(key: string, value: unknown, ttlSeconds?: number): Promise<void> {
  if (!isRedisAvailable()) return;
  try {
    const data = JSON.stringify(value);
    if (ttlSeconds) {
      await redis.setex(key, ttlSeconds, data);
    } else {
      await redis.set(key, data);
    }
  } catch {
    // Silently fail - caching is optional
  }
}

export async function cacheDelete(key: string): Promise<void> {
  if (!isRedisAvailable()) return;
  try {
    await redis.del(key);
  } catch {
    // Silently fail
  }
}

export async function cacheDeletePattern(pattern: string): Promise<void> {
  if (!isRedisAvailable()) return;
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch {
    // Silently fail
  }
}

