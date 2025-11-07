// src/utils/test-db.ts
import sequelize from '../db';

export async function setupTestDb() {
  await sequelize.authenticate();
  await sequelize.sync({ force: true });
}

export async function cleanupTestDb() {
  await sequelize.truncate();
}

export async function teardownTestDb() {
  await sequelize.close();
}