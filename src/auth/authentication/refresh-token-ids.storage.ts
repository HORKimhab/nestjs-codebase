import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { Redis } from 'ioredis';
import { configRedis } from 'src/utils/config.db';

@Injectable()
export class RefreshTokenIdsStorage
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private redisClient: Redis;

  onApplicationBootstrap() {
    // throw new Error('Method not implemented.');
    // Instead of initiating the connection here.
    this.redisClient = new Redis({
      ...configRedis,
    });
  }

  onApplicationShutdown(signal?: string) {
    // throw new Error('Method not implemented.');
    return this.redisClient.quit();
  }
}
