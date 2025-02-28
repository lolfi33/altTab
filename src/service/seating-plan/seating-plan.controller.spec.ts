import { Test, TestingModule } from '@nestjs/testing';
import { SeatingPlanController } from './seating-plan.controller';
import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestApplication } from '@nestjs/core';
import * as request from 'supertest';
import { SeatingPlanModule } from './seating-plan.module';

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

describe('SeatingPlanController', () => {
  let controller: SeatingPlanController;
  let app: NestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [generateDbConfig(), SeatingPlanModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a seating-table with tables', async () => {
    const seatingTable = {
      tables: [
        { number: 4, seats: 8 },
        { number: 5, seats: 6 },
      ],
    };
    const result = await request(app.getHttpServer())
      .post('/seating-plan')
      .send(seatingTable)
      .expect(201);
    expect(result.body).toBeDefined();
  });
});
