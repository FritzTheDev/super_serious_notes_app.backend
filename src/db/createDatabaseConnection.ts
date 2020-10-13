import { Connection, createConnection } from 'typeorm';
import { ormConfig } from './ormConfig';

export async function createDatabaseConnection(): Promise<Connection> {
  return await createConnection(ormConfig);
}
