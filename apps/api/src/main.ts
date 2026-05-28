import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

import { Logger, ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bodyParser: false,
    });

    app.useLogger(app.get(Logger));

    const config = new DocumentBuilder()
        .setTitle("Open Storage API")
        .setDescription("The open storage API description")
        .setVersion("1.0")
        .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, documentFactory());

    app.enableCors({
        origin: "http://localhost:3001",
        credentials: true,
    });

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
