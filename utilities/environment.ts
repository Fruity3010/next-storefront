export const SITE_NAME = 'Northwind Market';

export const DUMMYJSON_URL = 'https://dummyjson.com';

export const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000';

export function isProductionEnvironment() {
  return process.env.NODE_ENV === 'production';
}
