import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { ClientEntity } from './entities/client.entity';
import { ContractEntity } from 'src/contracts/entities/contract.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientEntity]),
    TypeOrmModule.forFeature([ContractEntity]),
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
