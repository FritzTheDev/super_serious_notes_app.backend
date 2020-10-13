// Those first two require are very important - without them the typescript migrations did not work for me.
// See https://github.com/facebook/jest/issues/10178

// tslint:disable-next-line: no-var-requires
require('ts-node/register');
// tslint:disable-next-line: no-var-requires
require('tsconfig-paths/register');
import 'dotenv/config';
import { createConnection } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ormConfig } from '../db/ormConfig';

process.env.NODE_ENV = 'test';
/*
 * This file is executed by Jest before running any tests.
 * We drop the database and re-create it from migrations every time.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async (): Promise<void> => {
  // Force dropping the schema so that test run clean every time.
  // Note that we are not cleaning *between* tests.
  const testOrmConfig: PostgresConnectionOptions = {
    ...(ormConfig as PostgresConnectionOptions),
    dropSchema: true,
  };

  const t0 = Date.now();
  const connection = await createConnection(testOrmConfig);
  const connectTime = Date.now();
  await connection.runMigrations();
  const migrationTime = Date.now();
  console.log(
    ` 👩‍🔬 Connected in ${connectTime - t0}ms - Executed migrations in ${
      migrationTime - connectTime
    }ms.`,
  );
};
