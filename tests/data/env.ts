export const Env = {
  VALID_EMAIL: process.env.VALID_EMAIL || '',
  VALID_PASSWORD: process.env.VALID_PASSWORD || '',
  BASE_URL: process.env.BASE_URL || 'http://localhost',
};

if (!Env.VALID_EMAIL || !Env.VALID_PASSWORD) {
  throw new Error('Required environment variables are missing');
}