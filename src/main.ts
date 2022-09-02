import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('SachCoreService')
    .setDescription('This is backend service for Sach Admin & User UI')
    .setVersion('1.0')
    .addTag('sach-core-service, blog, video, event, category, sub-category')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useStaticAssets(join(__dirname, '..', 'src/public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
  app.setViewEngine('hbs');
  const port = process.env.SACH_CORE_SERVICE_PORT || 3000
  await app.listen(port);
}
bootstrap();
