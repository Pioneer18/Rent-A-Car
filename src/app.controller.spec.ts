
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LoggedOutGuard } from './auth/guards/logged-out.guard';
import { RedisModule } from './redis/redis.module';

describe('AppController', () => {

  let appController: AppController;
  let app: TestingModule;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, RedisModule],
      controllers: [AppController],
      providers: [AppService, LoggedOutGuard, JwtAuthGuard],
    }).compile();
    app = module;
    appController = module.get<AppController>(AppController);
  });

  describe('App Controller definition test', () => {
    it('should be defined', async () => {
      expect(appController).toBeDefined();
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
