import { afterAll, beforeAll } from 'vitest';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

let connection: DataSource;

beforeAll(async () => {
  const configService = new ConfigService();
  connection = new DataSource({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    dropSchema: true,
  });

  await connection.initialize();
});

afterAll(async () => {
  if (connection && connection.isInitialized) {
    await connection.destroy();
  }
}); 