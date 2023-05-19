import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { ContractEntity } from 'src/contracts/entities/contract.entity';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';
import { ClientEntity } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepo: Repository<ClientEntity>,
    @InjectRepository(ContractEntity)
    private readonly contractRepository: Repository<ContractEntity>,
  ) {}
  async create(createClientDto: CreateClientDto) {
    return this.clientRepo.save(createClientDto);
  }

  async findAll() {
    return this.clientRepo.find();
  }

  async findOne(id: number) {
    return this.clientRepo.findOne({
      where: { id },
    });
  }

  /*async getClientsByDateRange(startDate: Date, endDate: Date): Promise<any> {
    const clientIds = await this.contractRepository
      .createQueryBuilder('contract')
      .select('contract.clientId')
      .where('contract.date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .groupBy('contract.clientId')
      .getRawMany();

    if (clientIds.length === 0) {
      return [];
    }

    const clients = await this.clientRepo
      .createQueryBuilder('client')
      .where('client.id IN (:...clientIds)', {
        clientIds: clientIds.map((id) => id.clientId),
      })
      .leftJoinAndSelect(
        'client.contracts',
        'contract',
        'contract.date BETWEEN :startDate AND :endDate',
        { startDate, endDate },
      )
      .getMany();

    const result = clients.map((client) => {
      const contracts = client.contracts;
      const totalAmount = contracts.reduce(
        (total, contract) => total + contract.amount,
        0,
      );
      return { client, totalAmount };
    });
    return result;
  }
  /* update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }*/

  /*remove(id: number) {
    return `This action removes a #${id} client`;
  }*/
}
