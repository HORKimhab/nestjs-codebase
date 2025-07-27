import { registerAs } from '@nestjs/config';

export default registerAs('app', () => {
  const env = process.env;

  return {
    // Server Configuration
    host: env.APP_HOST || 'localhost',
    port: parseInt(env.APP_PORT, 10) || 3000,
    environment: env.APP_ENV || 'development',

    swagger: {
      authUser: env.SWAGGER_AUTH_USER || 'adminNeweSwagger',
      authPassword: env.SWAGGER_AUTH_PASSWORD || '123iadminNeweSwagger',
    },

    // Database Configuration
    database: {
      type: env.DB_TYPE || 'mysql',
      host: env.DB_HOST || 'localhost',
      port: parseInt(env.DB_PORT, 10) || 3306,
      username: env.DB_USERNAME || 'root',
      password: env.DB_PASSWORD || 'password',
      database: env.DB_DATABASE || 'myapp',
      synchronize: env.DB_SYNCHRONIZE === 'true',
      logging: env.DB_LOGGING === 'true',
    },

    // JWT Configuration
    jwt: {
      secret: env.JWT_SECRET || 'your-secret-key',
      expiresIn: env.JWT_EXPIRES_IN || '14d',
      refreshSecret: env.JWT_REFRESH_SECRET || 'your-refresh-secret',
      refreshExpiresIn: env.JWT_REFRESH_EXPIRES_IN || '7d',
    },

    // Redis Configuration
    redis: {
      host: env.REDIS_HOST || 'localhost',
      port: parseInt(env.REDIS_PORT, 10) || 6379,
      password: env.REDIS_PASSWORD || '',
      db: parseInt(env.REDIS_DB, 10) || 0,
      retryAttempts: parseInt(env.REDIS_RETRYATTEMPTS, 10) || 5,
    },

    // Email Configuration
    mail: {
      host: env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(env.EMAIL_PORT, 10) || 587,
      secure: env.EMAIL_SECURE === 'true',
      user: env.EMAIL_USER || '',
      password: env.EMAIL_PASSWORD || '',
      from: env.EMAIL_FROM || 'noreply@example.com',
    },

    mailGun: {
      apiKey: env.MAILGUN_API_KEY,
      host: env.MAILGUN_HOST, // Domain
    },

    // Gmail config
    gmail: {
      user: env.GMAIL_USER,
      pass: env.GMAIL_APP_PASS,
    },

    // AWS Configuration
    aws: {
      accessKeyId: env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY || '',
      region: env.AWS_REGION || 'us-east-1',
      s3Bucket: env.AWS_S3_BUCKET || 'my-bucket',
    },

    // External APIs
    externalApis: {
      paymentGateway: {
        baseUrl: env.PAYMENT_GATEWAY_URL || 'https://api.payment.com',
        apiKey: env.PAYMENT_GATEWAY_API_KEY || '',
        secret: env.PAYMENT_GATEWAY_SECRET || '',
      },
      notifications: {
        baseUrl:
          env.NOTIFICATION_SERVICE_URL || 'https://api.notifications.com',
        apiKey: env.NOTIFICATION_API_KEY || '',
      },
    },

    // File Upload Configuration
    fileUpload: {
      maxSize: parseInt(env.MAX_FILE_SIZE, 10) || 10 * 1024 * 1024, // 10MB
      allowedMimeTypes: env.ALLOWED_MIME_TYPES?.split(',') || [
        'image/jpeg',
        'image/png',
      ],
      uploadPath: env.UPLOAD_PATH || './uploads',
    },

    // Rate Limiting
    rateLimit: {
      windowMs: parseInt(env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000, // 15 minutes
      max: parseInt(env.RATE_LIMIT_MAX, 10) || 100, // limit each IP to 100 requests per windowMs
    },

    // CORS Configuration
    cors: {
      origin: env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
      credentials: env.CORS_CREDENTIALS === 'true',
    },

    // Logging Configuration
    logging: {
      level: env.LOG_LEVEL || 'info',
      format: env.LOG_FORMAT || 'combined',
      file: env.LOG_FILE || 'app.log',
    },

    // Security Configuration
    security: {
      bcryptSaltRounds: parseInt(env.BCRYPT_SALT_ROUNDS, 10) || 12,
      sessionSecret: env.SESSION_SECRET || 'your-session-secret',
      csrfEnabled: env.CSRF_ENABLED === 'true',
    },

    // Cache Configuration
    cache: {
      ttl: parseInt(env.CACHE_TTL, 10) || 300, // 5 minutes
      max: parseInt(env.CACHE_MAX, 10) || 100,
    },

    // Feature Flags
    features: {
      enableRegistration: env.ENABLE_REGISTRATION !== 'false',
      enableEmailVerification: env.ENABLE_EMAIL_VERIFICATION === 'true',
      enableTwoFactorAuth: env.ENABLE_2FA === 'true',
      maintenanceMode: env.MAINTENANCE_MODE === 'true',
    },
  };
});
