import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  url:
    process.env.NODE_ENV === 'test'
      ? process.env.TEST_DATABASE_URL
      : process.env.DATABASE_URL,
  synchronize: process.env.DATABASE_SYNC === '1',
};
