import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string;
  NODE_ENV: string;
  DB_URL: string;
  BCRYPT_SALT_ROUND: string;
  JWT_ACCESS_TOKEN_SECRET: string;
  JWT_ACCESS_TOKEN_EXPIRES: string;
  JWT_REFRESH_TOKEN_SECRET: string;
  JWT_REFRESH_TOKEN_EXPIRES: string;
  SUPER_ADMIN_PHONE: string;
  SUPER_ADMIN_PASSWORD: string;
}

const loadEnvVariables = (): EnvConfig => {
  const requiredEnvVariables: string[] = [
    "PORT",
    "NODE_ENV",
    "DB_URL",
    "BCRYPT_SALT_ROUND",
    "JWT_ACCESS_TOKEN_SECRET",
    "JWT_ACCESS_TOKEN_EXPIRES",
    "JWT_REFRESH_TOKEN_SECRET",
    "JWT_REFRESH_TOKEN_EXPIRES",
    "SUPER_ADMIN_PHONE",
    "SUPER_ADMIN_PASSWORD",
  ];

  requiredEnvVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    NODE_ENV: process.env.NODE_ENV as "development|production",
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    DB_URL: process.env.DB_URL!,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
    JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET as string,
    JWT_ACCESS_TOKEN_EXPIRES: process.env.JWT_ACCESS_TOKEN_EXPIRES as string,
    JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET as string,
    JWT_REFRESH_TOKEN_EXPIRES: process.env.JWT_REFRESH_TOKEN_EXPIRES as string,
    SUPER_ADMIN_PHONE: process.env.SUPER_ADMIN_PHONE as string,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
  };
};

export const envVars = loadEnvVariables();
