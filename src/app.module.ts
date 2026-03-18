import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './productos/productos.entity';
import { Cliente } from './clientes/clientes.entity';
import { Venta } from './ventas/ventas.entity';
import { QueriesModule } from './queries/queries.module';

@Module({
  imports: [
     ConfigModule.forRoot({
          isGlobal: true,
        }),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DB_HOST,
          port: +process.env.DB_PORT!,
          database: process.env.DB_NAME,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          entities: [Producto, Cliente, Venta],
          autoLoadEntities: true,
          synchronize: true,
        }),
        QueriesModule,    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
