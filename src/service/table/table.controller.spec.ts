import { Test, TestingModule } from '@nestjs/testing';
import { TableController } from './table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DynamicModule } from '@nestjs/common';
import { TableModule } from './table.module';
import { NestApplication } from '@nestjs/core';
import * as request from 'supertest';

function generateDbConfig(): DynamicModule {
  return TypeOrmModule.forRoot({
    type: 'better-sqlite3',
    database: ':memory:',
    synchronize: true,
    dropSchema: true,
    autoLoadEntities: true,
    entities: [],
    logging: ['error'],
  });
}

describe('TableController', () => {
  let controller: TableController;
  let app: NestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [generateDbConfig(), TableModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    controller = module.get<TableController>(TableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a table', async () => {
    const table = {
      number: 1,
      seats: 4,
    };
    const result = await request(app.getHttpServer())
      .post('/table')
      .send(table)
      .expect(201);
    expect(result.body).toEqual(expect.objectContaining(table));
  });
});
