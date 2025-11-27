// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { RedisModule } from '@nestjs-modules/ioredis';
// import { AppController } from './app.controller';
// import { AuthModule } from './auth/auth.module';
// import { UsersModule } from './users/user.module'; // ✅ FIXED: plural
// import { DoctorsModule } from './doctors/doctors.module';
// import { BookingsModule } from './bookings/bookings.module';
// import { AuditModule } from './audit/audit.module';
// import { LoggerModule } from 'nestjs-pino';

// @Module({
//   imports: [
//     ConfigModule.forRoot({ isGlobal: true }),
//     LoggerModule.forRoot({
//       pinoHttp: {
//         transport: process.env.NODE_ENV !== 'production'
//           ? { target: 'pino-pretty' }
//           : undefined,
//       },
//     }),
//     TypeOrmModule.forRootAsync({
//       inject: [ConfigService],
//       useFactory: (config: ConfigService) => ({
//         type: 'postgres',
//         host: config.get('DB_HOST', 'localhost'),
//         port: config.get('DB_PORT', 5433),
//         username: config.get('DB_USERNAME', 'postgres'),
//         password: config.get('DB_PASSWORD', 'postgres'),
//         database: config.get('DB_NAME', 'amrutam'),
//         entities: [__dirname + '/**/*.entity{.ts,.js}'],
//         synchronize: process.env.NODE_ENV !== 'production',
//       }),
//     }),
//     RedisModule.forRootAsync({
//       inject: [ConfigService],
//       useFactory: (config: ConfigService) => ({
//         type: 'single',
//         url: config.get<string>('REDIS_URL', 'redis://localhost:6379'),
//       }),
//     }),
//     AuthModule,
//     UsersModule,
//     DoctorsModule,
//     BookingsModule,
//     AuditModule,
//   ],
//   controllers: [AppController],
//   providers: [],
// })
// export class AppModule {}


// app.module.ts
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from '@nestjs-modules/ioredis';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/user.module';
import { DoctorsModule } from './doctors/doctors.module';
import { BookingsModule } from './bookings/bookings.module';
import { AuditModule } from './audit/audit.module';
import { LoggerModule } from 'nestjs-pino';
import { IdempotencyMiddleware } from './common/middleware/idempotency.middleware'; // ✅ Add this

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: process.env.NODE_ENV !== 'production'
          ? { target: 'pino-pretty' }
          : undefined,
      },
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST', 'localhost'),
        port: config.get('DB_PORT', 5433),
        username: config.get('DB_USERNAME', 'postgres'),
        password: config.get('DB_PASSWORD', 'postgres'),
        database: config.get('DB_NAME', 'amrutam'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: process.env.NODE_ENV !== 'production',
      }),
    }),
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'single',
        url: config.get<string>('REDIS_URL', 'redis://localhost:6379'),
      }),
    }),
    AuthModule,
    UsersModule,
    DoctorsModule,
    BookingsModule,
    AuditModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IdempotencyMiddleware)
      .forRoutes('*'); // or specific routes
  }
}