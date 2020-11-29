import { Module } from '@nestjs/common';
import { databaseProvider } from './providers/database.provider';
import { ConfigModule } from '@nestjs/config';
/**
 * **summary**: Import and export the database provider
 * - note: Other specific model providers may be registered here as well as exports of the database module
 */
@Module({
  imports: [ConfigModule],
  providers: [...databaseProvider],
  exports: [...databaseProvider],
})
export class DatabaseModule {}
