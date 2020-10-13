// This file is executed once in the worker before executing each test file. We
// wait for the database connection and make sure to close it afterwards.

import { getConnection } from 'typeorm';
import { createDatabaseConnection } from '../db/createDatabaseConnection';

beforeAll(async () => {
  await createDatabaseConnection();
});
afterAll(async () => {
  await getConnection().close();
});
