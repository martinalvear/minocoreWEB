import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { ContractEntity } from './entities/contract.entity';
import { ClientsService } from 'src/clients/clients.service';
import { ClientEntity } from 'src/clients/entities/client.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContractEntity]),
    TypeOrmModule.forFeature([ClientEntity]),
  ],
  controllers: [ContractsController],
  providers: [ContractsService, ClientsService],
})
export class ContractsModule {}
