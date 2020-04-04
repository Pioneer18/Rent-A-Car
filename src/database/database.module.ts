import { Module } from '@nestjs/common';
import { databaseProvider } from './providers/database.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [...databaseProvider],
  exports: [...databaseProvider],
})
export class DatabaseModule {}
