import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import {
  SwaggerTheme,
  SwaggerThemeName,
  SwaggerThemeNameEnum,
} from 'swagger-themes';

export function setupSwagger(app: INestApplication): void {
  const configServer = app.get(ConfigService).get('app');
  const { host, port } = configServer;
  const { authUser, authPassword } = configServer.swagger || {};

  app.use(
    ['/api/docs', '/api/docs-json'],
    basicAuth({
      users: { [authUser]: authPassword },
      challenge: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description with JWT Authentication')
    .setVersion('1.0')
    .addTag('auth', 'Authentication endpoints')
    .addTag('users', 'User management endpoints')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .addServer(`http://${host}:${port}`, 'Development server')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    // 👇 This forces swagger to include all class-validator metadata, even without @ApiProperty
    deepScanRoutes: true,
  });

  const theme = new SwaggerTheme();

  // Default theme: 'original' or 'dark'
  const themeName: SwaggerThemeName = SwaggerThemeNameEnum.CLASSIC;

  // console.log(
  //   'theme.getBuffer(themeName).toString()',
  //   theme.getBuffer(themeName).toString(),
  // );

  SwaggerModule.setup('api/docs', app, document, {
    // Toggle Light & Dark mode
    // customCssUrl: '/swagger/swagger-theme.css',
    // customJs: '/swagger/swagger-toggle.js',

    customCss: theme.getBuffer(themeName).toString(),
    // TODO: 404
    customJs: '/swagger/swagger-theme-toggle.js', // we’ll create this file
    customSiteTitle: 'API Docs with Theme Toggle',

    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}
