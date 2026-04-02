import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Загружаем .env.local из корня проекта (там, где package.json)
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Для отладки (можно убрать после проверки)
console.log('DATABASE_URL from .env.local:', process.env.DATABASE_URL);

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL,
  },
});